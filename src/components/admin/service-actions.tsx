"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { Service } from "@/lib/db/schema";

interface ServiceActionsProps {
  service: Service;
  locale: string;
}

export function ServiceActions({ service, locale }: ServiceActionsProps) {
  const router = useRouter();
  const t = useTranslations("admin.services");
  const tCommon = useTranslations("common");

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      toast.success(t("form.deleteSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error(t("form.deleteError"));
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/${locale}/admin-services/${service.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            {t("editService")}
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              {tCommon("delete")}
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("form.deleteConfirm")}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            service <span className="font-semibold">{service.nameEn}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tCommon("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            {tCommon("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
