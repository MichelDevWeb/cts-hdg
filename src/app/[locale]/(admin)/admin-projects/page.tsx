import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllProjects } from "@/lib/db/queries/projects";
import { ProjectsPageClient } from "@/components/admin/projects-page-client";

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

  let projects: Awaited<ReturnType<typeof getAllProjects>> = [];
  let error: string | null = null;

  try {
    projects = await getAllProjects();
  } catch (e) {
    console.error("Error fetching projects:", e);
    error = "Failed to load projects";
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

  return <ProjectsPageClient projects={projects} locale={locale} />;
}
