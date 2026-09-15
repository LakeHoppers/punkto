"use client";

import { trackEvent } from "@/components/analytics-consent";

export function TrackedSourceLink({
  url,
  category,
  className,
}: {
  url: string;
  category: string;
  className?: string;
}) {
  const hostname = new URL(url).hostname.replace(/^www\./, "");
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent("source_link_click", { source: hostname, category })}
    >
      {hostname}
    </a>
  );
}
