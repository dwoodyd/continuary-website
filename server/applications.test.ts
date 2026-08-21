/**
 * Tests for the applications tRPC router.
 *
 * These tests exercise the router logic in isolation — no real DB calls are made.
 * We mock the db.applications module to control return values.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TRPCError } from "@trpc/server";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mock the db.applications module ──────────────────────────────────────────
vi.mock("./db.applications", () => ({
  insertApplication: vi.fn().mockResolvedValue({
    id: 1,
    name: "Test User",
    email: "test@example.com",
    relationship: "A".repeat(200),
    formspreeId: null,
    status: "new",
    notes: null,
    submittedAt: new Date(),
    updatedAt: new Date(),
  }),
  listApplications: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      relationship: "A".repeat(200),
      formspreeId: null,
      status: "new",
      notes: null,
      submittedAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getApplicationById: vi.fn().mockResolvedValue({
    id: 1,
    name: "Test User",
    email: "test@example.com",
    relationship: "A".repeat(200),
    formspreeId: null,
    status: "new",
    notes: null,
    submittedAt: new Date(),
    updatedAt: new Date(),
  }),
  updateApplicationStatus: vi.fn().mockResolvedValue(undefined),
  updateApplicationNotes: vi.fn().mockResolvedValue(undefined),
  getSlotCounts: vi.fn().mockResolvedValue({ total: 5, accepted: 2, remaining: 98 }),
}));

// Also mock notifyOwner so we don't hit the network
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Also mock confirmation email delivery so the public-submit unit test stays offline.
vi.mock("./email", () => ({
  sendApplicationConfirmation: vi.fn().mockResolvedValue(true),
}));

// ── Context helpers ───────────────────────────────────────────────────────────
function makeCtx(role: "admin" | "user" | null = null): TrpcContext {
  const user =
    role === null
      ? null
      : {
          id: 1,
          openId: "test-open-id",
          email: "admin@example.com",
          name: "Admin User",
          loginMethod: "manus",
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe("applications.slotCounts (public)", () => {
  it("returns slot counts without authentication", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    const result = await caller.applications.slotCounts();
    expect(result).toEqual({ total: 5, accepted: 2, remaining: 98 });
  });
});

describe("applications.submit (public)", () => {
  it("accepts a valid application and returns success", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    const result = await caller.applications.submit({
      name: "Test User",
      email: "test@example.com",
      relationship: "A".repeat(200),
    });
    expect(result.success).toBe(true);
    expect(result.id).toBe(1);
  });

  it("rejects a relationship that is too short", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.applications.submit({
        name: "Test User",
        email: "test@example.com",
        relationship: "Too short",
      })
    ).rejects.toThrow();
  });
});

describe("applications.list (admin only)", () => {
  it("returns applications for admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    const result = await caller.applications.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(caller.applications.list()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("throws UNAUTHORIZED for unauthenticated requests", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.applications.list()).rejects.toThrow();
  });
});

describe("applications.updateStatus (admin only)", () => {
  it("updates status for admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    const result = await caller.applications.updateStatus({ id: 1, status: "reviewed" });
    expect(result.success).toBe(true);
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(
      caller.applications.updateStatus({ id: 1, status: "reviewed" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("applications.updateNotes (admin only)", () => {
  it("updates notes for admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    const result = await caller.applications.updateNotes({ id: 1, notes: "Great candidate" });
    expect(result.success).toBe(true);
  });
});

describe("applications.get (admin only)", () => {
  it("returns a single application for admin users", async () => {
    const caller = appRouter.createCaller(makeCtx("admin"));
    const result = await caller.applications.get({ id: 1 });
    expect(result.id).toBe(1);
    expect(result.name).toBe("Test User");
  });
});
