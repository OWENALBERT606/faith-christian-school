import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getParishes } from "@/actions/parishes";
import { Parish } from "@prisma/client";

export default async function page() {
  const parishes: Parish[] = (await getParishes()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Parishes"
        linkTitle="Add Parish"
        href="/dashboard/parishes/new"
        data={parishes}
        model="parish"
      />
      <div className="py-8">
        <DataTable data={parishes} columns={columns} />
      </div>
    </div>
  );
}
