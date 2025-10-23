
import { getCategories } from "@/actions/categories";
import { getEventById } from "@/actions/events";
import { getMemberById } from "@/actions/members";
import EventForm from "@/components/Forms/events-form";
import NewMemberForm from "@/components/Forms/member-form";
import { Category } from "@prisma/client";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const categories: Category[] = (await getCategories()) ?? [];
  const id = (await params).id;
  const event = await getEventById(id);
  return (
    <div className="p-8">
      <EventForm categories={categories} initialData={event}/>
    </div>
  );
}
