"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { trackEvent } from "@/components/analytics-consent";

/** A native <details> that fires a GA4 event the first time it's opened. */
export function TrackedDetails({
  children,
  className,
  eventName,
  eventParams,
}: {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: Record<string, string>;
}) {
  const fired = useRef(false);
  return (
    <details
      className={className}
      onToggle={(event) => {
        if (event.currentTarget.open && !fired.current) {
          fired.current = true;
          trackEvent(eventName, eventParams);
        }
      }}
    >
      {children}
    </details>
  );
}
