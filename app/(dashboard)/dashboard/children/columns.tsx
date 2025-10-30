// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import DateColumn from "@/components/DataTableColumns/DateColumn";
// import ImageColumn from "@/components/DataTableColumns/ImageColumn";
// import SortableColumn from "@/components/DataTableColumns/SortableColumn";
// import ActionColumn from "@/components/DataTableColumns/ActionColumn";
// import type { ColumnDef } from "@tanstack/react-table";
// import type { Campaign } from "@prisma/client";

// type CampaignRow = Campaign & { category?: { name: string } | null };

// export const columns: ColumnDef<CampaignRow>[] = [
//   // Select
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(v) => row.toggleSelected(!!v)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },

//   // Image
//   {
//     accessorKey: "image",
//     header: "Image",
//     cell: ({ row }) => <ImageColumn row={row} accessorKey="image" />,
//     enableSorting: false,
//   },

//   // Title
//   {
//     accessorKey: "title",
//     header: ({ column }) => <SortableColumn column={column} title="Title" />,
//   },

//   // Category (relation)
//   {
//     id: "category",
//     header: "Category",
//     cell: ({ row }) => (
//       <span className="text-sm">{row.original.category?.name ?? "—"}</span>
//     ),
//     enableSorting: false,
//   },
//   // Status
//   {
//     accessorKey: "status",
//     header: ({ column }) => <SortableColumn column={column} title="Status" />,
//     cell: ({ getValue }) => {
//       const v = String(getValue() ?? "");
//       const cls: Record<string, string> = {
//         ACTIVE: "bg-green-100 text-green-700",
//         COMPLETED: "bg-zinc-100 text-zinc-700",
//         CANCELLED: "bg-red-100 text-red-700",
//         PAUSED: "bg-amber-100 text-amber-700",
//       };
//       return (
//         <span
//           className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
//             cls[v] ?? "bg-muted text-foreground"
//           }`}
//         >
//           {v}
//         </span>
//       );
//     },
//   },

//   // Created at
//   {
//     accessorKey: "createdAt",
//     header: "Date Created",
//     cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
//   },

//   // Actions
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const campaign = row.original;
//       return (
//         <ActionColumn
//           row={row}
//           model="campaign"
//           editEndpoint={`campaigns/update/${campaign.id}`}
//           id={campaign.id}
//         />
//       );
//     },
//   },
// ];



"use client";

import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import type { ColumnDef } from "@tanstack/react-table";

/** Align with your Child model / server action return */
export type ChildRow = {
  id: string;
  name: string;
  age: number;
  location: string;
  image?: string | null;
  isSponsored?: boolean | null; // optional; renders a pill if present
  createdAt?: string | Date | null;
};

export const columns: ColumnDef<ChildRow>[] = [
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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
    enableSorting: false,
  },

  // Name (instead of Title)
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },

  // Age
  {
    accessorKey: "age",
    header: ({ column }) => <SortableColumn column={column} title="Age" />,
  },

  // Location (instead of Category)
  {
    accessorKey: "location",
    header: ({ column }) => <SortableColumn column={column} title="Location" />,
    cell: ({ getValue }) => <span className="text-sm">{String(getValue() ?? "—")}</span>,
  },

  // Optional Status pill (if you expose isSponsored)
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const v = row.original.isSponsored ?? null;
      if (v === null || v === undefined) return <span className="text-sm text-muted-foreground">—</span>;
      const label = v ? "Sponsored" : "Available";
      const cls = v
        ? "bg-green-100 text-green-700"
        : "bg-amber-100 text-amber-700";
      return (
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${cls}`}>
          {label}
        </span>
      );
    },
    enableSorting: false,
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
      const child = row.original;
      return (
        <ActionColumn
          row={row}
          model="child"
          editEndpoint={`children/update/${child.id}`}
          id={child.id}
        />
      );
    },
  },
];
