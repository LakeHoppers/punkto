import { NextResponse } from "next/server";
import { requireCronSecret, UnauthorizedError } from "@/shared/api-guards";
import { SendDigestUseCase } from "@/modules/notification/application/send-digest.use-case";
import { PrismaNotificationRepository } from "@/modules/notification/infrastructure/prisma-notification-repository";
import { PrismaDigestReader } from "@/modules/notification/infrastructure/prisma-digest-reader";
import { ResendEmailSender } from "@/modules/notification/infrastructure/resend-email-sender";

// Hobby maximum with Fluid Compute enabled (Vercel docs, September 2026) —
// same ceiling as /api/cron/pipeline. Sequential delivery at ~300-600ms per
// subscriber (digest lookup + Resend call + delivery record) stays under
// half of this until subscriber count reaches the low hundreds; revisit
// concurrency only once real counts approach that, not preemptively.
export const maxDuration = 300;

async function handle(request: Request) {
  try {
    requireCronSecret(request);
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    throw err;
  }

  const result = await new SendDigestUseCase(
    new PrismaNotificationRepository(),
    new PrismaDigestReader(),
    new ResendEmailSender(),
  ).execute();

  return NextResponse.json(result, { status: 200 });
}

// Vercel Cron invokes this path with GET. POST is kept for manual/local triggering.
export const GET = handle;
export const POST = handle;
