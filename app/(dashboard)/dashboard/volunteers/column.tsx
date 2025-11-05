// app/dashboard/volunteers/columns.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import type { ColumnDef } from "@tanstack/react-table";
import type { Volunteer } from "@prisma/client";
import Link from "next/link";

export const columns: ColumnDef<Volunteer>[] = [
  // Select
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Full Name
  {
    accessorKey: "fullName",
    header: ({ column }) => <SortableColumn column={column} title="Full Name" />,
    cell: ({ row }) => {
      const volunteer = row.original;
      return (
        <Link
          href={`/dashboard/volunteers/${volunteer.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
        >
          {volunteer.fullName}
        </Link>
      );
    },
  },

  // Email
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => {
      const email = getValue() as string;
      return (
        <a
          href={`mailto:${email}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {email}
        </a>
      );
    },
  },

  // Phone
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ getValue }) => {
      const phone = getValue() as string;
      return (
        <a
          href={`tel:${phone}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {phone}
        </a>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableColumn column={column} title="Status" />,
    cell: ({ getValue }) => {
      const status = String(getValue() ?? "pending");
      const styles: Record<string, string> = {
        pending: "bg-amber-100 text-amber-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        contacted: "bg-blue-100 text-blue-700",
      };
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            styles[status] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },

  // Created at
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableColumn column={column} title="Date Applied" />
    ),
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },

  // Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const volunteer = row.original;
      return (
        <ActionColumn
          row={row}
          model="volunteer"
          editEndpoint={`volunteers/${volunteer.id}`}
          id={volunteer.id}
        />
      );
    },
  },
];
