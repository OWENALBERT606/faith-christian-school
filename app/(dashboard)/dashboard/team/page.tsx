import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { Member } from "@prisma/client";
import { getMembers } from "@/actions/members";

export default async function page() {
  const members: Member[] = (await getMembers()) || [];


  return (
    <div className="p-8">
      <TableHeader
        title="Team Members"
        linkTitle="Add New Member"
        href="/dashboard/team/new"
        data={members}
        model="team"
      />
      <div className="py-8">
        <DataTable data={members} columns={columns} />
      </div>
    </div>
  );
}
