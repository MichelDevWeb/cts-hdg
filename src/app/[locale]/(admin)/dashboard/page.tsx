import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, Users, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | HDG Admin",
};

export default async function DashboardPage() {
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
      title: "Total Projects",
      value: projectCount,
      icon: FolderKanban,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Published Posts",
      value: postCount,
      icon: FileText,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "New Inquiries",
      value: inquiryCount,
      icon: MessageSquare,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Team Members",
      value: teamCount,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to HDG Admin Panel</p>
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
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent projects to display.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent inquiries to display.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
