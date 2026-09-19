import type { Category } from "@/generated/prisma/enums";
import { getEmailDeliveryDigest, getPersonalizedDigest } from "@/modules/digest/infrastructure/digest-view";
import type { DigestReader } from "../application/ports";

import type { Locale } from "@/shared/locale";

export class PrismaDigestReader implements DigestReader {
  getLatestDigest(categories: Category[], locale: Locale = "tr") {
    // Not the cached getLatestDigest: that cache keys per (categories,
    // locale) with its own revalidation clock, so a combination the public
    // homepage hasn't served recently can still hand delivery yesterday's
    // digest right after today's has been built — see digest-view.ts.
    return getEmailDeliveryDigest(categories, locale);
  }

  getPersonalizedDigest(categories: Category[], locale: Locale = "tr") {
    return getPersonalizedDigest(categories, locale);
  }
}
