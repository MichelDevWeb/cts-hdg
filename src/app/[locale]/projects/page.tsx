import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ProjectsFilter } from "@/components/sections/projects-filter";
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

// Revalidate this page every 60 seconds as a fallback
// On-demand revalidation happens when admin updates data
export const revalidate = 60;

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

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")} />

      {/* Projects Grid with Filter */}
      <Section>
        <ProjectsFilter
          projects={localizedProjects}
          locale={locale}
        />
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
