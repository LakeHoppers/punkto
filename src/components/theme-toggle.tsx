"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { trackEvent } from "@/components/analytics-consent";

/**
 * Both icons always render; CSS (the `dark:` variant, driven by next-themes'
 * class on <html>) picks which is visible — avoids a client-only "mounted"
 * gate and the hydration-mismatch flash that approach is prone to.
 *
 * The click handler reads the class straight off <html> instead of the
 * hook's `resolvedTheme`: next-themes sets that class synchronously (via an
 * inline script, before hydration) but only syncs `resolvedTheme` into React
 * state on a later effect, so a click in that window would otherwise read a
 * stale value and toggle the wrong way.
 */
export function ThemeToggle({ label }: { label: string }) {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
        setTheme(next);
        trackEvent("theme_toggle", { theme: next });
      }}
      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  );
}
