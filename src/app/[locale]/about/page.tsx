import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ValueCard } from "@/components/sections/value-card";
import { CTASection } from "@/components/sections/cta-section";
import { TeamSection } from "@/components/sections/team-section";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { CompanyProfileDialog } from "@/components/sections/company-profile-dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Lightbulb,
  Eye,
  Rocket,
  Shield,
  Cpu,
  Wrench,
  Handshake,
  Calendar,
  Building2,
  Users,
  Award,
} from "lucide-react";
import { companyStats } from "@/lib/data/mock-data";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const stats = [
    {
      value: companyStats.yearsExperience,
      label: t("stats.years"),
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      value: companyStats.projectsCompleted,
      label: t("stats.projects"),
      icon: <Building2 className="h-6 w-6" />,
      suffix: "+",
    },
    {
      value: companyStats.clients,
      label: t("stats.clients"),
      icon: <Award className="h-6 w-6" />,
      suffix: "+",
    },
    {
      value: companyStats.teamMembers,
      label: t("stats.team"),
      icon: <Users className="h-6 w-6" />,
      suffix: "+",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")}>
        <p className="max-w-2xl text-lg text-primary-100">{t("intro")}</p>
        <div className="mt-6">
          <CompanyProfileDialog />
        </div>
      </Hero>

      {/* Stats Section */}
      <Section className="bg-hdg-blue-500 text-white -mt-12 relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-3 flex justify-center text-hdg-blue-200">
                {stat.icon}
              </div>
              <p className="font-heading text-4xl font-bold">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-sm text-hdg-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Role Statement */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("role")}
          </p>
        </div>
      </Section>

      {/* Vision, Mission, Philosophy */}
      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-t-4 border-t-primary">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-semibold">
                {t("vision.title")}
              </h3>
              <p className="text-muted-foreground">{t("vision.content")}</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-secondary">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-semibold">
                {t("mission.title")}
              </h3>
              <p className="text-muted-foreground">{t("mission.content")}</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-accent">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-semibold">
                {t("philosophy.title")}
              </h3>
              <p className="text-muted-foreground">{t("philosophy.content")}</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Core Values */}
      <Section
        title={t("values.title")}
        className="bg-gradient-to-b from-muted/50 to-background"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <ValueCard
            title={t("values.systematic.title")}
            description={t("values.systematic.description")}
            icon={<Cpu className="h-5 w-5" />}
          />
          <ValueCard
            title={t("values.responsibility.title")}
            description={t("values.responsibility.description")}
            icon={<Shield className="h-5 w-5" />}
          />
          <ValueCard
            title={t("values.practical.title")}
            description={t("values.practical.description")}
            icon={<Wrench className="h-5 w-5" />}
          />
          <ValueCard
            title={t("values.partnership.title")}
            description={t("values.partnership.description")}
            icon={<Handshake className="h-5 w-5" />}
          />
        </div>
      </Section>

      {/* Team Section */}
      <Section title={t("team.title")} subtitle={t("team.subtitle")}>
        <TeamSection useDynamicData />
      </Section>

      {/* Clients & Partners Section */}
      <Section className="bg-muted/30">
        <ClientsCarousel useDynamicData />
      </Section>

      {/* Quality Commitment */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center text-white md:p-12">
          <Rocket className="mx-auto mb-4 h-12 w-12 text-secondary" />
          <h3 className="mb-4 font-heading text-2xl font-bold">
            {t("commitment.title")}
          </h3>
          <p className="text-lg text-primary-100">{t("commitment.content")}</p>
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
