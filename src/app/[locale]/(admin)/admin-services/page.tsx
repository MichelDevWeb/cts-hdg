import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllServices } from "@/lib/db/queries/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings } from "lucide-react";
import { ServiceActions } from "@/components/admin/service-actions";
import type { Locale } from "@/lib/i18n/config";
import { iconMap } from "@/lib/utils";

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

  const getLocalizedName = (service: (typeof services)[0]) => {
    switch (locale as Locale) {
      case "vi":
        return service.nameVi;
      case "zh":
        return service.nameZh;
      default:
        return service.nameEn;
    }
  };

  const getLocalizedDescription = (service: (typeof services)[0]) => {
    switch (locale as Locale) {
      case "vi":
        return service.descriptionVi;
      case "zh":
        return service.descriptionZh;
      default:
        return service.descriptionEn;
    }
  };

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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium w-10">#</th>
                    <th className="pb-3 font-medium">{t("table.name")}</th>
                    <th className="pb-3 font-medium">
                      {t("table.description")}
                    </th>
                    <th className="pb-3 font-medium">{t("table.status")}</th>
                    <th className="pb-3 font-medium">{t("table.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b">
                      <td className="py-4">
                        <Link
                          href={`/${locale}/admin-services/${service.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {service.orderIndex}
                        </Link>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                            {service.icon && iconMap[service.icon] ? (
                              iconMap[service.icon]
                            ) : (
                              <Settings className="h-5 w-5" />
                            )}
                          </div>
                          <span className="font-medium">
                            {getLocalizedName(service)}
                          </span>
                        </div>
                      </td>
                      <td className="max-w-xs truncate py-4 text-sm text-muted-foreground">
                        {getLocalizedDescription(service)}
                      </td>
                      <td className="py-4">
                        <Badge variant={service.active ? "default" : "secondary"}>
                          {service.active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <ServiceActions service={service} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
