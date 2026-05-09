import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  insertApplication,
  listApplications,
  getApplicationById,
  updateApplicationStatus,
  updateApplicationNotes,
  getSlotCounts,
} from "../db.applications";
import { notifyOwner } from "../_core/notification";

// Admin-only guard
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const applicationsRouter = router({
  // Public: get slot counts for the marketing site counter
  slotCounts: publicProcedure.query(async () => {
    return getSlotCounts();
  }),

  // Public: receive a new application (called from the FoundingMember form)
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        relationship: z.string().min(200, "Please write at least 200 characters"),
        formspreeId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const app = await insertApplication({
        name: input.name,
        email: input.email,
        relationship: input.relationship,
        formspreeId: input.formspreeId ?? null,
        status: "new",
      });

      // Notify owner of new application
      await notifyOwner({
        title: `New founding member application from ${input.name}`,
        content: `Email: ${input.email}\n\nRelationship with consistency:\n${input.relationship.slice(0, 300)}${input.relationship.length > 300 ? "…" : ""}`,
      });

      return { success: true, id: app?.id };
    }),

  // Admin: list all applications
  list: adminProcedure.query(async () => {
    return listApplications();
  }),

  // Admin: get single application
  get: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const app = await getApplicationById(input.id);
      if (!app) throw new TRPCError({ code: "NOT_FOUND" });
      return app;
    }),

  // Admin: update status
  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "reviewed", "accepted", "declined"]),
      })
    )
    .mutation(async ({ input }) => {
      await updateApplicationStatus(input.id, input.status);
      return { success: true };
    }),

  // Admin: update notes
  updateNotes: adminProcedure
    .input(z.object({ id: z.number(), notes: z.string() }))
    .mutation(async ({ input }) => {
      await updateApplicationNotes(input.id, input.notes);
      return { success: true };
    }),
});
