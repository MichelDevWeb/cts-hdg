import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ProcessStep } from "@/components/sections/process-step";
import { CTASection } from "@/components/sections/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, FileCheck, Target } from "lucide-react";

interface ProcessPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProcessPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ProcessPage({ params }: ProcessPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProcessPageContent />;
}

function ProcessPageContent() {
  const t = useTranslations("process");
  const tHome = useTranslations("home");

  const steps = [
    { key: "briefing" as const },
    { key: "analysis" as const },
    { key: "proposal" as const },
    { key: "design" as const },
    { key: "support" as const },
  ];

  const highlights = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Timely Delivery",
      description: "We respect deadlines and deliver on schedule",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Approach",
      description: "Close collaboration with clients throughout the process",
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Rigorous review at every stage",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Result-Oriented",
      description: "Focus on practical, implementable solutions",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")} />

      {/* Process Steps */}
      <Section>
        <div className="mx-auto max-w-3xl">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.key}
              step={index + 1}
              title={t(`steps.${step.key}.title`)}
              description={t(`steps.${step.key}.description`)}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </Section>

      {/* Process Highlights */}
      <Section className="bg-muted/30">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <Card key={item.title} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-heading font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Visual Process Flow */}
      <Section title="Project Lifecycle">
        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-1 lg:block">
            <div className="flex rounded-xl bg-background">
              {steps.map((step, index) => (
                <div
                  key={step.key}
                  className="flex-1 border-r border-dashed last:border-r-0"
                >
                  <div className="p-6 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <h4 className="font-heading font-semibold">
                      {t(`steps.${step.key}.title`)}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="flex flex-wrap justify-center gap-4 lg:hidden">
            {steps.map((step, index) => (
              <div
                key={step.key}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">
                  {index + 1}
                </span>
                {t(`steps.${step.key}.title`)}
              </div>
            ))}
          </div>
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

