"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ServiceForm } from "./service-form";
import type { Service } from "@/lib/db/schema";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service | null;
  locale: string;
}

export function ServiceDialog({
  open,
  onOpenChange,
  service,
  locale,
}: ServiceDialogProps) {
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
            {service ? "Edit Service" : "Add New Service"}
          </DialogTitle>
          <DialogDescription>
            {service
              ? `Edit service: ${service.nameEn}`
              : "Create a new service"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ServiceForm
            service={service || undefined}
            locale={locale}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
