"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ServicesTable } from "./services-table";
import { ServiceDialog } from "./service-dialog";
import type { Service } from "@/lib/db/schema";

interface ServicesPageClientProps {
  services: Service[];
  locale: string;
}

export function ServicesPageClient({
  services,
  locale,
}: ServicesPageClientProps) {
  const t = useTranslations("admin.services");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenDialog = (service?: Service) => {
    setSelectedService(service || null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addService")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allServices")}</CardTitle>
        </CardHeader>
        <CardContent>
          {services && services.length > 0 ? (
            <ServicesTable
              services={services}
              locale={locale}
              onEdit={handleOpenDialog}
            />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>{t("noServices")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ServiceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={selectedService}
        locale={locale}
      />
    </div>
  );
}
