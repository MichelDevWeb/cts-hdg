import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllProjects } from "@/lib/db/queries/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ProjectsTable } from "@/components/admin/projects-table";
import { projectCategories } from "@/lib/data/mock-data";
import type { Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Projects | HDG Admin",
};

export default async function AdminProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.projects");

  let projects: Awaited<ReturnType<typeof getAllProjects>> = [];
  let error: string | null = null;

  try {
    projects = await getAllProjects();
  } catch (e) {
    console.error("Error fetching projects:", e);
    error = "Failed to load projects";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Link href={`/${locale}/admin-projects/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("addProject")}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allProjects")}</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
            </div>
          ) : projects && projects.length > 0 ? (
            <ProjectsTable
              projects={projects}
              locale={locale}
            />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>{t("noProjects")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
