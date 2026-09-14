import type { DigestView } from "@/modules/digest/domain/types";
import type { Locale } from "@/modules/digest/domain/localize";

/**
 * Server-side migration switch. Both readers support TR/EN/DE with per-field
 * Turkish fallback. Unconfigured deployments use the authoritative TS reader.
 */
export async function getHomeDigest(locale: Locale = "tr"): Promise<DigestView | null> {
  const backend = process.env.PYTHON_BACKEND_URL;
  if (!backend) {
    const { getLatestDigest } = await import("@/modules/digest/infrastructure/digest-view");
    return getLatestDigest([], locale);
  }
  const url = new URL("/api/digests/latest", backend);
  url.searchParams.set("lang", locale);
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Digest backend unavailable");
  return response.json() as Promise<DigestView>;
}
