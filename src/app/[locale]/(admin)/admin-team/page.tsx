import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllTeamMembers } from "@/lib/db/queries/team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TeamTable } from "@/components/admin/team-table";
import type { Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Team | HDG Admin",
};

export default async function AdminTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.team");

  let members: Awaited<ReturnType<typeof getAllTeamMembers>> = [];
  let error: string | null = null;

  try {
    members = await getAllTeamMembers();
  } catch (e) {
    console.error("Error fetching team members:", e);
    error = "Failed to load team members";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Link href={`/${locale}/admin-team/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("addMember")}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allMembers")}</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
            </div>
          ) : members && members.length > 0 ? (
            <TeamTable
              members={members}
              locale={locale}
            />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>{t("noMembers")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

