"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { Prisma, EventRegistration, RegistrationStatus } from "@prisma/client";

/** Pages that should revalidate when registrations change */
const REVALIDATE_PATHS = ["/events", "/dashboard/events", "/dashboard/registrations"];
function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ──────────────────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────────────────── */

export type EventRegistrationCreateDTO = {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  numberOfGuests?: number;      // default 1
  specialRequirements?: string;
  status?: RegistrationStatus;  // default PENDING
};

export type EventRegistrationUpdateDTO = Partial<Omit<EventRegistrationCreateDTO, 'eventId'>>;

/** Derive the exact type Prisma returns when including the event relation */
export type EventRegistrationWithEvent =
  Prisma.EventRegistrationGetPayload<{ include: { event: true } }>;

export type EventRegistrationWithEventDetails =
  Prisma.EventRegistrationGetPayload<{
    include: {
      event: {
        select: {
          id: true;
          title: true;
          date: true;
          time: true;
          location: true;
          address: true;
          image: true;
        };
      };
    };
  }>;

/* ──────────────────────────────────────────────────────────────────────────
 * Create
 * ────────────────────────────────────────────────────────────────────────── */

export async function createEventRegistration(
  data: EventRegistrationCreateDTO
): Promise<{ success: true; data: EventRegistration } | { success: false; error: string }> {
  try {
    // Validate event exists and is accepting registrations
    const event = await db.event.findUnique({ where: { id: data.eventId } });
    if (!event) {
      return { success: false, error: "Event not found" };
    }

    if (event.status !== "UPCOMING" && event.status !== "ONGOING") {
      return { success: false, error: "Registration is closed for this event" };
    }

    // Check for duplicate registration
    const existing = await db.eventRegistration.findFirst({
      where: {
        eventId: data.eventId,
        email: data.email,
        status: { not: "CANCELLED" },
      },
    });

    if (existing) {
      return { success: false, error: "You have already registered for this event" };
    }

    const numberOfGuests = data.numberOfGuests ?? 1;

    const created = await db.eventRegistration.create({
      data: {
        eventId: data.eventId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        numberOfGuests,
        specialRequirements: data.specialRequirements ?? null,
        status: data.status ?? "PENDING",
      },
    });

    // Update event attendees count
    await db.event.update({
      where: { id: data.eventId },
      data: {
        attendees: {
          increment: numberOfGuests,
        },
      },
    });

    revalidateAll();
    return { success: true, data: created };
  } catch (err) {
    console.error("Error creating event registration:", err);
    return { success: false, error: "Failed to create registration" };
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Read (list, by id, filters)
 * ────────────────────────────────────────────────────────────────────────── */

export async function getEventRegistrations(): Promise<EventRegistrationWithEvent[] | null> {
  try {
    const rows = await db.eventRegistration.findMany({
      orderBy: { createdAt: "desc" },
      include: { event: true },
    });
    return rows;
  } catch (err) {
    console.error("Error fetching event registrations:", err);
    return null;
  }
}

export async function getEventRegistrationById(
  id: string
): Promise<EventRegistrationWithEventDetails | null> {
  try {
    return await db.eventRegistration.findUnique({
      where: { id },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            time: true,
            location: true,
            address: true,
            image: true,
          },
        },
      },
    });
  } catch (err) {
    console.error("Error fetching event registration by id:", err);
    return null;
  }
}

export async function getEventRegistrationsByEventId(
  eventId: string
): Promise<EventRegistrationWithEvent[] | null> {
  try {
    return await db.eventRegistration.findMany({
      where: { eventId },
      orderBy: { createdAt: "desc" },
      include: { event: true },
    });
  } catch (err) {
    console.error("Error fetching registrations by event:", err);
    return null;
  }
}

export async function getEventRegistrationsByStatus(
  status: RegistrationStatus
): Promise<EventRegistrationWithEvent[] | null> {
  try {
    return await db.eventRegistration.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
      include: { event: true },
    });
  } catch (err) {
    console.error("Error fetching registrations by status:", err);
    return null;
  }
}

export async function getEventRegistrationsByEmail(
  email: string
): Promise<EventRegistrationWithEvent[] | null> {
  try {
    return await db.eventRegistration.findMany({
      where: { email },
      orderBy: { createdAt: "desc" },
      include: { event: true },
    });
  } catch (err) {
    console.error("Error fetching registrations by email:", err);
    return null;
  }
}

/** Paginated list with filters */
export async function getEventRegistrationsPaginated(params: {
  eventId?: string;
  status?: RegistrationStatus;
  page?: number;
  limit?: number;
}): Promise<{
  data: EventRegistrationWithEvent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} | null> {
  try {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.EventRegistrationWhereInput = {};
    if (params.eventId) where.eventId = params.eventId;
    if (params.status) where.status = params.status;

    const [rows, total] = await Promise.all([
      db.eventRegistration.findMany({
        where,
        include: { event: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.eventRegistration.count({ where }),
    ]);

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (err) {
    console.error("Error fetching paginated registrations:", err);
    return null;
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Update
 * ────────────────────────────────────────────────────────────────────────── */

export async function updateEventRegistration(
  id: string,
  data: EventRegistrationUpdateDTO
): Promise<{ success: true; data: EventRegistration } | { success: false; error: string }> {
  try {
    const existing = await db.eventRegistration.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Registration not found" };
    }

    // Handle attendee count changes
    if (data.status === "CANCELLED" && existing.status !== "CANCELLED") {
      // Decrement attendees when cancelling
      await db.event.update({
        where: { id: existing.eventId },
        data: {
          attendees: {
            decrement: existing.numberOfGuests,
          },
        },
      });
    } else if (existing.status === "CANCELLED" && data.status && data.status !== "CANCELLED") {
      // Increment attendees when reactivating
      await db.event.update({
        where: { id: existing.eventId },
        data: {
          attendees: {
            increment: existing.numberOfGuests,
          },
        },
      });
    }

    // Set confirmedAt if status is changing to CONFIRMED
    const updateData: Prisma.EventRegistrationUpdateInput = {
      ...(data.fullName !== undefined && { fullName: data.fullName }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.numberOfGuests !== undefined && { numberOfGuests: data.numberOfGuests }),
      ...(data.specialRequirements !== undefined && { specialRequirements: data.specialRequirements }),
      ...(data.status !== undefined && { status: data.status }),
    };

    if (data.status === "CONFIRMED" && !existing.confirmedAt) {
      updateData.confirmedAt = new Date();
    }

    const updated = await db.eventRegistration.update({
      where: { id },
      data: updateData,
    });

    revalidateAll();
    return { success: true, data: updated };
  } catch (err) {
    console.error("Error updating event registration:", err);
    return { success: false, error: "Failed to update registration" };
  }
}

/** Quick status update helper */
export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
): Promise<{ success: true; data: EventRegistration } | { success: false; error: string }> {
  return updateEventRegistration(id, { status });
}

/** Confirm a registration */
export async function confirmRegistration(
  id: string
): Promise<{ success: true; data: EventRegistration } | { success: false; error: string }> {
  return updateEventRegistration(id, { status: "CONFIRMED" });
}

/** Cancel a registration */
export async function cancelRegistration(
  id: string
): Promise<{ success: true; data: EventRegistration } | { success: false; error: string }> {
  return updateEventRegistration(id, { status: "CANCELLED" });
}

/** Mark as attended */
export async function markAsAttended(
  id: string
): Promise<{ success: true; data: EventRegistration } | { success: false; error: string }> {
  return updateEventRegistration(id, { status: "ATTENDED" });
}

/* ──────────────────────────────────────────────────────────────────────────
 * Delete
 * ────────────────────────────────────────────────────────────────────────── */

export async function deleteEventRegistration(
  id: string
): Promise<{ ok: true; data: EventRegistration } | { ok: false; error: string }> {
  try {
    const existing = await db.eventRegistration.findUnique({ where: { id } });
    if (!existing) {
      return { ok: false, error: "Registration not found" };
    }

    // Update attendee count if not already cancelled
    if (existing.status !== "CANCELLED") {
      await db.event.update({
        where: { id: existing.eventId },
        data: {
          attendees: {
            decrement: existing.numberOfGuests,
          },
        },
      });
    }

    const deleted = await db.eventRegistration.delete({ where: { id } });
    revalidateAll();
    return { ok: true, data: deleted };
  } catch (err) {
    console.error("Error deleting event registration:", err);
    return { ok: false, error: "Failed to delete registration" };
  }
}

/** Bulk delete registrations */
export async function deleteEventRegistrations(
  ids: string[]
): Promise<{ ok: true; count: number } | { ok: false; error: string }> {
  try {
    // Get all registrations to update attendee counts
    const registrations = await db.eventRegistration.findMany({
      where: { id: { in: ids } },
    });

    // Group by event and calculate decrements
    const eventDecrements = new Map<string, number>();
    for (const reg of registrations) {
      if (reg.status !== "CANCELLED") {
        const current = eventDecrements.get(reg.eventId) ?? 0;
        eventDecrements.set(reg.eventId, current + reg.numberOfGuests);
      }
    }

    // Update each event's attendee count
    for (const [eventId, decrement] of eventDecrements) {
      await db.event.update({
        where: { id: eventId },
        data: {
          attendees: {
            decrement,
          },
        },
      });
    }

    const result = await db.eventRegistration.deleteMany({
      where: { id: { in: ids } },
    });

    revalidateAll();
    return { ok: true, count: result.count };
  } catch (err) {
    console.error("Error bulk deleting registrations:", err);
    return { ok: false, error: "Failed to delete registrations" };
  }
}