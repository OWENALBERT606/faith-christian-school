// app/dashboard/volunteers/page.tsx
import React from "react";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getVolunteers } from "@/actions/volunteers";
import { columns } from "./column";

export default async function Page() {
  const volunteers = (await getVolunteers()) ?? [];

  return (
    <div className="p-8">
      <TableHeader
        title="Volunteer Applications"
        linkTitle="View All Volunteers"
        href="/dashboard/volunteers"
        data={volunteers}
        model="volunteer"
      />
      <div className="py-8">
        <DataTable data={volunteers} columns={columns} />
      </div>
    </div>
  );
}