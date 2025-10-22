
import { getCategoryById } from "@/actions/categories";
import { getMemberById } from "@/actions/members";
import CategoryForm from "@/components/Forms/category-form";
import NewMemberForm from "@/components/Forms/member-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const category = await getCategoryById(id);
  return (
    <div className="p-8">
      <CategoryForm initialData={category}/>
    </div>
  );
}
