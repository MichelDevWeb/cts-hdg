"use client";

import { ProjectCard } from "./project-card";

interface RelatedProject {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  coverImage: string | null;
}

interface RelatedProjectsProps {
  projects: RelatedProject[];
  currentSlug: string;
}

export function RelatedProjects({ projects, currentSlug }: RelatedProjectsProps) {
  // Filter out current project
  const filteredProjects = projects.filter(
    (project) => project.slug !== currentSlug
  );

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
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
  );
}
