import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getParishes } from "@/actions/parishes";
import { Parish, Village } from "@prisma/client";
import { getVillages } from "@/actions/villages";

export default async function page() {
  const villages: Village[] = (await getVillages()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Villages"
        linkTitle="Add Village"
        href="/dashboard/villages/new"
        data={villages}
        model="village"
      />
      <div className="py-8">
        <DataTable data={villages} columns={columns} />
      </div>
    </div>
  );
}
