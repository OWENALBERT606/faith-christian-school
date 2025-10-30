"use server";

import { revalidatePath } from "next/cache";
import type {
  Prisma,
  Sponsor,
  Child,
  Sponsorship,
  SponsorshipStatus,
} from "@prisma/client";
import { db } from "@/prisma/db";

/* ──────────────────────────────────────────────────────────────────────────
 * Revalidation
 * ────────────────────────────────────────────────────────────────────────── */

const REVALIDATE_PATHS = [
  "/children",
  "/dashboard/children",
  "/sponsors",
  "/dashboard/sponsors",
  "/sponsorships",
  "/dashboard/sponsorships",
];

function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

/* ──────────────────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────────────────── */

export type ChildCreateDTO = {
  name: string;
  age: number;
  location: string;
  imageUrl?: string | null;
  background?: string | null;
  isFeatured?: boolean; // default false
  /** If you keep your numeric IDs from mock data for mapping: */
  extId?: number | null;
};

export type ChildUpdateDTO = Partial<ChildCreateDTO>;

export type SponsorCreateDTO = {
  fullName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
};

export type SponsorUpdateDTO = Partial<SponsorCreateDTO>;

export type SponsorshipCreateDTO = {
  sponsorId: string;
  childId: string;
  monthlyAmount?: number; // default 50
  status?: SponsorshipStatus; // default ACTIVE
  agreeToTerms?: boolean; // default true
  startDate?: string | Date; // optional override
};

export type SponsorshipUpdateDTO = Partial<{
  monthlyAmount: number;
  status: SponsorshipStatus;
  active: boolean;
  endDate: Date | string | null;
  agreeToTerms: boolean;
}>;

/** Handy payload types with common includes */
export type SponsorshipWithRelations = Prisma.SponsorshipGetPayload<{
  include: { sponsor: true; child: true };
}>;

export type ChildWithSponsorships = Prisma.ChildGetPayload<{
  include: { sponsorships: true };
}>;

export type SponsorWithSponsorships = Prisma.SponsorGetPayload<{
  include: { sponsorships: true };
}>;

/* ──────────────────────────────────────────────────────────────────────────
 * CHILD CRUD
 * ────────────────────────────────────────────────────────────────────────── */

export async function createChild(data: ChildCreateDTO): Promise<Child | null> {
  try {
    const created = await db.child.create({
      data: {
        name: data.name,
        age: data.age,
        location: data.location,
        imageUrl: data.imageUrl ?? null,
        background: data.background ?? null,
        isFeatured: data.isFeatured ?? false,
        extId: data.extId ?? null,
      },
    });
    revalidateAll();
    return created;
  } catch (err) {
    console.error("createChild error:", err);
    return null;
  }
}

export async function getChildren(): Promise<Child[] | null> {
  try {
    return await db.child.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("getChildren error:", err);
    return null;
  }
}

export async function getChildrenWithSponsorships(): Promise<ChildWithSponsorships[] | null> {
  try {
    return await db.child.findMany({
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      include: { sponsorships: true },
    });
  } catch (err) {
    console.error("getChildrenWithSponsorships error:", err);
    return null;
  }
}

/** Children who do NOT have an active sponsorship */
export async function getChildrenAvailable(): Promise<Child[] | null> {
  try {
    return await db.child.findMany({
      where: {
        sponsorships: {
          none: { active: true },
        },
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
  } catch (err) {
    console.error("getChildrenAvailable error:", err);
    return null;
  }
}

export async function getChildById(id: string): Promise<ChildWithSponsorships | null> {
  try {
    return await db.child.findUnique({
      where: { id },
      include: { sponsorships: true },
    });
  } catch (err) {
    console.error("getChildById error:", err);
    return null;
  }
}

export async function updateChild(id: string, data: ChildUpdateDTO): Promise<Child | null> {
  try {
    const updated = await db.child.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.age !== undefined && { age: data.age }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(data.background !== undefined && { background: data.background }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
        ...(data.extId !== undefined && { extId: data.extId }),
      },
    });
    revalidateAll();
    return updated;
  } catch (err) {
    console.error("updateChild error:", err);
    return null;
  }
}

export async function deleteChild(id: string): Promise<{ ok: true; data: Child } | null> {
  try {
    const deleted = await db.child.delete({ where: { id } });
    revalidateAll();
    return { ok: true as const, data: deleted };
  } catch (err) {
    console.error("deleteChild error:", err);
    return null;
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * SPONSOR CRUD
 * ────────────────────────────────────────────────────────────────────────── */

export async function createSponsor(data: SponsorCreateDTO): Promise<Sponsor | null> {
  try {
    const created = await db.sponsor.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        address: data.address ?? null,
      },
    });
    revalidateAll();
    return created;
  } catch (err) {
    console.error("createSponsor error:", err);
    return null;
  }
}

export async function getSponsors(): Promise<Sponsor[] | null> {
  try {
    return await db.sponsor.findMany({ orderBy: { createdAt: "desc" } });
  } catch (err) {
    console.error("getSponsors error:", err);
    return null;
  }
}

export async function getSponsorById(id: string): Promise<SponsorWithSponsorships | null> {
  try {
    return await db.sponsor.findUnique({
      where: { id },
      include: { sponsorships: true },
    });
  } catch (err) {
    console.error("getSponsorById error:", err);
    return null;
  }
}

/** Upsert sponsor by email (very handy for your form flow) */
export async function getOrCreateSponsorByEmail(
  data: SponsorCreateDTO
): Promise<Sponsor | null> {
  try {
    const sponsor = await db.sponsor.upsert({
      where: { email: data.email },
      update: {
        fullName: data.fullName,
        phone: data.phone ?? null,
        address: data.address ?? null,
      },
      create: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        address: data.address ?? null,
      },
    });
    return sponsor;
  } catch (err) {
    console.error("getOrCreateSponsorByEmail error:", err);
    return null;
  }
}

export async function updateSponsor(id: string, data: SponsorUpdateDTO): Promise<Sponsor | null> {
  try {
    const updated = await db.sponsor.update({
      where: { id },
      data: {
        ...(data.fullName !== undefined && { fullName: data.fullName }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.address !== undefined && { address: data.address }),
      },
    });
    revalidateAll();
    return updated;
  } catch (err) {
    console.error("updateSponsor error:", err);
    return null;
  }
}

export async function deleteSponsor(id: string): Promise<{ ok: true; data: Sponsor } | null> {
  try {
    const deleted = await db.sponsor.delete({ where: { id } });
    revalidateAll();
    return { ok: true as const, data: deleted };
  } catch (err) {
    console.error("deleteSponsor error:", err);
    return null;
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * SPONSORSHIP CRUD
 * ────────────────────────────────────────────────────────────────────────── */

/** Raw create (expects existing sponsorId & childId) */
export async function createSponsorship(
  data: SponsorshipCreateDTO
): Promise<SponsorshipWithRelations | null> {
  try {
    // Ensure child exists
    const child = await db.child.findUnique({ where: { id: data.childId } });
    if (!child) return null;

    // Ensure no other ACTIVE/active sponsorship for this child
    const active = await db.sponsorship.findFirst({
      where: { childId: data.childId, active: true },
      select: { id: true },
    });
    if (active) return null;

    const created = await db.sponsorship.create({
      data: {
        sponsorId: data.sponsorId,
        childId: data.childId,
        monthlyAmount: data.monthlyAmount ?? 50,
        status: data.status ?? "ACTIVE",
        active: true,
        agreeToTerms: data.agreeToTerms ?? true,
        ...(data.startDate ? { startDate: new Date(data.startDate) } : {}),
      },
      include: { sponsor: true, child: true },
    });

    revalidateAll();
    return created;
  } catch (err) {
    console.error("createSponsorship error:", err);
    return null;
  }
}

/** Convenience: create sponsorship from your form without needing sponsorId */
export async function createSponsorshipFromForm(input: {
  childId: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  monthlyAmount?: number;
  agreeToTerms?: boolean;
}): Promise<SponsorshipWithRelations | null> {
  try {
    const child = await db.child.findUnique({ where: { id: input.childId } });
    if (!child) return null;

    const existingActive = await db.sponsorship.findFirst({
      where: { childId: input.childId, active: true },
      select: { id: true },
    });
    if (existingActive) return null;

    const sponsor = await db.sponsor.upsert({
      where: { email: input.email },
      update: {
        fullName: input.fullName,
        phone: input.phone ?? null,
        address: input.address ?? null,
      },
      create: {
        fullName: input.fullName,
        email: input.email,
        phone: input.phone ?? null,
        address: input.address ?? null,
      },
    });

    const created = await db.sponsorship.create({
      data: {
        sponsorId: sponsor.id,
        childId: input.childId,
        monthlyAmount: input.monthlyAmount && isFinite(input.monthlyAmount)
          ? input.monthlyAmount
          : 50,
        status: "ACTIVE",
        active: true,
        agreeToTerms: !!input.agreeToTerms,
      },
      include: { sponsor: true, child: true },
    });

    revalidateAll();
    return created;
  } catch (err) {
    console.error("createSponsorshipFromForm error:", err);
    return null;
  }
}

export async function getSponsorships(): Promise<SponsorshipWithRelations[] | null> {
  try {
    return await db.sponsorship.findMany({
      orderBy: { createdAt: "desc" },
      include: { sponsor: true, child: true },
    });
  } catch (err) {
    console.error("getSponsorships error:", err);
    return null;
  }
}

export async function getSponsorshipById(id: string): Promise<SponsorshipWithRelations | null> {
  try {
    return await db.sponsorship.findUnique({
      where: { id },
      include: { sponsor: true, child: true },
    });
  } catch (err) {
    console.error("getSponsorshipById error:", err);
    return null;
  }
}

export async function updateSponsorship(
  id: string,
  data: SponsorshipUpdateDTO
): Promise<SponsorshipWithRelations | null> {
  try {
    const updated = await db.sponsorship.update({
      where: { id },
      data: {
        ...(data.monthlyAmount !== undefined && { monthlyAmount: data.monthlyAmount }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.active !== undefined && { active: data.active }),
        ...(data.endDate !== undefined && {
          endDate: data.endDate ? new Date(data.endDate) : null,
        }),
        ...(data.agreeToTerms !== undefined && { agreeToTerms: data.agreeToTerms }),
      },
      include: { sponsor: true, child: true },
    });
    revalidateAll();
    return updated;
  } catch (err) {
    console.error("updateSponsorship error:", err);
    return null;
  }
}

/** Pause (keeps active=true vs false; choose one policy and stick to it). */
export async function pauseSponsorship(id: string): Promise<SponsorshipWithRelations | null> {
  try {
    const updated = await db.sponsorship.update({
      where: { id },
      data: { status: "PAUSED" },
      include: { sponsor: true, child: true },
    });
    revalidateAll();
    return updated;
  } catch (err) {
    console.error("pauseSponsorship error:", err);
    return null;
  }
}

/** Resume from paused */
export async function resumeSponsorship(id: string): Promise<SponsorshipWithRelations | null> {
  try {
    const updated = await db.sponsorship.update({
      where: { id },
      data: { status: "ACTIVE" },
      include: { sponsor: true, child: true },
    });
    revalidateAll();
    return updated;
  } catch (err) {
    console.error("resumeSponsorship error:", err);
    return null;
  }
}

/** End sponsorship (mark inactive, set status ENDED + endDate) */
export async function endSponsorship(id: string): Promise<SponsorshipWithRelations | null> {
  try {
    const updated = await db.sponsorship.update({
      where: { id },
      data: { status: "ENDED", active: false, endDate: new Date() },
      include: { sponsor: true, child: true },
    });
    revalidateAll();
    return updated;
  } catch (err) {
    console.error("endSponsorship error:", err);
    return null;
  }
}

export async function deleteSponsorship(id: string): Promise<{ ok: true; data: Sponsorship } | null> {
  try {
    const deleted = await db.sponsorship.delete({ where: { id } });
    revalidateAll();
    return { ok: true as const, data: deleted };
  } catch (err) {
    console.error("deleteSponsorship error:", err);
    return null;
  }
}
