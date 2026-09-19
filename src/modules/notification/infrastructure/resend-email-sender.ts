import type { EmailSender } from "../application/ports";

const RESEND_URL = "https://api.resend.com/emails";

// Resend enforces a per-account requests/second cap (429 rate_limit_exceeded
// when exceeded). A burst of due deliveries in one batch can legitimately hit
// it, so a 429 is retried with backoff instead of being treated as a
// permanent failure — otherwise it sits marked "failed" until the next
// hourly cron run picks it up, an hour-long delivery delay.
const RATE_LIMIT_RETRIES = 3;
const RATE_LIMIT_BACKOFF_MS = 1100;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class ResendEmailSender implements EmailSender {
  constructor(
    private readonly apiKey: string = process.env.RESEND_API_KEY ?? "",
    private readonly from: string = process.env.EMAIL_FROM_ADDRESS ??
      "Punkto <onboarding@resend.dev>",
  ) {}

  async send(input: { to: string; subject: string; html: string; text: string }): Promise<void> {
    if (!this.apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }

    for (let attempt = 0; ; attempt++) {
      const response = await fetch(RESEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: this.from,
          to: input.to,
          subject: input.subject,
          html: input.html,
          text: input.text,
        }),
      });

      if (response.ok) return;

      if (response.status === 429 && attempt < RATE_LIMIT_RETRIES) {
        const retryAfterHeader = Number(response.headers.get("retry-after"));
        const backoffMs = Number.isFinite(retryAfterHeader) && retryAfterHeader > 0
          ? retryAfterHeader * 1000
          : RATE_LIMIT_BACKOFF_MS;
        await sleep(backoffMs);
        continue;
      }

      const body = await response.text();
      throw new Error(`Resend request failed (${response.status}): ${body}`);
    }
  }
}
