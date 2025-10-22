import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getParishes } from "@/actions/parishes";
import { Parish, Promise } from "@prisma/client";
import { getPromises } from "@/actions/promise";

export default async function page() {
  const promise: Promise[] = (await getPromises()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Manifestations"
        linkTitle="Add manifestation"
        href="/dashboard/promises/new"
        data={promise}
        model="promise"
      />
      <div className="py-8">
        <DataTable data={promise} columns={columns} />
      </div>
    </div>
  );
}
