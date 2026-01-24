"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import { getLocalizedContactInfo } from "@/lib/data/mock-data";
import { useLocale } from "next-intl";
import type { Locale } from "@/lib/i18n/config";

const quickLinks = [
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "services" },
  { href: "/projects", labelKey: "projects" },
  { href: "/process", labelKey: "process" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const contact = getLocalizedContactInfo(locale);

  return (
    <footer className="border-t bg-hdg-dark-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="HDG Logo"
                width={48}
                height={48}
                className="h-12 w-12 brightness-0 invert"
              />
              <div>
                <span className="block font-heading text-xl font-bold text-white">
                  HDG
                </span>
                <span className="block text-xs text-gray-400">
                  Design & Engineering Consultancy
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white hover:underline underline-offset-4"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-white">
              {t("services")}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-default">
                {t("serviceDesign")}
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                {t("serviceEngineering")}
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                {t("serviceArchitecture")}
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                {t("serviceStructure")}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-white">
              {t("contact")}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3 group">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-hdg-blue-400 transition-transform group-hover:scale-110" />
                <span className="group-hover:text-white transition-colors">
                  {contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 shrink-0 text-hdg-blue-400 transition-transform group-hover:scale-110" />
                <span className="group-hover:text-white transition-colors">
                  {contact.phone}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 shrink-0 text-hdg-blue-400 transition-transform group-hover:scale-110" />
                <span className="group-hover:text-white transition-colors">
                  {contact.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
          <p>{t("copyright")}</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
