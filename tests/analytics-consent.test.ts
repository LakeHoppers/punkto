import { describe, expect, it, vi } from "vitest";
import { CONSENT_KEY, createAnalytics, parseConsent } from "@/shared/analytics/consent";
function setup(choice?: string) {
  const storage = new Map<string, string>(choice ? [[CONSENT_KEY, choice]] : []);
  const ports = { read: (key: string) => storage.get(key) ?? null, write: (key: string, value: string) => { storage.set(key, value); }, start: vi.fn(), stop: vi.fn(), event: vi.fn() };
  return { ports, tracker: createAnalytics(ports) };
}
const signup = { status: "complete", createdUserId: "test-user" };
describe("basic analytics consent", () => {
  it.each([undefined, "declined", "invalid"])("does not load or send anything with consent %s", (choice) => {
    const { tracker, ports } = setup(choice);
    tracker.page("/en"); tracker.signup(signup);
    expect(ports.start).not.toHaveBeenCalled(); expect(ports.event).not.toHaveBeenCalled();
  });
  it("loads once after acceptance and persists it across reloads", () => {
    const { tracker, ports } = setup(); tracker.choose("accepted"); tracker.page("/en"); tracker.page("/de");
    expect(ports.start).toHaveBeenCalledTimes(1);
    expect(createAnalytics(ports).consent).toBe("accepted");
    expect(ports.event).toHaveBeenCalledTimes(2);
  });
  it("does not replay signup activity that happened without consent", () => {
    const { tracker, ports } = setup(); tracker.signup(signup); expect(ports.read("news-daily.signup.test-user")).toBeNull(); tracker.choose("accepted"); tracker.signup(signup);
    expect(ports.event).not.toHaveBeenCalled();
  });
  it("counts completed signup once across emissions and reloads, with no account ID payload", () => {
    const { tracker, ports } = setup("accepted"); tracker.signup(signup); tracker.signup(signup); createAnalytics(ports).signup(signup);
    expect(ports.event).toHaveBeenCalledExactlyOnceWith("sign_up", { method: "clerk" });
  });
  it("does not count login, absent or incomplete signup", () => {
    const { tracker, ports } = setup("accepted"); tracker.signup(undefined); tracker.signup({status: "missing_requirements", createdUserId: null}); tracker.signup({status: "complete", createdUserId: null});
    expect(ports.event).not.toHaveBeenCalled();
  });
  it("stops on withdrawal and blocks subsequent events", () => {
    const { tracker, ports } = setup("accepted"); tracker.page("/tr"); tracker.choose("declined"); tracker.page("/de"); tracker.signup(signup);
    expect(ports.stop).toHaveBeenCalledOnce(); expect(ports.event).toHaveBeenCalledTimes(1);
    expect(createAnalytics(ports).consent).toBe("declined");
  });
  it("does not disclose auth paths, queries, or IDs, and avoids duplicate views", () => {
    const { tracker, ports } = setup("accepted");
    for (const path of ["/en/sign-in/token", "/en/dashboard", "/en?email=private", "/en/admin/user/secret", "/en", "/en"]) tracker.page(path);
    expect(ports.event).toHaveBeenCalledExactlyOnceWith("page_view", {page_path: "/en"});
  });
  it("fails closed on unrecognized stored values", () => { expect(parseConsent("true")).toBeNull(); });
});
