import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ServiceCard } from "@/components/sections/service-card";
import { ProjectCard } from "@/components/sections/project-card";
import { CTASection } from "@/components/sections/cta-section";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import {
  Compass,
  PenTool,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  getFeaturedProjects as getFeaturedProjectsFromDB,
  getLocalizedProject as getLocalizedProjectFromDB,
} from "@/lib/db/queries/projects";
import {
  getActiveServices,
  getLocalizedService,
} from "@/lib/db/queries/services";
import {
  getFeaturedProjects as getMockFeaturedProjects,
  getLocalizedProject as getMockLocalizedProject,
} from "@/lib/data/mock-data";
import type { Locale } from "@/lib/i18n/config";
import { getIconByName } from "@/lib/utils";

// Revalidate this page every 60 seconds as a fallback
// On-demand revalidation happens when admin updates data
export const revalidate = 60;

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  // Get services from database
  let services: Array<{
    id: string;
    slug: string;
    name: string;
    description: string | null;
    features: string[];
    icon: string | null;
  }> = [];

  try {
    const dbServices = await getActiveServices();
    services = dbServices.map((service) => getLocalizedService(service, locale));
  } catch (error) {
    console.error("Error fetching services from DB:", error);
  }

  // Try to get featured projects from database, fallback to mock data
  let featuredProjects: Array<{
    slug: string;
    title: string;
    category: string;
    location: string;
    year: number;
    coverImage: string | null;
  }> = [];

  try {
    const dbProjects = await getFeaturedProjectsFromDB(3);
    if (dbProjects && dbProjects.length > 0) {
      featuredProjects = dbProjects.map((project) =>
        getLocalizedProjectFromDB(project, locale)
      );
    } else {
      // Fallback to mock data
      featuredProjects = getMockFeaturedProjects().map((project) =>
        getMockLocalizedProject(project, locale as Locale)
      );
    }
  } catch (error) {
    console.error("Error fetching projects from DB:", error);
    // Fallback to mock data
    featuredProjects = getMockFeaturedProjects().map((project) =>
      getMockLocalizedProject(project, locale as Locale)
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
      >
        <Link href="/services">
          <Button size="lg" variant="secondary" className="group font-semibold">
            {t("hero.cta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/contact">
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            {t("hero.ctaSecondary")}
          </Button>
        </Link>
      </Hero>

      {/* Services Section */}
      <Section title={t("services.title")} subtitle={t("services.subtitle")}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.length > 0 ? (
            services.slice(0, 3).map((service) => {
              const IconComponent = service.icon ? getIconByName(service.icon) : Compass;
              return (
                <ServiceCard
                  key={service.id}
                  title={service.name}
                  description={service.description || ""}
                  icon={<IconComponent className="h-6 w-6" />}
                  href={`/services#${service.slug}`}
                />
              );
            })
          ) : (
            <>
              <ServiceCard
                title={tServices("design.title")}
                description={tServices("design.description")}
                icon={<Compass className="h-6 w-6" />}
                href="/services"
              />
              <ServiceCard
                title={tServices("engineering.title")}
                description={tServices("engineering.description")}
                icon={<PenTool className="h-6 w-6" />}
                href="/services"
              />
              <ServiceCard
                title={tServices("integrated.title")}
                description={tServices("integrated.description")}
                icon={<Layers className="h-6 w-6" />}
                href="/services"
              />
            </>
          )}
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section
        title={t("projects.title")}
        subtitle={t("projects.subtitle")}
        className="bg-muted/50"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
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
        <div className="mt-10 text-center">
          <Link href="/projects">
            <Button variant="outline" className="group">
              {tCommon("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Clients Carousel Section */}
      <Section className="bg-muted/30">
        <ClientsCarousel useDynamicData />
      </Section>

      {/* CTA Section */}
      <CTASection
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
      />
    </>
  );
}
