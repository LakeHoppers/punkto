import type { Category } from "@/generated/prisma/enums";
import { getLatestDigest } from "@/modules/digest/infrastructure/digest-view";
import type { DigestReader } from "../application/ports";

import type { Locale } from "@/shared/locale";

export class PrismaDigestReader implements DigestReader {
  getLatestDigest(categories: Category[], locale: Locale = "tr") {
    return getLatestDigest(categories, locale);
  }
}
