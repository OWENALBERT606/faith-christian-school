"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { Prisma, Event, EventStatus, Category } from "@prisma/client";

const REVALIDATE_PATHS = ["/events", "/dashboard/events"];
function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ── Types ──────────────────────────────────────────────────────────────── */
export type EventScheduleItem = { time: string; activity: string };

export type EventCreateDTO = {
  title: string;
  date: string;                // display label
  time: string;                // display label
  location: string;
  address: string;
  attendees?: number;          // default 0
  categoryId: string;          // required (relation)
  image: string;
  description: string;
  longDescription: string;
  highlights: string[];
  schedule: EventScheduleItem[]; // JSON column
  status?: EventStatus;        // default UPCOMING
};

export type EventUpdateDTO = Partial<EventCreateDTO>;

export type EventWithCategory = Event & { category: Category };

/* ── Create ─────────────────────────────────────────────────────────────── */
export async function createEvent(data: EventCreateDTO): Promise<Event | null> {
  try {
    // Ensure category exists
    const cat = await db.category.findUnique({ where: { id: data.categoryId } });
    if (!cat) return null;

    // Duplicate guard: adjust to your policy
    const existing = await db.event.findFirst({
      where: {
        title: data.title,
        date: data.date,
        time: data.time,
        location: data.location,
        categoryId: data.categoryId,
      },
    });
    if (existing) return existing; // or `return null;` to hard-fail

    const created = await db.event.create({
      data: {
        title: data.title,
        date: data.date,
        time: data.time,
        location: data.location,
        address: data.address,
        attendees: data.attendees ?? 0,
        categoryId: data.categoryId,
        image: data.image,
        description: data.description,
        longDescription: data.longDescription,
        highlights: data.highlights,
        schedule: data.schedule as unknown as Prisma.InputJsonValue,
        status: data.status ?? "UPCOMING",
      },
    });

    revalidateAll();
    return created;
  } catch (err) {
    console.error("Error creating event:", err);
    return null;
  }
}

/* ── Read (list) ────────────────────────────────────────────────────────── */
export async function getEvents(): Promise<EventWithCategory[] | null> {
  try {
    const rows = await db.event.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    return rows;
  } catch (err) {
    console.error("Error fetching events:", err);
    return null;
  }
}

/* ── Read (by id) ───────────────────────────────────────────────────────── */
export async function getEventById(id: string): Promise<EventWithCategory | null> {
  try {
    return await db.event.findUnique({
      where: { id },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching event by id:", err);
    return null;
  }
}

/* ── Optional filters ───────────────────────────────────────────────────── */
export async function getEventsByCategory(categoryId: string): Promise<EventWithCategory[] | null> {
  try {
    return await db.event.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching events by category:", err);
    return null;
  }
}

export async function getEventsByStatus(status: EventStatus): Promise<EventWithCategory[] | null> {
  try {
    return await db.event.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching events by status:", err);
    return null;
  }
}

/* ── Update ─────────────────────────────────────────────────────────────── */
export async function updateEvent(id: string, data: EventUpdateDTO): Promise<Event | null> {
  try {
    // If categoryId is changing, ensure it exists
    if (data.categoryId) {
      const cat = await db.category.findUnique({ where: { id: data.categoryId } });
      if (!cat) return null;
    }

    const updated = await db.event.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.time !== undefined && { time: data.time }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.address !== undefined && { address: data.address }),
        ...(data.attendees !== undefined && { attendees: data.attendees }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.longDescription !== undefined && { longDescription: data.longDescription }),
        ...(data.highlights !== undefined && { highlights: data.highlights }),
        ...(data.schedule !== undefined && {
          schedule: data.schedule as unknown as Prisma.InputJsonValue,
        }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });

    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error updating event:", err);
    return null;
  }
}

/* ── Delete ─────────────────────────────────────────────────────────────── */
export async function deleteEvent(
  id: string
): Promise<{ ok: true; data: Event } | null> {
  try {
    const deleted = await db.event.delete({ where: { id } });
    revalidateAll();
    return { ok: true, data: deleted };
  } catch (err) {
    console.error("Error deleting event:", err);
    return null;
  }
}
