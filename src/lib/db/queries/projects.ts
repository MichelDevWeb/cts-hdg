import { eq, desc, and, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects, type Project, type NewProject } from "@/lib/db/schema";

// Get all published projects
export async function getPublishedProjects(): Promise<Project[]> {
  return db
    .select()
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(asc(projects.orderIndex), desc(projects.year), desc(projects.createdAt));
}

// Get all projects (for admin)
export async function getAllProjects(): Promise<Project[]> {
  return db
    .select()
    .from(projects)
    .orderBy(asc(projects.orderIndex), desc(projects.year), desc(projects.createdAt));
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const result = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.published, true)))
    .limit(1);

  return result[0];
}

// Get project by slug (for admin - includes unpublished)
export async function getProjectBySlugAdmin(slug: string): Promise<Project | undefined> {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  return result[0];
}

// Get project by ID (for admin)
export async function getProjectById(id: string): Promise<Project | undefined> {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  return result[0];
}

// Create a new project
export async function createProject(data: NewProject): Promise<Project> {
  const result = await db.insert(projects).values(data).returning();
  return result[0];
}

// Update a project
export async function updateProject(
  id: string,
  data: Partial<NewProject>
): Promise<Project | undefined> {
  const result = await db
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();

  return result[0];
}

// Delete a project
export async function deleteProject(id: string): Promise<boolean> {
  const result = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning();

  return result.length > 0;
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.category, category), eq(projects.published, true)))
    .orderBy(asc(projects.orderIndex), desc(projects.year));
}

// Get featured projects (marked as featured)
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.published, true), eq(projects.featured, true)))
    .orderBy(asc(projects.orderIndex), desc(projects.year), desc(projects.createdAt))
    .limit(limit);
}

// Toggle featured status
export async function toggleProjectFeatured(id: string): Promise<Project | undefined> {
  const project = await getProjectById(id);
  if (!project) return undefined;

  const result = await db
    .update(projects)
    .set({ featured: !project.featured, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();

  return result[0];
}

// Toggle published status
export async function toggleProjectPublished(id: string): Promise<Project | undefined> {
  const project = await getProjectById(id);
  if (!project) return undefined;

  const result = await db
    .update(projects)
    .set({ published: !project.published, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();

  return result[0];
}

// Bulk update orderIndex for multiple projects
export async function updateProjectsOrder(
  updates: Array<{ id: string; orderIndex: number }>
): Promise<void> {
  await Promise.all(
    updates.map(({ id, orderIndex }) =>
      db
        .update(projects)
        .set({ orderIndex, updatedAt: new Date() })
        .where(eq(projects.id, id))
    )
  );
}

// Helper to get localized project fields
export function getLocalizedProject(project: Project, locale: string) {
  return {
    ...project,
    title:
      locale === "vi"
        ? project.titleVi
        : locale === "zh"
          ? project.titleZh
          : project.titleEn,
    summary:
      locale === "vi"
        ? project.summaryVi
        : locale === "zh"
          ? project.summaryZh
          : project.summaryEn,
    content:
      locale === "vi"
        ? project.contentVi
        : locale === "zh"
          ? project.contentZh
          : project.contentEn,
  };
}

