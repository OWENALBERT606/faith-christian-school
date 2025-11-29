
import { getCampaignById } from "@/actions/campaigns";
import { getCategories } from "@/actions/categories";
import { getEventById } from "@/actions/events";
import { getMemberById } from "@/actions/members";
import CampaignForm from "@/components/Forms/campaign-form";
import CategoryForm from "@/components/Forms/category-form";
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
  const event = await getCampaignById(id);
  return (
    <div className="p-8">
      <CampaignForm categories={categories} initialData={event}/>
    </div>
  );
}
