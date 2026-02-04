import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllTeamMembers } from "@/lib/db/queries/team";
import { TeamPageClient } from "@/components/admin/team-page-client";

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

  let members: Awaited<ReturnType<typeof getAllTeamMembers>> = [];
  let error: string | null = null;

  try {
    members = await getAllTeamMembers();
  } catch (e) {
    console.error("Error fetching team members:", e);
    error = "Failed to load team members";
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

  return <TeamPageClient members={members} locale={locale} />;
}

