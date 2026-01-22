import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { locales, type Locale } from "@/lib/i18n/config";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import "@/app/globals.css";

// Be Vietnam Pro - optimized for Vietnamese with modern aesthetics
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HDG Design & Engineering Consultancy",
    template: "%s | HDG",
  },
  description:
    "HDG is a design and engineering consultancy providing highly feasible technical solutions, optimizing investment efficiency and aligning with real-world project conditions.",
  keywords: [
    "design consultancy",
    "engineering",
    "construction",
    "architecture",
    "MEP",
    "Vietnam",
    "HDG",
    "tư vấn thiết kế",
    "xây dựng",
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ConditionalLayout>{children}</ConditionalLayout>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
