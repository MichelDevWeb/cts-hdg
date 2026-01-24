import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CTASection } from "@/components/sections/cta-section";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Ruler,
  Layers,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { projects, getLocalizedProject, projectCategories } from "@/lib/data/mock-data";
import type { Locale } from "@/lib/i18n/config";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const localizedProject = getLocalizedProject(project, locale as Locale);

  return {
    title: localizedProject.title,
    description: localizedProject.summary,
    openGraph: {
      title: localizedProject.title as string,
      description: localizedProject.summary as string,
      images: [project.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "projects" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const localizedProject = getLocalizedProject(project, locale as Locale);

  // Find previous and next projects for navigation
  const publishedProjects = projects.filter(p => p.published);
  const currentIndex = publishedProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? publishedProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < publishedProjects.length - 1 ? publishedProjects[currentIndex + 1] : null;

  // Get category label using translation
  const categoryKey = project.category as keyof typeof projectCategories;
  const categoryLabel = projectCategories[categoryKey]?.[locale as Locale] || t(`filter.${categoryKey}`) || project.category;

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh]">
        <Image
          src={project.coverImage}
          alt={localizedProject.title as string}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hdg-dark-900/80 via-hdg-dark-900/40 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute left-4 top-4 lg:left-8 lg:top-8">
          <Link href="/projects">
            <Button variant="secondary" className="bg-hdg-blue-500 hover:bg-hdg-blue-600 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("title")}
            </Button>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container mx-auto">
            <span className="mb-3 inline-block rounded-full bg-hdg-blue-500 px-4 py-1 text-sm font-medium text-white">
              {categoryLabel}
            </span>
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {localizedProject.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {localizedProject.summary}
                </p>
                <Separator className="my-8" />
                <p className="leading-relaxed">{localizedProject.content}</p>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold">
                    {t("gallery")}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                      >
                        <Image
                          src={image}
                          alt={`${localizedProject.title} - Image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-hdg-blue-100">
                <CardContent className="p-6 space-y-6">
                  <h3 className="font-heading text-lg font-semibold">
                    {t("details.projectDetails")}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-hdg-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t("details.location")}</p>
                        <p className="font-medium">{project.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="mt-1 h-5 w-5 text-hdg-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t("details.year")}</p>
                        <p className="font-medium">{project.year}</p>
                      </div>
                    </div>

                    {project.scale && (
                      <div className="flex items-start gap-3">
                        <Ruler className="mt-1 h-5 w-5 text-hdg-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">{t("details.scale")}</p>
                          <p className="font-medium">{project.scale}</p>
                        </div>
                      </div>
                    )}

                    {project.client && (
                      <div className="flex items-start gap-3">
                        <Building2 className="mt-1 h-5 w-5 text-hdg-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">{t("details.client")}</p>
                          <p className="font-medium">{project.client}</p>
                        </div>
                      </div>
                    )}

                    {project.services && project.services.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Layers className="mt-1 h-5 w-5 text-hdg-blue-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">{t("details.services")}</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {project.services.map((service) => (
                              <span
                                key={service}
                                className="rounded-full bg-hdg-blue-50 px-3 py-1 text-xs font-medium text-hdg-blue-600"
                              >
                                {t(`services.${service}`)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <Link href="/contact">
                    <Button className="w-full bg-hdg-blue-500 hover:bg-hdg-blue-600">
                      {t("inquireProject")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <div>
                  <p className="text-xs uppercase tracking-wider">
                    {t("previous")}
                  </p>
                  <p className="font-medium">
                    {getLocalizedProject(prevProject, locale as Locale).title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 text-right text-muted-foreground hover:text-foreground transition-colors"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider">
                    {t("next")}
                  </p>
                  <p className="font-medium">
                    {getLocalizedProject(nextProject, locale as Locale).title}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={tHome("cta.title")}
        description={tHome("cta.description")}
        buttonText={tHome("cta.button")}
      />
    </>
  );
}
