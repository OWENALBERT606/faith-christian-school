import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getParishes } from "@/actions/parishes";
import { Nosigaki, Parish } from "@prisma/client";
import { getNosigakis } from "@/actions/nosigaki";

export default async function page() {
  const nVideos: Nosigaki[] = (await getNosigakis()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Nosigaki Videos"
        linkTitle="Add Video "
        href="/dashboard/nosigaki/new"
        data={nVideos}
        model="nVideo"
      />
      <div className="py-8">
        <DataTable data={nVideos} columns={columns} />
      </div>
    </div>
  );
}
