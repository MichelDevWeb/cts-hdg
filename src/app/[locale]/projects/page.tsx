import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ProjectCard } from "@/components/sections/project-card";
import { CTASection } from "@/components/sections/cta-section";

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

// Placeholder projects data
const projects = [
  {
    title: "Modern Office Tower",
    category: "Commercial",
    location: "Ho Chi Minh City",
    year: 2024,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    slug: "modern-office-tower",
  },
  {
    title: "Luxury Residential Complex",
    category: "Residential",
    location: "Hanoi",
    year: 2023,
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    slug: "luxury-residential-complex",
  },
  {
    title: "Industrial Manufacturing Park",
    category: "Industrial",
    location: "Binh Duong",
    year: 2023,
    coverImage: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop",
    slug: "industrial-manufacturing-park",
  },
  {
    title: "Mixed-Use Development",
    category: "Commercial",
    location: "Da Nang",
    year: 2024,
    coverImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    slug: "mixed-use-development",
  },
  {
    title: "Urban Apartment Tower",
    category: "Residential",
    location: "Ho Chi Minh City",
    year: 2023,
    coverImage: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop",
    slug: "urban-apartment-tower",
  },
  {
    title: "Logistics Hub",
    category: "Industrial",
    location: "Long An",
    year: 2024,
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    slug: "logistics-hub",
  },
];

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsPageContent />;
}

function ProjectsPageContent() {
  const t = useTranslations("projects");
  const tHome = useTranslations("home");

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")} />

      {/* Projects Grid */}
      <Section>
        {/* Filter Tabs - Placeholder for future functionality */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["all", "residential", "commercial", "industrial"].map((filter) => (
            <button
              key={filter}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {t(`filter.${filter}`)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
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

