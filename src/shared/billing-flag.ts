/** Off by default. Flip to "true" in env once we're ready to accept new Pro signups again. */
export function isBillingEnabled(): boolean {
  return process.env.BILLING_ENABLED === "true";
}
