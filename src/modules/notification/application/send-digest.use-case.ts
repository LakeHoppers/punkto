import { isDueNow } from "../domain/due-check";
import { buildDigestEmail } from "../domain/email-template";
import type { DeliveryCandidate, DigestReader, EmailSender, NotificationRepository } from "./ports";

export interface SendDigestResult {
  delivered: number;
  failed: number;
  skipped: number;
}

// Caps how many deliveries run at once. Sequential delivery scaled linearly
// with subscriber count and risked hitting the serverless function's time
// limit as the user base grows; a bounded batch size keeps total run time
// roughly flat instead, without opening one connection/request per
// candidate all at once.
const DELIVERY_CONCURRENCY = 20;

type DeliveryOutcome = "delivered" | "failed" | "skipped";

export class SendDigestUseCase {
  constructor(
    private readonly repository: NotificationRepository,
    private readonly digestReader: DigestReader,
    private readonly emailSender: EmailSender,
  ) {}

  async execute(now: Date = new Date()): Promise<SendDigestResult> {
    const candidates = await this.repository.getEmailDeliveryCandidates();
    const due = candidates.filter((candidate) =>
      isDueNow(candidate.timezone, candidate.digestHour, now),
    );

    const counts: Record<DeliveryOutcome, number> = { delivered: 0, failed: 0, skipped: 0 };

    for (let i = 0; i < due.length; i += DELIVERY_CONCURRENCY) {
      const batch = due.slice(i, i + DELIVERY_CONCURRENCY);
      const outcomes = await Promise.all(batch.map((candidate) => this.deliverTo(candidate, now)));
      for (const outcome of outcomes) counts[outcome]++;
    }

    return { delivered: counts.delivered, failed: counts.failed, skipped: counts.skipped };
  }

  private async deliverTo(candidate: DeliveryCandidate, now: Date): Promise<DeliveryOutcome> {
    const digest =
      candidate.plan === "PRO" && candidate.favoriteCategories.length > 0
        ? await this.digestReader.getPersonalizedDigest(candidate.favoriteCategories, candidate.emailLocale ?? "tr")
        : await this.digestReader.getLatestDigest(candidate.favoriteCategories, candidate.emailLocale ?? "tr");
    // Editions are keyed by UTC date throughout the digest module. Do not
    // catch up with yesterday's edition while today's pipeline is pending.
    if (!digest || digest.date !== now.toISOString().slice(0, 10) || digest.items.length === 0) {
      return "skipped";
    }

    if (await this.repository.hasDelivery(digest.digestId, candidate.userId)) {
      return "skipped";
    }

    try {
      const { subject, html, text } = buildDigestEmail(digest, candidate.emailLocale ?? "tr");
      await this.emailSender.send({ to: candidate.email, subject, html, text });
      await this.repository.recordDelivery({
        digestId: digest.digestId,
        userId: candidate.userId,
        status: "sent",
      });
      return "delivered";
    } catch (err) {
      await this.repository.recordDelivery({
        digestId: digest.digestId,
        userId: candidate.userId,
        status: "failed",
        error: err instanceof Error ? err.message : String(err),
      });
      return "failed";
    }
  }
}
