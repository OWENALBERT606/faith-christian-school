// app/dashboard/banners/page.tsx
import React from "react";
import { columns } from "./columns"; // your Banner columns
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getBanners } from "@/actions/banners";

export default async function Page() {
  const banners = (await getBanners()) ?? [];

  return (
    <div className="p-8">
      <TableHeader
        title="Banners"
        linkTitle="Add Banner"
        href="/dashboard/banners/new"
        data={banners}
        model="banner"
      />
      <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
}
