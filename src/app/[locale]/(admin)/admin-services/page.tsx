import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllServices } from "@/lib/db/queries/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ServicesTable } from "@/components/admin/services-table";
import type { Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Services | HDG Admin",
};

export default async function AdminServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.services");

  let services: Awaited<ReturnType<typeof getAllServices>> = [];
  let error: string | null = null;

  try {
    services = await getAllServices();
  } catch (e) {
    console.error("Error fetching services:", e);
    error = "Failed to load services";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Link href={`/${locale}/admin-services/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("addService")}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allServices")}</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
            </div>
          ) : services && services.length > 0 ? (
            <ServicesTable
              services={services}
              locale={locale}
            />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>{t("noServices")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
