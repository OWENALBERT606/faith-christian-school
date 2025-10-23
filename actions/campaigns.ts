"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { Prisma, Campaign, CampaignStatus } from "@prisma/client";

/** Pages that should revalidate when campaigns change */
const REVALIDATE_PATHS = ["/campaigns", "/dashboard/campaigns"];
function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ──────────────────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────────────────── */

export type CampaignUpdateItem = {
  date: string;
  title: string;
  content: string;
};

export type CampaignCreateDTO = {
  title: string;

  /** strict relation */
  categoryId: string;

  image: string;
  description: string;
  longDescription: string;

  goal: number;
  raised?: number;        // default 0
  supporters?: number;    // default 0
  daysLeft?: number;      // default 0

  /** display labels (strings) */
  startDate: string;
  endDate: string;

  /** Postgres text[] (or switch your schema to Json if not on Postgres) */
  impact: string[];

  /** [{ date, title, content }] */
  updates: CampaignUpdateItem[];

  status?: CampaignStatus; // default ACTIVE
};

export type CampaignUpdateDTO = Partial<CampaignCreateDTO>;

/** Derive the exact type Prisma returns when including the category relation */
export type CampaignWithCategory =
  Prisma.CampaignGetPayload<{ include: { category: true } }>;

/* ──────────────────────────────────────────────────────────────────────────
 * Create
 * ────────────────────────────────────────────────────────────────────────── */

export async function createCampaign(
  data: CampaignCreateDTO
): Promise<Campaign | null> {
  try {
    // Ensure category exists (since categoryId is required)
    const cat = await db.category.findUnique({ where: { id: data.categoryId } });
    if (!cat) return null;

    // Duplicate guard (tune this logic for your domain)
    const existing = await db.campaign.findFirst({
      where: {
        title: data.title,
        startDate: data.startDate,
        categoryId: data.categoryId,
      },
    });
    if (existing) return existing; // or return null to hard-fail on duplicates

    const created = await db.campaign.create({
      data: {
        title: data.title,
        categoryId: data.categoryId,
        image: data.image,
        description: data.description,
        longDescription: data.longDescription,
        goal: data.goal,
        raised: data.raised ?? 0,
        supporters: data.supporters ?? 0,
        daysLeft: data.daysLeft ?? 0,
        startDate: data.startDate,
        endDate: data.endDate,
        impact: data.impact,
        updates: data.updates as unknown as Prisma.InputJsonValue,
        status: data.status ?? "ACTIVE",
      },
    });

    revalidateAll();
    return created;
  } catch (err) {
    console.error("Error creating campaign:", err);
    return null;
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Read (list, by id, filters)
 * ────────────────────────────────────────────────────────────────────────── */

export async function getCampaigns(): Promise<CampaignWithCategory[] | null> {
  try {
    const rows = await db.campaign.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true }, // category can be null if your schema allows it
    });
    return rows;
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    return null;
  }
}

export async function getCampaignById(
  id: string
): Promise<CampaignWithCategory | null> {
  try {
    return await db.campaign.findUnique({
      where: { id },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching campaign by id:", err);
    return null;
  }
}

export async function getCampaignsByStatus(
  status: CampaignStatus
): Promise<CampaignWithCategory[] | null> {
  try {
    return await db.campaign.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching campaigns by status:", err);
    return null;
  }
}

export async function getCampaignsByCategoryId(
  categoryId: string
): Promise<CampaignWithCategory[] | null> {
  try {
    return await db.campaign.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching campaigns by category:", err);
    return null;
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Update
 * ────────────────────────────────────────────────────────────────────────── */

export async function updateCampaign(
  id: string,
  data: CampaignUpdateDTO
): Promise<Campaign | null> {
  try {
    // Validate category if it's changing
    if (data.categoryId) {
      const cat = await db.category.findUnique({ where: { id: data.categoryId } });
      if (!cat) return null;
    }

    const updated = await db.campaign.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.longDescription !== undefined && { longDescription: data.longDescription }),
        ...(data.goal !== undefined && { goal: data.goal }),
        ...(data.raised !== undefined && { raised: data.raised }),
        ...(data.supporters !== undefined && { supporters: data.supporters }),
        ...(data.daysLeft !== undefined && { daysLeft: data.daysLeft }),
        ...(data.startDate !== undefined && { startDate: data.startDate }),
        ...(data.endDate !== undefined && { endDate: data.endDate }),
        ...(data.impact !== undefined && { impact: data.impact }),
        ...(data.updates !== undefined && {
          updates: data.updates as unknown as Prisma.InputJsonValue,
        }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });

    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error updating campaign:", err);
    return null;
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * Delete
 * ────────────────────────────────────────────────────────────────────────── */

export async function deleteCampaign(
  id: string
): Promise<{ ok: true; data: Campaign } | null> {
  try {
    const deleted = await db.campaign.delete({ where: { id } });
    revalidateAll();
    return { ok: true, data: deleted };
  } catch (err) {
    console.error("Error deleting campaign:", err);
    return null;
  }
}
