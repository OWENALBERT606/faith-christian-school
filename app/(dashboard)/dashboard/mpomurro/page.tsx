import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { Mpomurro } from "@prisma/client";
import { getMpomurros } from "@/actions/mpomurro";

export default async function page() {
  const mpomurros: Mpomurro[] = (await getMpomurros()) || [];

  return (
    <div className="p-8">
      <TableHeader
        title="Mpomurro Videos"
        linkTitle="Add Video"
        href="/dashboard/mpomurro/new"
        data={mpomurros}
        model="mpomurro"
      />
      <div className="py-8">
        <DataTable data={mpomurros} columns={columns} />
      </div>
    </div>
  );
}
