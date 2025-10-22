import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getParishes } from "@/actions/parishes";
import { Member, Parish } from "@prisma/client";
import { getMembers } from "@/actions/members";

export default async function page() {
  const members: Member[] = (await getMembers()) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Members"
        linkTitle="Add Member"
        href="/dashboard/members/new"
        data={members}
        model="member"
      />
      <div className="py-8">
        <DataTable data={members} columns={columns} />
      </div>
    </div>
  );
}
