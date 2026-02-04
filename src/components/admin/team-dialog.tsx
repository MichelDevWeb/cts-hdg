"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TeamMemberForm } from "./team-member-form";
import type { TeamMember } from "@/lib/db/schema";

interface TeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: TeamMember | null;
  locale: string;
}

export function TeamDialog({
  open,
  onOpenChange,
  member,
  locale,
}: TeamDialogProps) {
  const router = useRouter();

  const handleSuccess = () => {
    onOpenChange(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {member ? "Edit Team Member" : "Add New Team Member"}
          </DialogTitle>
          <DialogDescription>
            {member
              ? `Edit team member: ${member.name}`
              : "Create a new team member"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <TeamMemberForm
            member={member || undefined}
            locale={locale}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
