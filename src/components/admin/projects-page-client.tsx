"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ProjectsTable } from "./projects-table";
import { ProjectDialog } from "./project-dialog";
import type { Project } from "@/lib/db/schema";

interface ProjectsPageClientProps {
  projects: Project[];
  locale: string;
}

export function ProjectsPageClient({
  projects,
  locale,
}: ProjectsPageClientProps) {
  const t = useTranslations("admin.projects");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenDialog = (project?: Project) => {
    setSelectedProject(project || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addProject")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allProjects")}</CardTitle>
        </CardHeader>
        <CardContent>
          {projects && projects.length > 0 ? (
            <ProjectsTable
              projects={projects}
              locale={locale}
              onEdit={handleOpenDialog}
            />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>{t("noProjects")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={selectedProject}
        locale={locale}
      />
    </div>
  );
}
