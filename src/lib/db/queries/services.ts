import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import type { Service, NewService } from "@/lib/db/schema";

// Get all services (for admin)
export async function getAllServices(): Promise<Service[]> {
  return db.select().from(services).orderBy(asc(services.orderIndex));
}

// Get active services (for public)
export async function getActiveServices(): Promise<Service[]> {
  return db
    .select()
    .from(services)
    .where(eq(services.active, true))
    .orderBy(asc(services.orderIndex));
}

// Get service by ID
export async function getServiceById(id: string): Promise<Service | undefined> {
  const results = await db.select().from(services).where(eq(services.id, id));
  return results[0];
}

// Get service by slug
export async function getServiceBySlug(
  slug: string
): Promise<Service | undefined> {
  const results = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug));
  return results[0];
}

// Create service
export async function createService(data: NewService): Promise<Service> {
  const results = await db.insert(services).values(data).returning();
  return results[0];
}

// Update service
export async function updateService(
  id: string,
  data: Partial<NewService>
): Promise<Service | undefined> {
  const results = await db
    .update(services)
    .set(data)
    .where(eq(services.id, id))
    .returning();
  return results[0];
}

// Delete service
export async function deleteService(id: string): Promise<void> {
  await db.delete(services).where(eq(services.id, id));
}

// Toggle service active status
export async function toggleServiceActive(
  id: string,
  active: boolean
): Promise<Service | undefined> {
  const results = await db
    .update(services)
    .set({ active })
    .where(eq(services.id, id))
    .returning();
  return results[0];
}

// Helper to get localized service
export function getLocalizedService(
  service: Service,
  locale: string
): {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  features: string[];
  icon: string | null;
} {
  return {
    id: service.id,
    slug: service.slug,
    name:
      locale === "vi"
        ? service.nameVi
        : locale === "zh"
          ? service.nameZh
          : service.nameEn,
    description:
      locale === "vi"
        ? service.descriptionVi
        : locale === "zh"
          ? service.descriptionZh
          : service.descriptionEn,
    features:
      locale === "vi"
        ? (service.featuresVi || [])
        : locale === "zh"
          ? (service.featuresZh || [])
          : (service.featuresEn || []),
    icon: service.icon,
  };
}

