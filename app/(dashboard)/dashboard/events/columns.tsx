// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import DateColumn from "@/components/DataTableColumns/DateColumn";
// import ImageColumn from "@/components/DataTableColumns/ImageColumn";
// import SortableColumn from "@/components/DataTableColumns/SortableColumn";
// import ActionColumn from "@/components/DataTableColumns/ActionColumn";
// import type { ColumnDef } from "@tanstack/react-table";
// import type { Event } from "@prisma/client";

// type EventRow = Event & { category?: { name: string } };

// export const columns: ColumnDef<EventRow>[] = [
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

//   // Category (from relation include)
//   {
//     id: "category",
//     header: "Category",
//     cell: ({ row }) => (
//       <span className="text-sm">
//         {row.original.category?.name ?? "—"}
//       </span>
//     ),
//     enableSorting: false,
//   },

//   // Date & Time (labels)
//   {
//     accessorKey: "date",
//     header: ({ column }) => <SortableColumn column={column} title="Date" />,
//   },
//   {
//     accessorKey: "time",
//     header: ({ column }) => <SortableColumn column={column} title="Time" />,
//   },

//   // Status badge
//   {
//     accessorKey: "status",
//     header: ({ column }) => <SortableColumn column={column} title="Status" />,
//     cell: ({ getValue }) => {
//       const v = String(getValue() ?? "");
//       const cls: Record<string, string> = {
//         UPCOMING: "bg-blue-100 text-blue-700",
//         ONGOING: "bg-green-100 text-green-700",
//         COMPLETED: "bg-zinc-100 text-zinc-700",
//         CANCELLED: "bg-red-100 text-red-700",
//       };
//       return (
//         <span
//           className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${cls[v] ?? "bg-muted text-foreground"}`}
//         >
//           {v}
//         </span>
//       );
//     },
//   },

//   // Actions
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const ev = row.original;
//       return (
//         <ActionColumn
//           row={row}
//           model="event"
//           editEndpoint={`events/update/${ev.id}`}
//           id={ev.id}
//         />
//       );
//     },
//   },
// ];



"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import type { ColumnDef } from "@tanstack/react-table";
import type { Event, EventRegistration } from "@prisma/client";
import { Users, Loader2, Mail, Phone, UserCheck, UserX, Clock, MoreHorizontal } from "lucide-react";

import { toast } from "sonner";
import { getEventRegistrationsByEventId, updateRegistrationStatus } from "@/actions/eventregistration";

type EventRow = Event & { 
  category?: { name: string };
  _count?: { registrations: number };
};

// Registration Viewer Component
function RegistrationViewer({ event }: { event: EventRow }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const data = await getEventRegistrationsByEventId(event.id);
      setRegistrations(data || []);
    } catch (error) {
      toast.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchRegistrations();
    }
  };

  const handleStatusChange = async (registrationId: string, status: "PENDING" | "CONFIRMED" | "CANCELLED" | "ATTENDED") => {
    try {
      const result = await updateRegistrationStatus(registrationId, status);
      if (result.success) {
        toast.success(`Registration ${status.toLowerCase()}`);
        fetchRegistrations(); // Refresh the list
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
      CONFIRMED: "bg-green-100 text-green-700 border-green-200",
      CANCELLED: "bg-red-100 text-red-700 border-red-200",
      ATTENDED: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return (
      <Badge variant="outline" className={styles[status] || "bg-gray-100"}>
        {status}
      </Badge>
    );
  };

  const registrationCount = event._count?.registrations ?? event.attendees ?? 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Users className="h-4 w-4" />
          <span>{registrationCount}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Registrations for "{event.title}"
          </DialogTitle>
          <DialogDescription>
            {registrations.length} {registrations.length === 1 ? "person has" : "people have"} registered for this event
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : registrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No registrations yet</p>
              <p className="text-sm">People who register for this event will appear here</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-center">Guests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell>
                      <div className="font-medium">{reg.fullName}</div>
                      {reg.specialRequirements && (
                        <div className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate">
                          Note: {reg.specialRequirements}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <a 
                          href={`mailto:${reg.email}`} 
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Mail className="h-3 w-3" />
                          {reg.email}
                        </a>
                        <a 
                          href={`tel:${reg.phone}`} 
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Phone className="h-3 w-3" />
                          {reg.phone}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{reg.numberOfGuests}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(reg.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(reg.id, "CONFIRMED")}
                            disabled={reg.status === "CONFIRMED"}
                          >
                            <UserCheck className="h-4 w-4 mr-2 text-green-600" />
                            Confirm
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(reg.id, "ATTENDED")}
                            disabled={reg.status === "ATTENDED"}
                          >
                            <UserCheck className="h-4 w-4 mr-2 text-blue-600" />
                            Mark Attended
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(reg.id, "PENDING")}
                            disabled={reg.status === "PENDING"}
                          >
                            <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                            Set Pending
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(reg.id, "CANCELLED")}
                            disabled={reg.status === "CANCELLED"}
                            className="text-red-600"
                          >
                            <UserX className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Summary Footer */}
        {registrations.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div>
                Total Guests: <span className="font-medium text-foreground">
                  {registrations.reduce((sum, r) => sum + r.numberOfGuests, 0)}
                </span>
              </div>
              <div>
                Confirmed: <span className="font-medium text-green-600">
                  {registrations.filter(r => r.status === "CONFIRMED").length}
                </span>
              </div>
              <div>
                Pending: <span className="font-medium text-yellow-600">
                  {registrations.filter(r => r.status === "PENDING").length}
                </span>
              </div>
              <div>
                Attended: <span className="font-medium text-blue-600">
                  {registrations.filter(r => r.status === "ATTENDED").length}
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export const columns: ColumnDef<EventRow>[] = [
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

  // Category (from relation include)
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.category?.name ?? "—"}
      </span>
    ),
    enableSorting: false,
  },

  // Date & Time (labels)
  {
    accessorKey: "date",
    header: ({ column }) => <SortableColumn column={column} title="Date" />,
  },
  {
    accessorKey: "time",
    header: ({ column }) => <SortableColumn column={column} title="Time" />,
  },

  // Registrations - NEW COLUMN
  {
    id: "registrations",
    header: "Registrations",
    cell: ({ row }) => <RegistrationViewer event={row.original} />,
    enableSorting: false,
  },

  // Status badge
  {
    accessorKey: "status",
    header: ({ column }) => <SortableColumn column={column} title="Status" />,
    cell: ({ getValue }) => {
      const v = String(getValue() ?? "");
      const cls: Record<string, string> = {
        UPCOMING: "bg-blue-100 text-blue-700",
        ONGOING: "bg-green-100 text-green-700",
        COMPLETED: "bg-zinc-100 text-zinc-700",
        CANCELLED: "bg-red-100 text-red-700",
      };
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${cls[v] ?? "bg-muted text-foreground"}`}
        >
          {v}
        </span>
      );
    },
  },

  // Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const ev = row.original;
      return (
        <ActionColumn
          row={row}
          model="event"
          editEndpoint={`events/update/${ev.id}`}
          id={ev.id}
        />
      );
    },
  },
];