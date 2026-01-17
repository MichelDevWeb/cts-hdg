import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hdg.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/process",
    "/contact",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and route
  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return sitemap;
}

