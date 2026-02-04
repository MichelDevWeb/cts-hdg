"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import type { TeamMember } from "@/lib/db/schema";

interface TeamMemberActionsProps {
  member: TeamMember;
  locale: string;
  onEdit?: (member: TeamMember) => void;
}

export function TeamMemberActions({ member, locale, onEdit }: TeamMemberActionsProps) {
  const router = useRouter();
  const t = useTranslations("admin.team");
  const tCommon = useTranslations("common.toast");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/team/${member.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete team member");
      }

      toast.success(tCommon("deleteSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error(tCommon("deleteError"));
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleToggleActive = async () => {
    try {
      const response = await fetch(`/api/admin/team/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...member, active: !member.active }),
      });

      if (!response.ok) {
        throw new Error("Failed to update team member");
      }

      toast.success(tCommon("updateSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error(tCommon("updateError"));
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              if (onEdit) {
                onEdit(member);
              } else {
                router.push(`/${locale}/admin-team/${member.id}`);
              }
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleActive}>
            {member.active ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Set Inactive
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Set Active
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteConfirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

