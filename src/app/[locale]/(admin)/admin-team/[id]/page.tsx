import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTeamMemberById } from "@/lib/db/queries/team";
import { TeamMemberForm } from "@/components/admin/team-member-form";

export const metadata: Metadata = {
  title: "Edit Team Member | HDG Admin",
};

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.team");

  // Handle "new" case
  if (id === "new") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("addMember")}</h1>
          <p className="text-muted-foreground">{t("createDescription")}</p>
        </div>
        <TeamMemberForm locale={locale} />
      </div>
    );
  }

  // Fetch existing team member
  const member = await getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t("editMember")}</h1>
        <p className="text-muted-foreground">{member.name}</p>
      </div>
      <TeamMemberForm member={member} locale={locale} />
    </div>
  );
}

