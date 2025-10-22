"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { Category } from "@prisma/client";

/** Adjust to wherever categories are listed/managed */
const REVALIDATE_PATHS = ["/categories", "/dashboard/categories"];
function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ── Types ──────────────────────────────────────────────────────────────── */
export type CategoryCreateDTO = {
  name: string;
  slug: string;                 // must be unique
  description?: string | null;
};

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;

/* ── Create ─────────────────────────────────────────────────────────────── */
export async function createCategory(
  data: CategoryCreateDTO
): Promise<Category | null> {
  try {
    const { slug } = data;
    if (!slug) return null;

    const existing = await db.category.findUnique({ where: { slug } });
    if (existing) return existing; // or return null to hard-fail

    const created = await db.category.create({ data });
    revalidateAll();
    return created;
  } catch (err) {
    console.error("Error creating category:", err);
    return null;
  }
}

/* ── Read (list) ────────────────────────────────────────────────────────── */
export async function getCategories(): Promise<Category[] | null> {
  try {
    const rows = await db.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        events: true,
      }
      ,
    });
    return rows;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return null;
  }
}

/* ── Read (by id) ───────────────────────────────────────────────────────── */
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    return await db.category.findUnique({ where: { id } });
  } catch (err) {
    console.error("Error fetching category by id:", err);
    return null;
  }
}

/* ── Read (by slug) ─────────────────────────────────────────────────────── */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await db.category.findUnique({ where: { slug } });
  } catch (err) {
    console.error("Error fetching category by slug:", err);
    return null;
  }
}

/* ── Update ──────────────────────────────────────────────────────────────── */
export async function updateCategory(
  id: string,
  data: CategoryUpdateDTO
): Promise<Category | null> {
  try {
    // If slug is changing, ensure uniqueness
    if (data.slug) {
      const clash = await db.category.findUnique({ where: { slug: data.slug } });
      if (clash && clash.id !== id) {
        // slug already taken
        return null;
      }
    }

    const updated = await db.category.update({
      where: { id },
      data,
    });

    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error updating category:", err);
    return null;
  }
}

/* ── Delete ──────────────────────────────────────────────────────────────── */
export async function deleteCategory(
  id: string
): Promise<{ ok: true; data: Category } | null> {
  try {
    const deleted = await db.category.delete({ where: { id } });
    revalidateAll();
    return { ok: true, data: deleted };
  } catch (err) {
    console.error("Error deleting category:", err);
    return null;
  }
}
