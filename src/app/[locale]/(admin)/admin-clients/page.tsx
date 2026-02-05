import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllClients } from "@/lib/db/queries/clients";
import { ClientsPageClient } from "@/components/admin/clients-page-client";

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

  let clients: Awaited<ReturnType<typeof getAllClients>> = [];
  let error: string | null = null;

  try {
    clients = await getAllClients();
  } catch (e) {
    console.error("Error fetching clients:", e);
    error = "Failed to load clients";
  }

  if (error) {
  return (
    <div className="space-y-6">
        <div className="py-8 text-center text-destructive">
          <p>{error}</p>
        </div>
    </div>
  );
  }

  return <ClientsPageClient clients={clients} locale={locale} />;
}

