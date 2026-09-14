import { beforeEach, expect, it, vi } from "vitest";
const { update } = vi.hoisted(() => ({ update: vi.fn() }));
vi.mock("@/shared/api-guards", () => ({ getOrCreateCurrentUser: async () => ({ id: "test-user" }), UnauthorizedError: class extends Error {} }));
vi.mock("@/shared/prisma", () => ({ prisma: { subscription: { findUnique: async () => ({ plan: "FREE" }) }, userPreference: { update } } }));
import { PATCH } from "@/app/api/me/preferences/route";
beforeEach(() => { update.mockReset().mockImplementation(async ({ data }) => data); });
it.each(["tr", "en", "de"])("saves %s email language independently of Free category limits", async emailLocale => {
  const response = await PATCH(new Request("http://localhost/api/me/preferences", { method: "PATCH", body: JSON.stringify({ emailLocale, favoriteCategories: ["POLITICS", "SPORTS"] }) }));
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ emailLocale, favoriteCategories: ["POLITICS"] });
});
it.each(["fr", "DE", null, 5, {}])("rejects invalid email locale %j", async emailLocale => {
  expect((await PATCH(new Request("http://localhost", { method: "PATCH", body: JSON.stringify({ emailLocale }) }))).status).toBe(400);
  expect(update).not.toHaveBeenCalled();
});
it("omitting language preserves an existing preference", async () => {
  await PATCH(new Request("http://localhost", { method: "PATCH", body: JSON.stringify({ paused: true }) }));
  expect(update.mock.calls[0][0].data).toEqual({ paused: true });
});
