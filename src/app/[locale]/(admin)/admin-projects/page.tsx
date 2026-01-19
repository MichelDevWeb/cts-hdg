import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Database } from "@/lib/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

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

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const projects = data as Project[] | null;

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Link href="/admin-projects/new">
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
          {projects && projects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
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
                        <div>
                          <p className="font-medium">{project.title_en}</p>
                          <p className="text-sm text-muted-foreground">
                            {project.title_vi}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium capitalize text-primary">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-4 text-sm">{project.location}</td>
                      <td className="py-4 text-sm">{project.year}</td>
                      <td className="py-4">
                        {project.published ? (
                          <span className="flex items-center gap-1 text-sm text-accent">
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
                        <div className="flex items-center gap-2">
                          <Link href={`/admin-projects/${project.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
