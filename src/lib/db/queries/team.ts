import { db } from "@/lib/db";
import { team } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import type { TeamMember, NewTeamMember } from "@/lib/db/schema";

// Get all team members (for admin)
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return db.select().from(team).orderBy(asc(team.orderIndex));
}

// Get active team members (for public)
export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  return db
    .select()
    .from(team)
    .where(eq(team.active, true))
    .orderBy(asc(team.orderIndex));
}

// Get team member by ID
export async function getTeamMemberById(
  id: string
): Promise<TeamMember | undefined> {
  const results = await db.select().from(team).where(eq(team.id, id));
  return results[0];
}

// Create team member
export async function createTeamMember(
  data: NewTeamMember
): Promise<TeamMember> {
  const results = await db.insert(team).values(data).returning();
  return results[0];
}

// Update team member
export async function updateTeamMember(
  id: string,
  data: Partial<NewTeamMember>
): Promise<TeamMember | undefined> {
  const results = await db
    .update(team)
    .set(data)
    .where(eq(team.id, id))
    .returning();
  return results[0];
}

// Delete team member
export async function deleteTeamMember(id: string): Promise<void> {
  await db.delete(team).where(eq(team.id, id));
}

// Toggle team member active status
export async function toggleTeamMemberActive(
  id: string,
  active: boolean
): Promise<TeamMember | undefined> {
  const results = await db
    .update(team)
    .set({ active })
    .where(eq(team.id, id))
    .returning();
  return results[0];
}

