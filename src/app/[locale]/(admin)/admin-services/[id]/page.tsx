import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getServiceById } from "@/lib/db/queries/services";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata: Metadata = {
  title: "Edit Service | HDG Admin",
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.services");

  // Handle "new" case
  if (id === "new") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("addService")}</h1>
          <p className="text-muted-foreground">{t("createDescription")}</p>
        </div>
        <ServiceForm locale={locale} />
      </div>
    );
  }

  // Fetch existing service
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t("editService")}</h1>
        <p className="text-muted-foreground">{service.nameEn}</p>
      </div>
      <ServiceForm service={service} locale={locale} />
    </div>
  );
}
