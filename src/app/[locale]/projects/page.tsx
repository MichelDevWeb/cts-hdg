import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ProjectCard } from "@/components/sections/project-card";
import { CTASection } from "@/components/sections/cta-section";
import {
  getPublishedProjects as getPublishedProjectsFromDB,
  getLocalizedProject as getLocalizedProjectFromDB,
} from "@/lib/db/queries/projects";
import {
  projects as mockProjects,
  getLocalizedProject as getMockLocalizedProject,
  projectCategories,
} from "@/lib/data/mock-data";
import type { Locale } from "@/lib/i18n/config";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "projects" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  // Try to get projects from database, fallback to mock data
  let localizedProjects: Array<{
    slug: string;
    title: string;
    category: string;
    location: string;
    year: number;
    coverImage: string | null;
  }> = [];

  try {
    const dbProjects = await getPublishedProjectsFromDB();
    if (dbProjects && dbProjects.length > 0) {
      localizedProjects = dbProjects.map((project) =>
        getLocalizedProjectFromDB(project, locale)
      );
    } else {
      // Fallback to mock data
      localizedProjects = mockProjects.map((project) =>
        getMockLocalizedProject(project, locale as Locale)
      );
    }
  } catch (error) {
    console.error("Error fetching projects from DB:", error);
    // Fallback to mock data
    localizedProjects = mockProjects.map((project) =>
      getMockLocalizedProject(project, locale as Locale)
    );
  }

  // Get localized categories
  const categories = ["all", "residential", "commercial", "industrial", "infrastructure"] as const;
  const localizedCategories = categories.map((cat) => ({
    key: cat,
    label: projectCategories[cat][locale as Locale] || projectCategories[cat].en,
  }));

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")} />

      {/* Projects Grid */}
      <Section>
        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {localizedCategories.map((category) => (
            <button
              key={category.key}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category.key === "all"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localizedProjects.map((project) => (
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
      </Section>

      {/* CTA */}
      <CTASection
        title={tHome("cta.title")}
        description={tHome("cta.description")}
        buttonText={tHome("cta.button")}
      />
    </>
  );
}
