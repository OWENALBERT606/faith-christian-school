// app/dashboard/partnerships/[id]/PartnershipStatusForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updatePartnership } from "@/actions/partnerships";
import toast from "react-hot-toast";

interface PartnershipStatusFormProps {
  partnershipId: string;
  currentStatus: string;
}

export default function PartnershipStatusForm({
  partnershipId,
  currentStatus,
}: PartnershipStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      const result = await updatePartnership(partnershipId, { status });

      if (result) {
        toast.success("Partnership status has been updated successfully.");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: "Failed to update status. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Select value={status} onValueChange={setStatus} disabled={isUpdating}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleStatusUpdate}
        disabled={status === currentStatus || isUpdating}
        className="w-full"
      >
        {isUpdating ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
}