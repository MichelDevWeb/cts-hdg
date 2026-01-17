import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageContent />;
}

function ContactPageContent() {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: t("info.address"),
      value: "Ho Chi Minh City, Vietnam",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: t("info.phone"),
      value: "+84 xxx xxx xxx",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("info.email"),
      value: "contact@hdg.vn",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Working Hours",
      value: "Mon - Fri: 8:00 - 17:30",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero title={t("title")} subtitle={t("subtitle")} />

      {/* Contact Section */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">
                  {t("form.name")} & {t("form.message")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">{t("info.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-1 font-semibold text-primary">
                    {t("info.company")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("info.companyEn")}
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="mt-0.5 text-primary">{item.icon}</div>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8" />
                    <p className="text-sm">Map will be displayed here</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

