// app/dashboard/categories/page.tsx (or similar)
import React from "react";
import { columns } from "./columns"; // <-- make sure these are Category columns
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { Category } from "@prisma/client";
import { getCategories } from "@/actions/categories";

export default async function Page() {
  const categories: Category[] = (await getCategories()) ?? [];

  return (
    <div className="p-8">
      <TableHeader
        title="Categories"
        linkTitle="Add Category"
        href="/dashboard/categories/new"
        data={categories}
        model="category"
      />
      <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
}
