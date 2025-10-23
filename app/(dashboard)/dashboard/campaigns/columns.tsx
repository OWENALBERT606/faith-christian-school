"use client";

import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import type { ColumnDef } from "@tanstack/react-table";
import type { Campaign } from "@prisma/client";

type CampaignRow = Campaign & { category?: { name: string } | null };

export const columns: ColumnDef<CampaignRow>[] = [
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

  // Image
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="image" />,
    enableSorting: false,
  },

  // Title
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },

  // Category (relation)
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.category?.name ?? "—"}</span>
    ),
    enableSorting: false,
  },
  // Status
  {
    accessorKey: "status",
    header: ({ column }) => <SortableColumn column={column} title="Status" />,
    cell: ({ getValue }) => {
      const v = String(getValue() ?? "");
      const cls: Record<string, string> = {
        ACTIVE: "bg-green-100 text-green-700",
        COMPLETED: "bg-zinc-100 text-zinc-700",
        CANCELLED: "bg-red-100 text-red-700",
        PAUSED: "bg-amber-100 text-amber-700",
      };
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            cls[v] ?? "bg-muted text-foreground"
          }`}
        >
          {v}
        </span>
      );
    },
  },

  // Created at
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },

  // Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const campaign = row.original;
      return (
        <ActionColumn
          row={row}
          model="campaign"
          editEndpoint={`campaigns/update/${campaign.id}`}
          id={campaign.id}
        />
      );
    },
  },
];
