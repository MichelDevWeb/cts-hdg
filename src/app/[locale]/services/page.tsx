import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CTASection } from "@/components/sections/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Compass,
  PenTool,
  Layers,
  Building2,
  Cpu,
  Zap,
  CheckCircle,
} from "lucide-react";
import {
  engineeringServices,
  designConsultancyFeatures,
  engineeringDesignFeatures,
  integratedSolutionsFeatures,
  getLocalizedFeature,
  getLocalizedEngineeringService,
} from "@/lib/data/mock-data";
import {
  getActiveServices,
  getLocalizedService,
} from "@/lib/db/queries/services";
import type { Locale } from "@/lib/i18n/config";
import { getIconByName } from "@/lib/utils";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

// Icon mapping for engineering services
const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  // Try to get services from database
  let dbServices: Array<{
    id: string;
    slug: string;
    name: string;
    description: string | null;
    features: string[];
    icon: string | null;
  }> = [];

  try {
    const activeServices = await getActiveServices();
    dbServices = activeServices.map((service) => getLocalizedService(service, locale));
  } catch (error) {
    console.error("Error fetching services from DB:", error);
  }

  // Use database services if available, otherwise use mock data
  const useDynamicData = dbServices.length > 0;

  // Get localized mock data as fallback
  const localizedEngineeringServices = engineeringServices.map((service) =>
    getLocalizedEngineeringService(service, locale as Locale)
  );

  const localizedDesignFeatures = designConsultancyFeatures.map((f) =>
    getLocalizedFeature(f, locale as Locale)
  );

  const localizedEngineeringFeatures = engineeringDesignFeatures.map((f) =>
    getLocalizedFeature(f, locale as Locale)
  );

  const localizedIntegratedFeatures = integratedSolutionsFeatures.map((f) =>
    getLocalizedFeature(f, locale as Locale)
  );

  // Helper to render service cards
  const renderServiceCards = () => {
    if (useDynamicData) {
      return dbServices.map((service, index) => {
        const IconComponent = service.icon ? getIconByName(service.icon) : Compass;
        const colorClasses = [
          { border: "hover:border-primary", bg: "bg-primary", iconBg: "bg-primary/5" },
          { border: "hover:border-secondary", bg: "bg-secondary", iconBg: "bg-secondary/5" },
          { border: "hover:border-accent", bg: "bg-accent", iconBg: "bg-accent/5" },
        ];
        const colorClass = colorClasses[index % colorClasses.length];

        return (
          <Card
            key={service.id}
            id={service.slug}
            className={`relative overflow-hidden border-2 transition-all ${colorClass.border} hover:shadow-lg`}
          >
            <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${colorClass.iconBg}`} />
            <CardHeader>
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl ${colorClass.bg} text-white`}>
                <IconComponent className="h-8 w-8" />
              </div>
              <CardTitle className="font-heading text-2xl">
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                {service.description}
              </p>
              {service.features.length > 0 && (
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        );
      });
    }

    // Fallback to mock data rendering
    return (
      <>
        {/* Design Consultancy */}
        <Card className="relative overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5" />
          <CardHeader>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-white">
              <Compass className="h-8 w-8" />
            </div>
            <CardTitle className="font-heading text-2xl">
              {t("design.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              {t("design.description")}
            </p>
            <ul className="space-y-3">
              {localizedDesignFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Engineering Design */}
        <Card className="relative overflow-hidden border-2 transition-all hover:border-secondary hover:shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/5" />
          <CardHeader>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <PenTool className="h-8 w-8" />
            </div>
            <CardTitle className="font-heading text-2xl">
              {t("engineering.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              {t("engineering.description")}
            </p>
            <ul className="space-y-3">
              {localizedEngineeringFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Integrated Solutions */}
        <Card className="relative overflow-hidden border-2 transition-all hover:border-accent hover:shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/5" />
          <CardHeader>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-accent text-white">
              <Layers className="h-8 w-8" />
            </div>
            <CardTitle className="font-heading text-2xl">
              {t("integrated.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              {t("integrated.description")}
            </p>
            <ul className="space-y-3">
              {localizedIntegratedFeatures.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")} />

      {/* Main Services */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          {renderServiceCards()}
        </div>
      </Section>

      {/* Engineering Details */}
      <Section
        title={t("engineering.title")}
        subtitle={
          locale === "vi"
            ? "Dịch vụ kỹ thuật chuyên sâu"
            : locale === "zh"
              ? "专业工程服务"
              : "Specialized Engineering Services"
        }
        className="bg-muted/30"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {localizedEngineeringServices.map((service) => (
            <Card key={service.key} className="h-full">
              <CardHeader>
                <div className="mb-2 text-primary">{iconMap[service.icon]}</div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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
