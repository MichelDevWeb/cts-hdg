"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, StarOff, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableRow } from "./sortable-table";
import { ProjectActions } from "./project-actions";
import type { Project } from "@/lib/db/schema";
import type { Locale } from "@/lib/i18n/config";
import { projectCategories } from "@/lib/data/mock-data";

interface ProjectsTableProps {
  projects: Project[];
  locale: string;
}

export function ProjectsTable({
  projects,
  locale,
}: ProjectsTableProps) {
  const router = useRouter();
  const t = useTranslations("admin.projects");
  const tCommon = useTranslations("common.toast");
  const [localItems, setLocalItems] = useState(projects);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLocalItems(projects);
  }, [projects]);

  // Get localized category label
  const getCategoryLabel = (category: string) => {
    const cat = projectCategories[category as keyof typeof projectCategories];
    return cat ? cat[locale as Locale] || cat.en : category;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = localItems.findIndex((item) => item.id === active.id);
    const newIndex = localItems.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newItems = arrayMove(localItems, oldIndex, newIndex);
    setLocalItems(newItems);

    // Update orderIndex based on new position
    const updates = newItems.map((item, index) => ({
      id: item.id,
      orderIndex: index,
    }));

    try {
      const response = await fetch("/api/admin/projects/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      toast.success(tCommon("updateSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error reordering:", error);
      toast.error(tCommon("updateError"));
      // Revert to original order
      setLocalItems(projects);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleFeatured" }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle featured");
      }

      toast.success(tCommon("updateSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Error toggling featured:", error);
      toast.error(tCommon("updateError"));
    }
  };

  return (
    <div className="overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-muted-foreground">
              <th className="pb-3 font-medium w-10">#</th>
              <th className="pb-3 font-medium">{t("table.title")}</th>
              <th className="pb-3 font-medium">{t("table.category")}</th>
              <th className="pb-3 font-medium">{t("table.location")}</th>
              <th className="pb-3 font-medium">{t("table.year")}</th>
              <th className="pb-3 font-medium">{t("table.status")}</th>
              <th className="pb-3 font-medium">Featured</th>
              <th className="pb-3 font-medium">{t("table.actions")}</th>
              <th className="pb-3 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody>
            <SortableContext
              items={localItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {localItems.map((project, index) => (
                <SortableRow key={project.id} id={project.id}>
                  <td className="py-4">
                    <Link
                      href={`/${locale}/admin-projects/${project.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {project.orderIndex ?? index}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleFeatured(project)}
                      className="h-8 w-8"
                      title={project.featured ? "Remove from featured" : "Add to featured"}
                    >
                      {project.featured ? (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ) : (
                        <StarOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </td>
                  <td className="py-4">
                    <ProjectActions project={project} locale={locale} />
                  </td>
                </SortableRow>
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
}

