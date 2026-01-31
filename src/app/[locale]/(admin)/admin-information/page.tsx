import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllSiteInfo } from "@/lib/db/queries/site-info";
import { SiteInfoForm } from "@/components/admin/site-info-form";

export const metadata: Metadata = {
  title: "Site Information | HDG Admin",
};

export default async function AdminInformationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.information");

  let siteInfo: Awaited<ReturnType<typeof getAllSiteInfo>> = [];
  let error: string | null = null;

  try {
    siteInfo = await getAllSiteInfo();
  } catch (e) {
    console.error("Error fetching site info:", e);
    error = "Failed to load site information";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {error ? (
        <div className="py-8 text-center text-destructive">
          <p>{error}</p>
        </div>
      ) : (
        <SiteInfoForm siteInfo={siteInfo} locale={locale} />
      )}
    </div>
  );
}

