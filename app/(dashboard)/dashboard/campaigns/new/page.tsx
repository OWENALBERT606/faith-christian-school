
import { getCategories } from "@/actions/categories";
import CampaignForm from "@/components/Forms/campaign-form";
import EventForm from "@/components/Forms/events-form";
import NewMemberForm from "@/components/Forms/member-form";
import { authOptions } from "@/config/auth";
import { Category } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";
// import ParishForm from "@/components/Forms/ParishForm";

export default async function Page() {
    const categories: Category[] = (await getCategories()) ?? [];
  

  return (
    <div>
      <CampaignForm categories={categories}/>
    </div>
  );
}
