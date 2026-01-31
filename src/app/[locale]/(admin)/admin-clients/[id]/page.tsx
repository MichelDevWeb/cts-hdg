import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getClientById } from "@/lib/db/queries/clients";
import { ClientForm } from "@/components/admin/client-form";

export const metadata: Metadata = {
  title: "Edit Client | HDG Admin",
};

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.clients");

  // Handle "new" case
  if (id === "new") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("addClient")}</h1>
          <p className="text-muted-foreground">{t("createDescription")}</p>
        </div>
        <ClientForm locale={locale} />
      </div>
    );
  }

  // Fetch existing client
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t("editClient")}</h1>
        <p className="text-muted-foreground">{client.name}</p>
      </div>
      <ClientForm client={client} locale={locale} />
    </div>
  );
}

