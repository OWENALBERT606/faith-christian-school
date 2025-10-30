
// import { getCategories } from "@/actions/categories";
// import { getEventById } from "@/actions/events";
// import { getMemberById } from "@/actions/members";
// import EventForm from "@/components/Forms/events-form";
// import NewMemberForm from "@/components/Forms/member-form";
// import { Category } from "@prisma/client";
// import React from "react";

// export default async function page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const categories: Category[] = (await getCategories()) ?? [];
//   const id = (await params).id;
//   const event = await getEventById(id);
//   return (
//     <div className="p-8">
//       <EventForm categories={categories} initialData={event}/>
//     </div>
//   );
// }



// app/dashboard/events/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { getCategories } from "@/actions/categories";
import { getEventById } from "@/actions/events";
import EventForm from "@/components/Forms/events-form";
import type { Category } from "@prisma/client";
import ChildForm from "@/components/Forms/children-form";
import { getChildById } from "@/actions/sponsor";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
   const id = (await params).id;
    const child = await getChildById(id);


  return (
    <div className="p-8">
      <ChildForm initialData={child} />
      {/* If your EventForm supports editingId, pass editingId={params.id} */}
    </div>
  );
}
