"use client";

import { useState } from "react";
import { ProjectCard } from "./project-card";
import { projectCategories } from "@/lib/data/mock-data";
import type { Locale } from "@/lib/i18n/config";
import { useTranslations } from "next-intl";

interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  coverImage: string | null;
}

interface ProjectsFilterProps {
  projects: Project[];
  locale: string;
}

export function ProjectsFilter({ projects, locale }: ProjectsFilterProps) {
  const t = useTranslations("projects");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter projects by category
  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

  // Get localized categories
  const categories = ["all", "residential", "commercial", "industrial", "infrastructure"] as const;
  const localizedCategories = categories.map((cat) => ({
    key: cat,
    label:
      cat === "all"
        ? t("filter.all")
        : projectCategories[cat]?.[locale as Locale] || projectCategories[cat]?.en || cat,
  }));

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {localizedCategories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category.key
                ? "bg-hdg-blue-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-hdg-blue-500/10 hover:text-hdg-blue-500"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              category={project.category}
              location={project.location}
              year={project.year}
              coverImage={project.coverImage}
              slug={project.slug}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">
          <p>{t("noProjectsFound") || "No projects found in this category."}</p>
        </div>
      )}
    </div>
  );
}
