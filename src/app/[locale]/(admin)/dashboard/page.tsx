import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Users,
  MessageSquare,
  Building2,
  Briefcase,
  ArrowRight,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { getAllProjects } from "@/lib/db/queries/projects";
import { getAllTeamMembers } from "@/lib/db/queries/team";
import { getAllClients } from "@/lib/db/queries/clients";
import { getAllServices } from "@/lib/db/queries/services";
import { getInquiriesByStatus, getAllInquiries } from "@/lib/db/queries/inquiries";
import type { Locale } from "@/lib/i18n/config";

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

  // Fetch counts using Drizzle queries
  let projectCount = 0;
  let publishedProjectCount = 0;
  let featuredProjectCount = 0;
  let teamCount = 0;
  let activeTeamCount = 0;
  let clientCount = 0;
  let serviceCount = 0;
  let newInquiryCount = 0;
  let totalInquiryCount = 0;
  let recentProjects: Awaited<ReturnType<typeof getAllProjects>> = [];
  let recentInquiries: Awaited<ReturnType<typeof getAllInquiries>> = [];

  try {
    const [projects, team, clients, services, newInquiries, allInquiries] =
      await Promise.all([
        getAllProjects(),
        getAllTeamMembers(),
        getAllClients(),
        getAllServices(),
        getInquiriesByStatus("new"),
        getAllInquiries(),
      ]);

    projectCount = projects.length;
    publishedProjectCount = projects.filter((p) => p.published).length;
    featuredProjectCount = projects.filter((p) => p.featured).length;
    recentProjects = projects.slice(0, 5);

    teamCount = team.length;
    activeTeamCount = team.filter((t) => t.active).length;

    clientCount = clients.filter((c) => c.active).length;
    serviceCount = services.filter((s) => s.active).length;

    newInquiryCount = newInquiries.length;
    totalInquiryCount = allInquiries.length;
    recentInquiries = allInquiries.slice(0, 5);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }

  const stats = [
    {
      title: t("totalProjects"),
      value: projectCount,
      subtitle: `${publishedProjectCount} ${locale === "vi" ? "đã xuất bản" : locale === "zh" ? "已发布" : "published"}`,
      icon: FolderKanban,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: `/${locale}/admin-projects`,
    },
    {
      title: t("teamMembers"),
      value: teamCount,
      subtitle: `${activeTeamCount} ${locale === "vi" ? "đang hoạt động" : locale === "zh" ? "活跃" : "active"}`,
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      href: `/${locale}/admin-team`,
    },
    {
      title: locale === "vi" ? "Khách hàng" : locale === "zh" ? "客户" : "Clients",
      value: clientCount,
      subtitle: locale === "vi" ? "đối tác" : locale === "zh" ? "合作伙伴" : "partners",
      icon: Building2,
      color: "text-accent",
      bgColor: "bg-accent/10",
      href: `/${locale}/admin-clients`,
    },
    {
      title: locale === "vi" ? "Dịch vụ" : locale === "zh" ? "服务" : "Services",
      value: serviceCount,
      subtitle: locale === "vi" ? "đang hoạt động" : locale === "zh" ? "活跃" : "active",
      icon: Briefcase,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: `/${locale}/admin-services`,
    },
  ];

  const getLocalizedTitle = (
    project: (typeof recentProjects)[0],
    loc: Locale
  ) => {
    return loc === "vi"
      ? project.titleVi
      : loc === "zh"
        ? project.titleZh
        : project.titleEn;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-all hover:shadow-md hover:border-primary/50">
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
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("recentProjects")}</CardTitle>
            <Link href={`/${locale}/admin-projects`}>
              <Button variant="ghost" size="sm">
                {locale === "vi" ? "Xem tất cả" : locale === "zh" ? "查看全部" : "View all"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentProjects.length > 0 ? (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      {project.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {getLocalizedTitle(project, locale as Locale)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {project.location} • {project.year}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.published ? (
                        <Badge variant="default" className="text-xs">
                          <Eye className="mr-1 h-3 w-3" />
                          {locale === "vi" ? "Đã xuất bản" : locale === "zh" ? "已发布" : "Published"}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <EyeOff className="mr-1 h-3 w-3" />
                          {locale === "vi" ? "Bản nháp" : locale === "zh" ? "草稿" : "Draft"}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">
                {t("noProjects")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>{t("recentInquiries")}</CardTitle>
              {newInquiryCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {newInquiryCount} {locale === "vi" ? "mới" : locale === "zh" ? "新" : "new"}
                </Badge>
              )}
            </div>
            <Link href={`/${locale}/admin-inquiries`}>
              <Button variant="ghost" size="sm">
                {locale === "vi" ? "Xem tất cả" : locale === "zh" ? "查看全部" : "View all"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentInquiries.length > 0 ? (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {inquiry.email}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {inquiry.message}
                      </p>
                    </div>
                    <Badge
                      variant={
                        inquiry.status === "new"
                          ? "destructive"
                          : inquiry.status === "contacted"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs shrink-0"
                    >
                      {inquiry.status === "new"
                        ? locale === "vi"
                          ? "Mới"
                          : locale === "zh"
                            ? "新"
                            : "New"
                        : inquiry.status === "contacted"
                          ? locale === "vi"
                            ? "Đã liên hệ"
                            : locale === "zh"
                              ? "已联系"
                              : "Contacted"
                          : locale === "vi"
                            ? "Đã giải quyết"
                            : locale === "zh"
                              ? "已解决"
                              : "Resolved"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">
                {t("noInquiries")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === "vi" ? "Thao tác nhanh" : locale === "zh" ? "快速操作" : "Quick Actions"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/admin-projects/new`}>
              <Button>
                <FolderKanban className="mr-2 h-4 w-4" />
                {locale === "vi" ? "Thêm dự án" : locale === "zh" ? "添加项目" : "Add Project"}
              </Button>
            </Link>
            <Link href={`/${locale}/admin-team/new`}>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                {locale === "vi" ? "Thêm thành viên" : locale === "zh" ? "添加成员" : "Add Team Member"}
              </Button>
            </Link>
            <Link href={`/${locale}/admin-clients/new`}>
              <Button variant="outline">
                <Building2 className="mr-2 h-4 w-4" />
                {locale === "vi" ? "Thêm khách hàng" : locale === "zh" ? "添加客户" : "Add Client"}
              </Button>
            </Link>
            <Link href={`/${locale}/admin-services/new`}>
              <Button variant="outline">
                <Briefcase className="mr-2 h-4 w-4" />
                {locale === "vi" ? "Thêm dịch vụ" : locale === "zh" ? "添加服务" : "Add Service"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
