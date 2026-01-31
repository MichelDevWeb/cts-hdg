import { db } from "@/lib/db";
import { siteInfo } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { SiteInfo, NewSiteInfo } from "@/lib/db/schema";

// Get all site info
export async function getAllSiteInfo(): Promise<SiteInfo[]> {
  return db.select().from(siteInfo);
}

// Get site info by key
export async function getSiteInfoByKey(
  key: string
): Promise<SiteInfo | undefined> {
  const results = await db
    .select()
    .from(siteInfo)
    .where(eq(siteInfo.key, key));
  return results[0];
}

// Get site info as a map
export async function getSiteInfoMap(): Promise<Record<string, SiteInfo>> {
  const allInfo = await getAllSiteInfo();
  return allInfo.reduce(
    (acc, info) => {
      acc[info.key] = info;
      return acc;
    },
    {} as Record<string, SiteInfo>
  );
}

// Update site info
export async function updateSiteInfo(
  key: string,
  data: Partial<NewSiteInfo>
): Promise<SiteInfo | undefined> {
  const results = await db
    .update(siteInfo)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(siteInfo.key, key))
    .returning();
  return results[0];
}

// Upsert site info (create if not exists, update if exists)
export async function upsertSiteInfo(
  key: string,
  data: Omit<NewSiteInfo, "key">
): Promise<SiteInfo> {
  const existing = await getSiteInfoByKey(key);
  if (existing) {
    const updated = await updateSiteInfo(key, data);
    return updated!;
  } else {
    const results = await db
      .insert(siteInfo)
      .values({ key, ...data })
      .returning();
    return results[0];
  }
}

// Helper to get localized contact info
export function getLocalizedSiteInfo(
  infoMap: Record<string, SiteInfo>,
  locale: string
) {
  const getValue = (key: string) => {
    const info = infoMap[key];
    if (!info) return "";
    if (info.valuePlain) return info.valuePlain;
    return locale === "vi"
      ? (info.valueVi || info.valueEn || "")
      : locale === "zh"
        ? (info.valueZh || info.valueEn || "")
        : (info.valueEn || "");
  };

  return {
    company: getValue("company_name"),
    abbreviation: getValue("company_abbreviation"),
    registeredAddress: getValue("registered_address"),
    officeAddress: getValue("office_address"),
    address: getValue("registered_address"), // alias for backward compatibility
    phone: getValue("phone"),
    email: getValue("email"),
    website: getValue("website"),
    mapUrl: getValue("map_url"),
    workingHours: getValue("working_hours"),
    legalRepresentative: getValue("legal_representative"),
    companyProfileUrl: getValue("company_profile_url"),
  };
}

