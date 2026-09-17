import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/site-url";

/**
 * No explicit disallow list beyond auth/admin/API routes — everything else,
 * including AI/LLM crawlers (GPTBot, Google-Extended, PerplexityBot,
 * ClaudeBot, etc.), is allowed by default since they aren't named here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*/dashboard", "/*/admin", "/*/sign-in", "/*/sign-up", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
