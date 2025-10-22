
import { getMemberById } from "@/actions/members";
import NewMemberForm from "@/components/Forms/member-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const member = await getMemberById(id);
  return (
    <div className="p-8">
      <NewMemberForm initialData={member}/>
    </div>
  );
}
