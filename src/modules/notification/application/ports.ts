import type { Category, SubscriptionPlan } from "@/generated/prisma/enums";
import type { DigestView } from "@/modules/digest/domain/types";

import type { Locale } from "@/shared/locale";

export interface DeliveryCandidate {
  userId: string;
  email: string;
  emailLocale?: Locale;
  timezone: string;
  digestHour: number;
  favoriteCategories: Category[];
  plan: SubscriptionPlan;
}

export interface DigestReader {
  getLatestDigest(categories: Category[], locale?: Locale): Promise<DigestView | null>;
  /** Pro-only: a full top-N pick from the user's own favorite categories, not capped by the shared digest's per-category limit. */
  getPersonalizedDigest(categories: Category[], locale?: Locale): Promise<DigestView | null>;
}

export interface EmailSender {
  send(input: { to: string; subject: string; html: string; text: string }): Promise<void>;
}

export type DeliveryStatus = "sent" | "failed";

export interface NotificationRepository {
  /** Not paused, has preferences set — every user is a candidate; timezone/hour filtering happens in the use case. */
  getEmailDeliveryCandidates(): Promise<DeliveryCandidate[]>;
  hasDelivery(digestId: string, userId: string): Promise<boolean>;
  recordDelivery(input: {
    digestId: string;
    userId: string;
    status: DeliveryStatus;
    error?: string;
  }): Promise<void>;
}
