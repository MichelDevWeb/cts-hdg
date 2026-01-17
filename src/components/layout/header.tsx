"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "services" },
  { href: "/projects", labelKey: "projects" },
  { href: "/process", labelKey: "process" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Image
              src="/images/logo.png"
              alt="HDG Logo"
              width={48}
              height={48}
              className="h-10 w-10 lg:h-12 lg:w-12"
              priority
            />
            <div className="hidden sm:block">
              <span className="block font-heading text-lg font-bold text-hdg-dark-700 lg:text-xl">
                HDG
              </span>
              <span className="block text-xs text-muted-foreground">
                Design & Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                  pathname === item.href
                    ? "text-primary after:w-full"
                    : "text-muted-foreground"
                )}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/contact" className="hidden lg:block">
              <Button className="bg-hdg-blue-500 hover:bg-hdg-blue-600 transition-all duration-200 hover:shadow-lg hover:shadow-hdg-blue-500/20">
                {t("contact")}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 lg:hidden",
            mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="border-t py-4">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                    "opacity-0 animate-slide-in-left",
                    pathname === item.href
                      ? "bg-hdg-blue-50 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-hdg-blue-500 hover:bg-hdg-blue-600">
                    {t("contact")}
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
