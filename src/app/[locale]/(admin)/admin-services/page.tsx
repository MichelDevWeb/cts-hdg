import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllServices } from "@/lib/db/queries/services";
import { ServicesPageClient } from "@/components/admin/services-page-client";

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

  let services: Awaited<ReturnType<typeof getAllServices>> = [];
  let error: string | null = null;

  try {
    services = await getAllServices();
  } catch (e) {
    console.error("Error fetching services:", e);
    error = "Failed to load services";
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

  return <ServicesPageClient services={services} locale={locale} />;
}
