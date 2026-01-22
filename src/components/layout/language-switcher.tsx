"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/config";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as Locale });
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger 
        className="w-auto gap-2 border border-hdg-blue-200 bg-white/80 backdrop-blur-sm px-3 py-2 text-sm font-medium text-hdg-dark-700 hover:bg-hdg-blue-50 hover:border-hdg-blue-400 focus:ring-2 focus:ring-hdg-blue-200 focus:ring-offset-0 transition-all duration-200 rounded-lg shadow-sm"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 text-hdg-blue-500" />
        <SelectValue>
          <span className="hidden sm:inline">{localeNames[locale]}</span>
          <span className="sm:hidden">{localeFlags[locale]}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent 
        className="min-w-[140px] border border-hdg-blue-100 bg-white/95 backdrop-blur-md shadow-lg rounded-lg"
        align="end"
      >
        {locales.map((loc) => (
          <SelectItem 
            key={loc} 
            value={loc}
            className="cursor-pointer px-3 py-2.5 text-sm font-medium text-hdg-dark-700 hover:bg-hdg-blue-50 hover:text-hdg-blue-600 focus:bg-hdg-blue-50 focus:text-hdg-blue-600 rounded-md transition-colors duration-150"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-base">{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
