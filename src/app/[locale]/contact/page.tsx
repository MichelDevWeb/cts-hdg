import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getLocalizedContactInfo } from "@/lib/data/mock-data";
import { getSiteInfoMap, getLocalizedSiteInfo } from "@/lib/db/queries/site-info";
import type { Locale } from "@/lib/i18n/config";

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

  const t = await getTranslations({ locale, namespace: "contact" });
  
  // Try to get contact info from database, fallback to mock data
  let contact: {
    company: string;
    officeAddress: string;
    registeredAddress: string;
    phone: string;
    email: string;
    workingHours: string;
    mapUrl: string;
  };

  try {
    const siteInfoMap = await getSiteInfoMap();
    if (Object.keys(siteInfoMap).length > 0) {
      const dbContact = getLocalizedSiteInfo(siteInfoMap, locale);
      contact = {
        company: dbContact.company,
        officeAddress: dbContact.officeAddress || "",
        registeredAddress: dbContact.registeredAddress || "",
        phone: dbContact.phone,
        email: dbContact.email,
        workingHours: dbContact.workingHours,
        mapUrl: dbContact.mapUrl || "",
      };
    } else {
      const mockContact = getLocalizedContactInfo(locale as Locale);
      contact = {
        company: mockContact.company,
        officeAddress: mockContact.officeAddress,
        registeredAddress: mockContact.address,
        phone: mockContact.phone,
        email: mockContact.email,
        workingHours: mockContact.workingHours,
        mapUrl: "",
      };
    }
  } catch (error) {
    console.error("Error fetching site info from DB:", error);
    const mockContact = getLocalizedContactInfo(locale as Locale);
    contact = {
      company: mockContact.company,
      officeAddress: mockContact.officeAddress,
      registeredAddress: mockContact.address,
      phone: mockContact.phone,
      email: mockContact.email,
      workingHours: mockContact.workingHours,
      mapUrl: "",
    };
  }

  const contactInfo = [
    ...(contact.officeAddress ? [{
      icon: <MapPin className="h-5 w-5" />,
      label: t("info.officeAddress"),
      value: contact.officeAddress,
    }] : []),
    ...(contact.registeredAddress ? [{
      icon: <MapPin className="h-5 w-5" />,
      label: t("info.registeredAddress"),
      value: contact.registeredAddress,
    }] : []),
    {
      icon: <Phone className="h-5 w-5" />,
      label: t("info.phone"),
      value: contact.phone,
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("info.email"),
      value: contact.email,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: t("info.workingHours"),
      value: contact.workingHours,
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

            {/* Map */}
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] bg-muted">
                {contact.mapUrl ? (
                  <iframe
                    src={contact.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 h-8 w-8" />
                      <p className="text-sm">{t("mapPlaceholder")}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
