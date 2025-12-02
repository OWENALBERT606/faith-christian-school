"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

/* ── Revalidate ─────────────────────────────────────────────── */
const REVALIDATE_PATHS = ["/banners", "/dashboard/banners"];

function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ── Types ──────────────────────────────────────────────────── */
export type BannerCreateDTO = {
  title: string;
  imageUrl?: string | null;
  subtitle?: string | null;
};

export type BannerUpdateDTO = Partial<BannerCreateDTO>;

export type BannerDTO = {
  id: string;
  title: string;
  imageUrl: string | null;
  subtitle: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/* ── Create ─────────────────────────────────────────────────── */
export async function createBanner(
  data: BannerCreateDTO
): Promise<BannerDTO | null> {
  try {
    // Optional duplicate guard by title
    const existing = await db.banner.findFirst({
      where: { title: data.title },
    });
    if (existing) return existing;

    const created = await db.banner.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl ?? null,
        subtitle: data.subtitle ?? null,
      },
    });

    revalidateAll();
    return created;
  } catch (err) {
    console.error("Error creating banner:", err);
    return null;
  }
}

/* ── Read (list all) ────────────────────────────────────────── */
export async function getBanners(): Promise<BannerDTO[] | null> {
  try {
    return await db.banner.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching banners:", err);
    return null;
  }
}

/* ── Read (by id) ───────────────────────────────────────────── */
export async function getBannerById(
  id: string
): Promise<BannerDTO | null> {
  try {
    return await db.banner.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error("Error fetching banner by id:", err);
    return null;
  }
}

/* ── Update ─────────────────────────────────────────────────── */
export async function updateBanner(
  id: string,
  data: BannerUpdateDTO
): Promise<BannerDTO | null> {
  try {
    const updated = await db.banner.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
      },
    });

    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error updating banner:", err);
    return null;
  }
}

/* ── Delete ─────────────────────────────────────────────────── */
export async function deleteBanner(
  id: string
): Promise<{ ok: true; data: BannerDTO } | null> {
  try {
    const deleted = await db.banner.delete({
      where: { id },
    });

    revalidateAll();
    return { ok: true, data: deleted };
  } catch (err) {
    console.error("Error deleting banner:", err);
    return null;
  }
}
