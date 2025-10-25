// actions/stories.ts
"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { Prisma, Story, Category } from "@prisma/client";

/* ── Revalidation targets ──────────────────────────────────────────────── */
const REVALIDATE_PATHS = ["/stories", "/dashboard/stories"];
function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ── Types ─────────────────────────────────────────────────────────────── */
export type StoryCreateDTO = {
  title: string;
  slug?: string;            // optional: will be generated from title if omitted
  categoryId: string;       // required (relation)
  authorName: string;
  authorImage: string;
  authorBio: string;
  date: string;             // display label, e.g. "March 5, 2025"
  readTime: string;         // display label, e.g. "5 min read"
  image: string;
  content: string;
  tags: string[];           // Postgres text[]
  likes?: number;           // default 0
  comments?: number;        // default 0
};

export type StoryUpdateDTO = Partial<StoryCreateDTO>;

/** Exact return shape including the Category relation */
export type StoryWithCategory =
  Prisma.StoryGetPayload<{ include: { category: true } }>;

/* ── Helpers ───────────────────────────────────────────────────────────── */
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

async function ensureUniqueSlug(base: string, currentId?: string) {
  let slug = slugify(base) || "story";
  let i = 0;
  while (true) {
    const candidate = i === 0 ? slug : `${slug}-${i}`;
    const existing = await db.story.findUnique({ where: { slug: candidate } });
    if (!existing || (currentId && existing.id === currentId)) return candidate;
    i += 1;
  }
}

/* ── Create ────────────────────────────────────────────────────────────── */
export async function createStory(data: StoryCreateDTO): Promise<Story | null> {
  try {
    // Ensure category exists
    const cat = await db.category.findUnique({ where: { id: data.categoryId } });
    if (!cat) return null;

    // Slug: use provided or generate from title (unique)
    const slug = data.slug
      ? await ensureUniqueSlug(data.slug)
      : await ensureUniqueSlug(data.title);

    // Optional duplicate guard (title + date + category)
    const duplicate = await db.story.findFirst({
      where: { title: data.title, date: data.date, categoryId: data.categoryId },
    });
    if (duplicate) return duplicate; // or return null to hard-fail

    const created = await db.story.create({
      data: {
        title: data.title,
        slug,
        categoryId: data.categoryId,
        authorName: data.authorName,
        authorImage: data.authorImage,
        authorBio: data.authorBio,
        date: data.date,
        readTime: data.readTime,
        image: data.image,
        content: data.content,
        tags: data.tags ?? [],
        likes: data.likes ?? 0,
        comments: data.comments ?? 0,
      },
    });

    revalidateAll();
    return created;
  } catch (err) {
    console.error("Error creating story:", err);
    return null;
  }
}

/* ── Read (list) ───────────────────────────────────────────────────────── */
export async function getStories(): Promise<StoryWithCategory[] | null> {
  try {
    const rows = await db.story.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    return rows;
  } catch (err) {
    console.error("Error fetching stories:", err);
    return null;
  }
}

/* ── Read (by id) ──────────────────────────────────────────────────────── */
export async function getStoryById(id: string): Promise<StoryWithCategory | null> {
  try {
    return await db.story.findUnique({
      where: { id },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching story by id:", err);
    return null;
  }
}

/* ── Read (by slug) ────────────────────────────────────────────────────── */
export async function getStoryBySlug(slug: string): Promise<StoryWithCategory | null> {
  try {
    return await db.story.findUnique({
      where: { slug },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching story by slug:", err);
    return null;
  }
}

/* ── Filters ───────────────────────────────────────────────────────────── */
export async function getStoriesByCategory(
  categoryId: string
): Promise<StoryWithCategory[] | null> {
  try {
    return await db.story.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching stories by category:", err);
    return null;
  }
}

export async function getStoriesByTag(
  tag: string
): Promise<StoryWithCategory[] | null> {
  try {
    return await db.story.findMany({
      where: { tags: { has: tag } }, // Postgres text[] operator
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  } catch (err) {
    console.error("Error fetching stories by tag:", err);
    return null;
  }
}

/* ── Update ────────────────────────────────────────────────────────────── */
export async function updateStory(
  id: string,
  data: StoryUpdateDTO
): Promise<Story | null> {
  try {
    // Validate category if changing
    if (data.categoryId) {
      const cat = await db.category.findUnique({ where: { id: data.categoryId } });
      if (!cat) return null;
    }

    // Slug: if explicitly provided, ensure unique (allow current record)
    let slugUpdate: string | undefined;
    if (data.slug !== undefined) {
      slugUpdate = await ensureUniqueSlug(data.slug || (data.title ?? "story"), id);
    }

    const updated = await db.story.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(slugUpdate !== undefined && { slug: slugUpdate }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.authorName !== undefined && { authorName: data.authorName }),
        ...(data.authorImage !== undefined && { authorImage: data.authorImage }),
        ...(data.authorBio !== undefined && { authorBio: data.authorBio }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.readTime !== undefined && { readTime: data.readTime }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.likes !== undefined && { likes: data.likes }),
        ...(data.comments !== undefined && { comments: data.comments }),
      },
    });

    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error updating story:", err);
    return null;
  }
}

/* ── Mutations (likes/comments counters) ───────────────────────────────── */
export async function incrementStoryLikes(id: string): Promise<Story | null> {
  try {
    const updated = await db.story.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error incrementing likes:", err);
    return null;
  }
}

export async function incrementStoryComments(id: string): Promise<Story | null> {
  try {
    const updated = await db.story.update({
      where: { id },
      data: { comments: { increment: 1 } },
    });
    revalidateAll();
    return updated;
  } catch (err) {
    console.error("Error incrementing comments:", err);
    return null;
  }
}

/* ── Delete ────────────────────────────────────────────────────────────── */
export async function deleteStory(
  id: string
): Promise<{ ok: true; data: Story } | null> {
  try {
    const deleted = await db.story.delete({ where: { id } });
    revalidateAll();
    return { ok: true, data: deleted };
  } catch (err) {
    console.error("Error deleting story:", err);
    return null;
  }
}
