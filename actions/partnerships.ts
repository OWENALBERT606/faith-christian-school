// actions/partnerships.ts
"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { Partnership } from "@prisma/client";

/* ── Revalidation targets ──────────────────────────────────────────────── */
const REVALIDATE_PATHS = ["/partnerships", "/dashboard/partnerships"];
function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ── Types ─────────────────────────────────────────────────────────────── */
export type PartnershipCreateDTO = {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
  status?: string; // default "pending"
};

export type PartnershipUpdateDTO = Partial<PartnershipCreateDTO>;

/* ── Create ────────────────────────────────────────────────────────────── */
export async function createPartnership(
  data: PartnershipCreateDTO
): Promise<Partnership | null> {
  try {
    const created = await db.partnership.create({
      data: {
        organizationName: data.organizationName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        partnershipType: data.partnershipType,
        message: data.message,
        status: data.status ?? "pending",
      },
    });

    revalidateAll();
    return created;
  } catch (err) {
    console.error("Error creating partnership:", err);
    return null;
  }
}

/* ── Read (list) ───────────────────────────────────────────────────────── */
export async function getPartnerships(): Promise<Partnership[] | null> {
  try {
    const rows = await db.partnership.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows;
  } catch (err) {
    console.error("Error fetching partnerships:", err);
    return null;
  }
}

/* ── Read (by id) ──────────────────────────────────────────────────────── */
export async function getPartnershipById(
  id: string
): Promise<Partnership | null> {
  try {
    return await db.partnership.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error("Error fetching partnership by id:", err);
    return null;
  }
}

/* ── Filters ───────────────────────────────────────────────────────────── */
export async function getPartnershipsByStatus(
  status: string
): Promise<Partnership[] | null> {
  try {
    return await db.partnership.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching partnerships by status:", err);
    return null;
  }
}

export async function getPartnershipsByType(
  partnershipType: string
): Promise<Partnership[] | null> {
  try {
    return await db.partnership.findMany({
      where: { partnershipType },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching partnerships by type:", err);
    return null;
  }
}

/* ── Update ────────────────────────────────────────────────────────────── */
export async function updatePartnership(
  id: string,
  data: PartnershipUpdateDTO
): Promise<Partnership | null> {
  try {
    const updated = await db.partnership.update({
      where: { id },
      data: {
        ...(data.organizationName !== undefined && {
          organizationName: data.organizationName,
        }),
        ...(data.contactName !== undefined && { contactName: data.contactName }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.partnershipType !== undefined && {
          partnershipType: data.partnershipType,
        }),
        ...(data.message !== undefined && { message: data.message }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });

    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error updating partnership:", err);
    return null;
  }
}

/* ── Delete ────────────────────────────────────────────────────────────── */
export async function deletePartnership(
  id: string
): Promise<{ ok: true; data: Partnership } | null> {
  try {
    const deleted = await db.partnership.delete({ where: { id } });
    revalidateAll();
    return { ok: true, data: deleted };
  } catch (err) {
    console.error("Error deleting partnership:", err);
    return null;
  }
}