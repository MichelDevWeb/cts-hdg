export const locales = ["vi", "en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export const localeNames: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
  zh: "中文",
};

export const localeFlags: Record<Locale, string> = {
  vi: "🇻🇳",
  en: "🇺🇸",
  zh: "🇨🇳",
};

