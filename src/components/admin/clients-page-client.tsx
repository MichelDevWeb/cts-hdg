"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ClientsTable } from "./clients-table";
import { ClientDialog } from "./client-dialog";
import type { Client } from "@/lib/db/schema";

interface ClientsPageClientProps {
  clients: Client[];
  locale: string;
}

export function ClientsPageClient({
  clients,
  locale,
}: ClientsPageClientProps) {
  const t = useTranslations("admin.clients");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleOpenDialog = (client?: Client) => {
    setSelectedClient(client || null);
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
          {t("addClient")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allClients")}</CardTitle>
        </CardHeader>
        <CardContent>
          {clients && clients.length > 0 ? (
            <ClientsTable
              clients={clients}
              locale={locale}
              onEdit={handleOpenDialog}
            />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>{t("noClients")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        client={selectedClient}
        locale={locale}
      />
    </div>
  );
}
