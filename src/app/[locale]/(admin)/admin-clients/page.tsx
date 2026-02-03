import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllClients } from "@/lib/db/queries/clients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ClientsTable } from "@/components/admin/clients-table";

export const metadata: Metadata = {
  title: "Clients | HDG Admin",
};

export default async function AdminClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.clients");

  let clients: Awaited<ReturnType<typeof getAllClients>> = [];
  let error: string | null = null;

  try {
    clients = await getAllClients();
  } catch (e) {
    console.error("Error fetching clients:", e);
    error = "Failed to load clients";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Link href={`/${locale}/admin-clients/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("addClient")}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allClients")}</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
            </div>
          ) : clients && clients.length > 0 ? (
            <ClientsTable
              clients={clients}
              locale={locale}
            />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>{t("noClients")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

