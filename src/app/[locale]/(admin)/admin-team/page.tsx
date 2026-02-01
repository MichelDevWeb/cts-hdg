import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllTeamMembers } from "@/lib/db/queries/team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, EyeOff, Users, Trash2 } from "lucide-react";
import { TeamMemberActions } from "@/components/admin/team-member-actions";
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

  // Get localized role
  const getLocalizedRole = (member: (typeof members)[0]) => {
    switch (locale as Locale) {
      case "vi":
        return member.roleVi;
      case "zh":
        return member.roleZh;
      default:
        return member.roleEn;
    }
  };

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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium w-10">#</th>
                    <th className="pb-3 font-medium">{t("table.name")}</th>
                    <th className="pb-3 font-medium">{t("table.role")}</th>
                    <th className="pb-3 font-medium">{t("table.status")}</th>
                    <th className="pb-3 font-medium">{t("table.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b">
                      <td className="py-4">
                        <Link
                          href={`/${locale}/admin-team/${member.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {member.orderIndex}
                        </Link>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-hdg-blue-100">
                            {member.photo ? (
                              <Image
                                src={member.photo}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <Users className="h-5 w-5 text-hdg-blue-400" />
                              </div>
                            )}
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm">
                        {getLocalizedRole(member)}
                      </td>
                      <td className="py-4">
                        {member.active ? (
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
                        <TeamMemberActions member={member} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

