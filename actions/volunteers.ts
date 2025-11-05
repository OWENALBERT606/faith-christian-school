// actions/volunteers.ts
"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { Volunteer } from "@prisma/client";

/* ── Revalidation targets ──────────────────────────────────────────────── */
const REVALIDATE_PATHS = ["/volunteers", "/dashboard/volunteers"];
function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ── Types ─────────────────────────────────────────────────────────────── */
export type VolunteerCreateDTO = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  skills: string;
  availability: string;
  interests: string[];
  status?: string; // default "pending"
};

export type VolunteerUpdateDTO = Partial<VolunteerCreateDTO>;

/* ── Create ────────────────────────────────────────────────────────────── */
export async function createVolunteer(
  data: VolunteerCreateDTO
): Promise<Volunteer | null> {
  try {
    const created = await db.volunteer.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        skills: data.skills,
        availability: data.availability,
        interests: data.interests,
        status: data.status ?? "pending",
      },
    });

    revalidateAll();
    return created;
  } catch (err) {
    console.error("Error creating volunteer:", err);
    return null;
  }
}

/* ── Read (list) ───────────────────────────────────────────────────────── */
export async function getVolunteers(): Promise<Volunteer[] | null> {
  try {
    const rows = await db.volunteer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows;
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    return null;
  }
}

/* ── Read (by id) ──────────────────────────────────────────────────────── */
export async function getVolunteerById(
  id: string
): Promise<Volunteer | null> {
  try {
    return await db.volunteer.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error("Error fetching volunteer by id:", err);
    return null;
  }
}

/* ── Filters ───────────────────────────────────────────────────────────── */
export async function getVolunteersByStatus(
  status: string
): Promise<Volunteer[] | null> {
  try {
    return await db.volunteer.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching volunteers by status:", err);
    return null;
  }
}

export async function getVolunteersByInterest(
  interest: string
): Promise<Volunteer[] | null> {
  try {
    return await db.volunteer.findMany({
      where: { interests: { has: interest } }, // Postgres text[] operator
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching volunteers by interest:", err);
    return null;
  }
}

export async function getVolunteersByLocation(
  location: string
): Promise<Volunteer[] | null> {
  try {
    return await db.volunteer.findMany({
      where: { 
        location: { 
          contains: location, 
          mode: "insensitive" 
        } 
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching volunteers by location:", err);
    return null;
  }
}

/* ── Update ────────────────────────────────────────────────────────────── */
export async function updateVolunteer(
  id: string,
  data: VolunteerUpdateDTO
): Promise<Volunteer | null> {
  try {
    const updated = await db.volunteer.update({
      where: { id },
      data: {
        ...(data.fullName !== undefined && { fullName: data.fullName }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.skills !== undefined && { skills: data.skills }),
        ...(data.availability !== undefined && { availability: data.availability }),
        ...(data.interests !== undefined && { interests: data.interests }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });

    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error updating volunteer:", err);
    return null;
  }
}

/* ── Delete ────────────────────────────────────────────────────────────── */
export async function deleteVolunteer(
  id: string
): Promise<{ ok: true; data: Volunteer } | null> {
  try {
    const deleted = await db.volunteer.delete({ where: { id } });
    revalidateAll();
    return { ok: true, data: deleted };
  } catch (err) {
    console.error("Error deleting volunteer:", err);
    return null;
  }
}