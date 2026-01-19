import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, Users, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | HDG Admin",
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.dashboard");

  const supabase = await createClient();

  // Fetch counts - using try/catch to handle cases where tables don't exist yet
  let projectCount = 0;
  let postCount = 0;
  let inquiryCount = 0;
  let teamCount = 0;

  try {
    const [projectsRes, postsRes, inquiriesRes, teamRes] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("posts").select("id", { count: "exact", head: true }),
      supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase.from("team").select("id", { count: "exact", head: true }),
    ]);

    projectCount = projectsRes.count ?? 0;
    postCount = postsRes.count ?? 0;
    inquiryCount = inquiriesRes.count ?? 0;
    teamCount = teamRes.count ?? 0;
  } catch (error) {
    console.error("Error fetching stats:", error);
  }

  const stats = [
    {
      title: t("totalProjects"),
      value: projectCount,
      icon: FolderKanban,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: t("publishedPosts"),
      value: postCount,
      icon: FileText,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: t("newInquiries"),
      value: inquiryCount,
      icon: MessageSquare,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: t("teamMembers"),
      value: teamCount,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("recentProjects")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("noProjects")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("recentInquiries")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("noInquiries")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
