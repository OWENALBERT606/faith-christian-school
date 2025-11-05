

// // app/dashboard/partnerships/columns.tsx
// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import DateColumn from "@/components/DataTableColumns/DateColumn";
// import SortableColumn from "@/components/DataTableColumns/SortableColumn";
// import ActionColumn from "@/components/DataTableColumns/ActionColumn";
// import type { ColumnDef } from "@tanstack/react-table";
// import type { Partnership } from "@prisma/client";
// import Link from "next/link";

// export const columns: ColumnDef<Partnership>[] = [
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

//   // Organization Name
//   {
//     accessorKey: "organizationName",
//     header: ({ column }) => (
//       <SortableColumn column={column} title="Organization" />
//     ),
//     cell: ({ row }) => {
//       const partnership = row.original;
//       return (
//         <Link
//           href={`/dashboard/partnerships/${partnership.id}`}
//           className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
//         >
//           {partnership.organizationName}
//         </Link>
//       );
//     },
//   },

//   // Contact Name
//   {
//     accessorKey: "contactName",
//     header: ({ column }) => (
//       <SortableColumn column={column} title="Contact Person" />
//     ),
//   },

//   // Email
//   {
//     accessorKey: "email",
//     header: "Email",
//     cell: ({ getValue }) => (
      
//         href={`mailto:${getValue() as string}`}
//         className="text-sm text-blue-600 hover:underline"
//       >
//         {getValue() as string}
//       </a>
//     ),
//   },

//   // Phone
//   {
//     accessorKey: "phone",
//     header: "Phone",
//     cell: ({ getValue }) => (
      
//         href={`tel:${getValue() as string}`}
//         className="text-sm text-blue-600 hover:underline"
//       >
//         {getValue() as string}
//       </a>
//     ),
//   },

//   // Partnership Type
//   {
//     accessorKey: "partnershipType",
//     header: ({ column }) => <SortableColumn column={column} title="Type" />,
//     cell: ({ getValue }) => {
//       const type = String(getValue() ?? "");
//       const labels: Record<string, string> = {
//         corporate: "Corporate Sponsorship",
//         foundation: "Foundation Grant",
//         community: "Community Organization",
//         educational: "Educational Institution",
//         other: "Other",
//       };
//       return (
//         <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
//           {labels[type] ?? type}
//         </span>
//       );
//     },
//   },

//   // Status
//   {
//     accessorKey: "status",
//     header: ({ column }) => <SortableColumn column={column} title="Status" />,
//     cell: ({ getValue }) => {
//       const status = String(getValue() ?? "pending");
//       const styles: Record<string, string> = {
//         pending: "bg-amber-100 text-amber-700",
//         approved: "bg-green-100 text-green-700",
//         rejected: "bg-red-100 text-red-700",
//         contacted: "bg-blue-100 text-blue-700",
//       };
//       return (
//         <span
//           className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
//             styles[status] ?? "bg-gray-100 text-gray-700"
//           }`}
//         >
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       );
//     },
//   },

//   // Created at
//   {
//     accessorKey: "createdAt",
//     header: ({ column }) => (
//       <SortableColumn column={column} title="Date Submitted" />
//     ),
//     cell: ({ row:any }) => <DateColumn row={row} accessorKey="createdAt" />,
//   },

//   // Actions
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const partnership = row.original;
//       return (
//         <ActionColumn
//           row={row}
//           model="partnership"
//           editEndpoint={`partnerships/${partnership.id}`}
//           id={partnership.id}
//         />
//       );
//     },
//   },
// ];




// app/dashboard/partnerships/columns.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import type { ColumnDef } from "@tanstack/react-table";
import type { Partnership } from "@prisma/client";
import Link from "next/link";

export const columns: ColumnDef<Partnership>[] = [
  // ✅ Select
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
    size: 40,
  },

  // ✅ Organization Name
  {
    accessorKey: "organizationName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Organization" />
    ),
    cell: ({ row }) => {
      const partnership = row.original;
      return (
        <Link
          href={`/dashboard/partnerships/${partnership.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
        >
          {partnership.organizationName}
        </Link>
      );
    },
    size: 180,
  },

  // ✅ Contact Person
 

  // ✅ Email
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <a
        href={`mailto:${getValue() as string}`}
        className="text-sm text-blue-600 hover:underline"
      >
        {getValue() as string}
      </a>
    ),
    size: 180,
  },

  // ✅ Phone
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ getValue }) => (
      <a
        href={`tel:${getValue() as string}`}
        className="text-sm text-blue-600 hover:underline"
      >
        {getValue() as string}
      </a>
    ),
    size: 140,
  },

  // ✅ Status
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
    size: 120,
  },

  // ✅ Created At
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableColumn column={column} title="Date Submitted" />
    ),
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
    size: 140,
  },

  // ✅ Actions
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const partnership = row.original;
      return (
        <ActionColumn
          row={row}
          model="partnership"
          editEndpoint={`partnerships/${partnership.id}`}
          id={partnership.id}
        />
      );
    },
    enableSorting: false,
    size: 80,
  },
];
