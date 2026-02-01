import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllProjects } from "@/lib/db/queries/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, EyeOff, Star, StarOff } from "lucide-react";
import { ProjectActions } from "@/components/admin/project-actions";
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

  // Get localized category label
  const getCategoryLabel = (category: string) => {
    const cat = projectCategories[category as keyof typeof projectCategories];
    return cat ? cat[locale as Locale] || cat.en : category;
  };

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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium w-10">#</th>
                    <th className="pb-3 font-medium">{t("table.title")}</th>
                    <th className="pb-3 font-medium">{t("table.category")}</th>
                    <th className="pb-3 font-medium">{t("table.location")}</th>
                    <th className="pb-3 font-medium">{t("table.year")}</th>
                    <th className="pb-3 font-medium">{t("table.status")}</th>
                    <th className="pb-3 font-medium">{t("table.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b">
                      <td className="py-4">
                        <Link
                          href={`/${locale}/admin-projects/${project.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {project.orderIndex ?? 0}
                        </Link>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {project.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                          <div>
                            <p className="font-medium">{project.titleEn}</p>
                            <p className="text-sm text-muted-foreground">
                              {project.titleVi}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant="secondary" className="capitalize">
                          {getCategoryLabel(project.category)}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm">{project.location}</td>
                      <td className="py-4 text-sm">{project.year}</td>
                      <td className="py-4">
                        {project.published ? (
                          <span className="flex items-center gap-1 text-sm text-green-600">
                            <Eye className="h-4 w-4" />
                            {t("status.published")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <EyeOff className="h-4 w-4" />
                            {t("status.draft")}
                          </span>
                        )}
                      </td>
                      <td className="py-4">
                        <ProjectActions project={project} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
