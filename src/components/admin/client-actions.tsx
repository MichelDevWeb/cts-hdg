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
import type { Client } from "@/lib/db/schema";

interface ClientActionsProps {
  client: Client;
  locale: string;
  onEdit?: (client: Client) => void;
}

export function ClientActions({ client, locale, onEdit }: ClientActionsProps) {
  const router = useRouter();
  const t = useTranslations("admin.clients");
  const tCommon = useTranslations("common.toast");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/clients/${client.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete client");
      }

      toast.success(tCommon("deleteSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error(tCommon("deleteError"));
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleToggleActive = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${client.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...client, active: !client.active }),
      });

      if (!response.ok) {
        throw new Error("Failed to update client");
      }

      toast.success(tCommon("updateSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error updating client:", error);
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
                onEdit(client);
              } else {
                router.push(`/${locale}/admin-clients/${client.id}`);
              }
            }}
          >
              <Edit className="mr-2 h-4 w-4" />
              Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleActive}>
            {client.active ? (
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
            <AlertDialogTitle>Delete Client</AlertDialogTitle>
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

