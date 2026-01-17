import { Metadata } from "next";
import { useTranslations } from "next-intl";
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

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesPageContent />;
}

function ServicesPageContent() {
  const t = useTranslations("services");
  const tHome = useTranslations("home");

  const engineeringServices = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: t("engineering.architecture"),
      features: [
        "Concept design & master planning",
        "Detailed architectural drawings",
        "Interior design integration",
        "Building permit documentation",
      ],
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: t("engineering.structure"),
      features: [
        "Structural analysis & design",
        "Foundation engineering",
        "Steel & concrete structures",
        "Seismic resistance design",
      ],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t("engineering.mep"),
      features: [
        "HVAC system design",
        "Electrical & lighting systems",
        "Plumbing & fire protection",
        "Building automation",
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")} />

      {/* Main Services */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
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
                {[
                  "Feasibility studies",
                  "Concept development",
                  "Technical consultation",
                  "Design optimization",
                ].map((item) => (
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
                {[
                  "Architecture design",
                  "Structural engineering",
                  "MEP systems",
                  "Technical drawings",
                ].map((item) => (
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
                {[
                  "End-to-end project support",
                  "Multi-disciplinary coordination",
                  "Value engineering",
                  "Project management support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Engineering Details */}
      <Section
        title={t("engineering.title")}
        subtitle="Specialized Engineering Services"
        className="bg-muted/30"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {engineeringServices.map((service) => (
            <Card key={service.title} className="h-full">
              <CardHeader>
                <div className="mb-2 text-primary">{service.icon}</div>
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

