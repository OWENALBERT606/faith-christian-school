// app/dashboard/events/page.tsx
import React from "react";
import { columns } from "./columns"; // make sure these are Event columns
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getEvents } from "@/actions/events";

export default async function Page() {
  const events = (await getEvents()) ?? [];

  return (
    <div className="p-8">
      <TableHeader
        title="Events"
        linkTitle="Add Event"
        href="/dashboard/events/new"
        data={events}
        model="event"
      />
      <div className="py-8">
        <DataTable data={events} columns={columns} />
      </div>
    </div>
  );
}
