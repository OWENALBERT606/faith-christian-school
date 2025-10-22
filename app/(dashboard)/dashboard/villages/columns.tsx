"use client";

import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Parish, Village } from "@prisma/client";
export const columns: ColumnDef<Village>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
 
  {
    accessorKey: "houseHolds",
    header: ({ column }) => <SortableColumn column={column} title="House holds" />,
  },
 
  {
    accessorKey: "description",
    header: ({ column }) => <SortableColumn column={column} title="Description" />,
  },
  {
    accessorKey: "parish.name",
    header: ({ column }) => <SortableColumn column={column} title="Parish"/>,
  },
 

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const villages = row.original;
      return (
        <ActionColumn
          row={row}
          model="village"
          editEndpoint={`villages/update/${villages.id}`}
          id={villages.id}
        />
      );
    },
  },
];
