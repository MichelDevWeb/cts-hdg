import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
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
} from "lucide-react";

// Placeholder projects data - will be replaced with Drizzle queries
const projectsData = [
  {
    slug: "modern-office-tower",
    title_vi: "Tòa nhà văn phòng hiện đại",
    title_en: "Modern Office Tower",
    title_zh: "现代办公大楼",
    category: "commercial",
    services: ["design", "engineering"],
    location: "Ho Chi Minh City",
    scale: "20 floors, 45,000 sqm",
    year: 2024,
    summary_vi: "Thiết kế tòa nhà văn phòng 20 tầng với các tiện ích hiện đại",
    summary_en: "Design of a 20-story office building with modern amenities",
    summary_zh: "设计一座拥有现代化设施的20层办公大楼",
    cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    content: {
      en: "This modern office tower represents the pinnacle of contemporary commercial architecture. The design emphasizes sustainability, natural lighting, and flexible workspace configurations to meet the evolving needs of modern businesses.",
      vi: "Tòa nhà văn phòng hiện đại này đại diện cho đỉnh cao của kiến trúc thương mại đương đại. Thiết kế nhấn mạnh tính bền vững, ánh sáng tự nhiên và cấu hình không gian làm việc linh hoạt để đáp ứng nhu cầu ngày càng phát triển của các doanh nghiệp hiện đại.",
      zh: "这座现代办公大楼代表了当代商业建筑的巅峰。设计强调可持续性、自然采光和灵活的工作空间配置，以满足现代企业不断变化的需求。",
    },
    published: true,
  },
  {
    slug: "luxury-residential-complex",
    title_vi: "Khu căn hộ cao cấp",
    title_en: "Luxury Residential Complex",
    title_zh: "豪华住宅区",
    category: "residential",
    services: ["design", "engineering", "integrated"],
    location: "Hanoi",
    scale: "500+ units, 35 floors",
    year: 2023,
    summary_vi: "Thiết kế khu căn hộ cao cấp với hơn 500 căn hộ",
    summary_en: "Design of a luxury residential complex with over 500 units",
    summary_zh: "设计一个拥有500多套公寓的豪华住宅区",
    cover_image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    ],
    content: {
      en: "A premium residential development featuring world-class amenities, stunning views, and thoughtful design that maximizes space and natural light in every unit.",
      vi: "Một dự án nhà ở cao cấp với các tiện ích đẳng cấp thế giới, tầm nhìn tuyệt đẹp và thiết kế chu đáo tối đa hóa không gian và ánh sáng tự nhiên trong mỗi căn hộ.",
      zh: "一个高端住宅开发项目，拥有世界级的设施、壮丽的景观和精心的设计，最大限度地利用每个单元的空间和自然光。",
    },
    published: true,
  },
  {
    slug: "industrial-manufacturing-park",
    title_vi: "Khu công nghiệp sản xuất",
    title_en: "Industrial Manufacturing Park",
    title_zh: "工业制造园区",
    category: "industrial",
    services: ["engineering", "integrated"],
    location: "Binh Duong",
    scale: "50 hectares",
    year: 2023,
    summary_vi: "Thiết kế khu công nghiệp với diện tích 50 hecta",
    summary_en: "Design of an industrial park spanning 50 hectares",
    summary_zh: "设计一个占地50公顷的工业园区",
    cover_image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
    ],
    content: {
      en: "A comprehensive industrial park designed for modern manufacturing needs, featuring efficient logistics infrastructure, sustainable energy systems, and flexible factory configurations.",
      vi: "Một khu công nghiệp toàn diện được thiết kế cho nhu cầu sản xuất hiện đại, với cơ sở hạ tầng logistics hiệu quả, hệ thống năng lượng bền vững và cấu hình nhà máy linh hoạt.",
      zh: "一个为现代制造需求设计的综合工业园区，具有高效的物流基础设施、可持续能源系统和灵活的工厂配置。",
    },
    published: true,
  },
];

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = locale === "vi" ? project.title_vi : locale === "zh" ? project.title_zh : project.title_en;
  const description = locale === "vi" ? project.summary_vi : locale === "zh" ? project.summary_zh : project.summary_en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [project.cover_image],
    },
  };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find previous and next projects for navigation
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return <ProjectDetailContent project={project} locale={locale} prevProject={prevProject} nextProject={nextProject} />;
}

interface ProjectDetailContentProps {
  project: typeof projectsData[0];
  locale: string;
  prevProject: typeof projectsData[0] | null;
  nextProject: typeof projectsData[0] | null;
}

function ProjectDetailContent({ project, locale, prevProject, nextProject }: ProjectDetailContentProps) {
  const t = useTranslations("projects");
  const tHome = useTranslations("home");

  const title = locale === "vi" ? project.title_vi : locale === "zh" ? project.title_zh : project.title_en;
  const summary = locale === "vi" ? project.summary_vi : locale === "zh" ? project.summary_zh : project.summary_en;
  const content = locale === "vi" ? project.content.vi : locale === "zh" ? project.content.zh : project.content.en;

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, Record<string, string>> = {
      commercial: { vi: "Thương mại", en: "Commercial", zh: "商业" },
      residential: { vi: "Nhà ở", en: "Residential", zh: "住宅" },
      industrial: { vi: "Công nghiệp", en: "Industrial", zh: "工业" },
    };
    return categories[category]?.[locale] || category;
  };

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh]">
        <Image
          src={project.cover_image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hdg-dark-900/80 via-hdg-dark-900/40 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute left-4 top-4 lg:left-8 lg:top-8">
          <Link href="/projects">
            <Button variant="secondary" className="bg-white/90 hover:bg-white backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("title")}
            </Button>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container mx-auto">
            <span className="mb-3 inline-block rounded-full bg-hdg-blue-500 px-4 py-1 text-sm font-medium text-white">
              {getCategoryLabel(project.category)}
            </span>
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {title}
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
                  {summary}
                </p>
                <Separator className="my-8" />
                <p className="leading-relaxed">{content}</p>
              </div>

              {/* Gallery */}
              {project.gallery.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold">Gallery</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                      >
                        <Image
                          src={image}
                          alt={`${title} - Image ${index + 1}`}
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
                    {t("details.location")}
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

                    <div className="flex items-start gap-3">
                      <Ruler className="mt-1 h-5 w-5 text-hdg-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t("details.scale")}</p>
                        <p className="font-medium">{project.scale}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Layers className="mt-1 h-5 w-5 text-hdg-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t("details.services")}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {project.services.map((service) => (
                            <span
                              key={service}
                              className="rounded-full bg-hdg-blue-50 px-3 py-1 text-xs font-medium text-hdg-blue-600 capitalize"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <Link href="/contact">
                    <Button className="w-full bg-hdg-blue-500 hover:bg-hdg-blue-600">
                      Inquire About This Project
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
                  <p className="text-xs uppercase tracking-wider">Previous</p>
                  <p className="font-medium">
                    {locale === "vi" ? prevProject.title_vi : locale === "zh" ? prevProject.title_zh : prevProject.title_en}
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
                  <p className="text-xs uppercase tracking-wider">Next</p>
                  <p className="font-medium">
                    {locale === "vi" ? nextProject.title_vi : locale === "zh" ? nextProject.title_zh : nextProject.title_en}
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

