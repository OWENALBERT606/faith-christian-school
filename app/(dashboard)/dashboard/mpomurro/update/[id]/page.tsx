import { getParishById } from "@/actions/parishes";
import NewMpomurroForm from "@/components/Forms/mpomurro-form";
import NewParishForm from "@/components/Forms/new-parsih-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const parish = await getParishById(id);
  return (
    <div className="p-8">
      <NewMpomurroForm/>
    </div>
  );
}
