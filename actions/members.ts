"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { Member } from "@prisma/client";


export type MemberCreateDTO = {
  name: string;
  position: string;
  photo: string;
  description: string;
};

export type MemberUpdateDTO = Partial<MemberCreateDTO>;

// Optional: revalidate multiple pages that show member lists/details
const REVALIDATE_PATHS = ["/dashboard/members", "/hoimacitywest"];
function revalidateAll() {
  for (const p of REVALIDATE_PATHS) revalidatePath(p);
}

// ✅ Create new member
export async function createMember(data: MemberCreateDTO): Promise<Member | null> {
  try {
    // If you want to prevent duplicates, check by (name + position).
    // Remove this block if duplicates are allowed.
    const existingMember = await db.member.findFirst({
      where: { name: data.name, position: data.position },
    });
    if (existingMember) {
      return existingMember; // or `return null;` if you prefer a strict duplicate failure
    }

    const newMember = await db.member.create({ data });
    revalidateAll();
    return newMember;
  } catch (error) {
    console.error("Error creating member:", error);
    return null;
  }
}

// ✅ Get all members
export async function getMembers(): Promise<Member[] | null> {
  try {
    const members = await db.member.findMany({
      orderBy: { createdAt: "desc" },
    });
    return members;
  } catch (error) {
    console.error("Error fetching members:", error);
    return null;
  }
}

// ✅ Get member by ID
export async function getMemberById(id: string): Promise<Member | null> {
  try {
    const member = await db.member.findUnique({
      where: { id },
    });
    return member;
  } catch (error) {
    console.error("Error fetching member by ID:", error);
    return null;
  }
}

// ✅ Update member
export async function updateMember(id: string, data: MemberUpdateDTO): Promise<Member | null> {
  try {
    const updatedMember = await db.member.update({
      where: { id },
      data,
    });
    revalidateAll();
    return updatedMember;
  } catch (error) {
    console.error("Error updating member:", error);
    return null;
  }
}

// ✅ Delete member
export async function deleteMember(id: string): Promise<{ ok: true; data: Member } | null> {
  try {
    const member = await db.member.delete({
      where: { id },
    });
    revalidateAll();
    return { ok: true, data: member };
  } catch (error) {
    console.error("Error deleting member:", error);
    return null;
  }
}
