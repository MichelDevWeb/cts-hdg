import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllClients } from "@/lib/db/queries/clients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, EyeOff, Building2 } from "lucide-react";
import { ClientActions } from "@/components/admin/client-actions";
import type { Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Clients | HDG Admin",
};

const clientCategories: Record<string, Record<Locale, string>> = {
  japanese: { vi: "Công ty Nhật Bản", en: "Japanese Companies", zh: "日本公司" },
  multinational: { vi: "Tập đoàn đa quốc gia", en: "Multinational Corporations", zh: "跨国企业" },
  construction: { vi: "Xây dựng & Kỹ thuật", en: "Construction & Engineering", zh: "建筑与工程" },
  developer: { vi: "Bất động sản", en: "Real Estate Developers", zh: "房地产开发商" },
  other: { vi: "Khác", en: "Other", zh: "其他" },
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

  // Get localized category
  const getCategoryLabel = (category: string) => {
    const cat = clientCategories[category];
    return cat ? cat[locale as Locale] || cat.en : category;
  };

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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">{t("table.name")}</th>
                    <th className="pb-3 font-medium">{t("table.category")}</th>
                    <th className="pb-3 font-medium">{t("table.order")}</th>
                    <th className="pb-3 font-medium">{t("table.status")}</th>
                    <th className="pb-3 font-medium">{t("table.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-muted">
                            {client.logoUrl ? (
                              <Image
                                src={client.logoUrl}
                                alt={client.name}
                                fill
                                className="object-contain p-1"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <span className="font-medium">{client.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant="secondary">
                          {getCategoryLabel(client.category || "other")}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm">{client.orderIndex}</td>
                      <td className="py-4">
                        {client.active ? (
                          <span className="flex items-center gap-1 text-sm text-green-600">
                            <Eye className="h-4 w-4" />
                            {t("status.active")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <EyeOff className="h-4 w-4" />
                            {t("status.inactive")}
                          </span>
                        )}
                      </td>
                      <td className="py-4">
                        <ClientActions client={client} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

