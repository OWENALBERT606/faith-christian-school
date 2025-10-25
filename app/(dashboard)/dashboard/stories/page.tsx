// app/dashboard/stories/page.tsx
import React from "react";
import { columns } from "./columns"; // make sure these are Story columns
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getStories } from "@/actions/stories";

export default async function Page() {
  const stories = (await getStories()) ?? [];

  return (
    <div className="p-8">
      <TableHeader
        title="Stories"
        linkTitle="Add Story"
        href="/dashboard/stories/new"
        data={stories}
        model="story"
      />
      <div className="py-8">
        <DataTable data={stories} columns={columns} />
      </div>
    </div>
  );
}
