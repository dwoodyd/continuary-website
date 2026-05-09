import { eq, desc, count, sql } from "drizzle-orm";
import { getDb } from "./db";
import { applications, InsertApplication, Application } from "../drizzle/schema";

export async function insertApplication(data: InsertApplication): Promise<Application | null> {
  const db = await getDb();
  if (!db) return null;

  // Deduplicate by formspreeId if provided
  if (data.formspreeId) {
    const existing = await db
      .select()
      .from(applications)
      .where(eq(applications.formspreeId, data.formspreeId))
      .limit(1);
    if (existing.length > 0) return existing[0];
  }

  await db.insert(applications).values(data);

  // Fetch the inserted row
  const rows = await db
    .select()
    .from(applications)
    .where(eq(applications.email, data.email))
    .orderBy(desc(applications.submittedAt))
    .limit(1);

  return rows[0] ?? null;
}

export async function listApplications(): Promise<Application[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(applications).orderBy(desc(applications.submittedAt));
}

export async function getApplicationById(id: number): Promise<Application | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function updateApplicationStatus(
  id: number,
  status: Application["status"]
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(applications).set({ status }).where(eq(applications.id, id));
}

export async function updateApplicationNotes(id: number, notes: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(applications).set({ notes }).where(eq(applications.id, id));
}

export async function getSlotCounts(): Promise<{ total: number; accepted: number; remaining: number }> {
  const db = await getDb();
  if (!db) return { total: 0, accepted: 0, remaining: 100 };

  const totalRows = await db.select({ count: count() }).from(applications);
  const acceptedRows = await db
    .select({ count: count() })
    .from(applications)
    .where(eq(applications.status, "accepted"));

  const total = totalRows[0]?.count ?? 0;
  const accepted = acceptedRows[0]?.count ?? 0;

  return {
    total,
    accepted,
    remaining: Math.max(0, 100 - total),
  };
}
