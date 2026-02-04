"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ClientForm } from "./client-form";
import type { Client } from "@/lib/db/schema";

interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
  locale: string;
}

export function ClientDialog({
  open,
  onOpenChange,
  client,
  locale,
}: ClientDialogProps) {
  const router = useRouter();

  const handleSuccess = () => {
    onOpenChange(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {client ? "Edit Client" : "Add New Client"}
          </DialogTitle>
          <DialogDescription>
            {client ? `Edit client: ${client.name}` : "Create a new client"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ClientForm
            client={client || undefined}
            locale={locale}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
