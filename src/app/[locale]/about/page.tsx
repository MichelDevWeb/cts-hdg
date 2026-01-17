import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ValueCard } from "@/components/sections/value-card";
import { CTASection } from "@/components/sections/cta-section";
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
} from "lucide-react";

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

  return <AboutPageContent />;
}

function AboutPageContent() {
  const t = useTranslations("about");
  const tHome = useTranslations("home");

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")}>
        <p className="max-w-2xl text-lg text-primary-100">{t("intro")}</p>
      </Hero>

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

