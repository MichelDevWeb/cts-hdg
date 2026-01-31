import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProjectById } from "@/lib/db/queries/projects";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = {
  title: "Edit Project | HDG Admin",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.projects");

  // Handle "new" case
  if (id === "new") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("addProject")}</h1>
          <p className="text-muted-foreground">{t("createDescription")}</p>
        </div>
        <ProjectForm locale={locale} />
      </div>
    );
  }

  // Fetch existing project
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t("editProject")}</h1>
        <p className="text-muted-foreground">{project.titleEn}</p>
      </div>
      <ProjectForm project={project} locale={locale} />
    </div>
  );
}

