"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectForm } from "./project-form";
import type { Project } from "@/lib/db/schema";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
  locale: string;
}

export function ProjectDialog({
  open,
  onOpenChange,
  project,
  locale,
}: ProjectDialogProps) {
  const router = useRouter();

  const handleSuccess = () => {
    onOpenChange(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            {project
              ? `Edit project: ${project.titleEn}`
              : "Create a new project"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ProjectForm
            project={project || undefined}
            locale={locale}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
