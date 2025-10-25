"use client";

import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import type { ColumnDef } from "@tanstack/react-table";
import type { Story } from "@prisma/client";

type StoryRow = Story & { category?: { name: string } };

export const columns: ColumnDef<StoryRow>[] = [
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

  // Author
  {
    accessorKey: "authorName",
    header: ({ column }) => <SortableColumn column={column} title="Author" />,
  },

  // Created at
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },

  // Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const story = row.original;
      return (
        <ActionColumn
          row={row}
          model="story"
          editEndpoint={`stories/update/${story.id}`}
          id={story.id}
        />
      );
    },
  },
];
