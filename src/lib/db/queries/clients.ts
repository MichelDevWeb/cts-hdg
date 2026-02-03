import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import type { Client, NewClient } from "@/lib/db/schema";

// Get all clients (for admin)
export async function getAllClients(): Promise<Client[]> {
  return db.select().from(clients).orderBy(asc(clients.orderIndex));
}

// Get active clients (for public)
export async function getActiveClients(): Promise<Client[]> {
  return db
    .select()
    .from(clients)
    .where(eq(clients.active, true))
    .orderBy(asc(clients.orderIndex));
}

// Get client by ID
export async function getClientById(id: string): Promise<Client | undefined> {
  const results = await db.select().from(clients).where(eq(clients.id, id));
  return results[0];
}

// Create client
export async function createClient(data: NewClient): Promise<Client> {
  const results = await db.insert(clients).values(data).returning();
  return results[0];
}

// Update client
export async function updateClient(
  id: string,
  data: Partial<NewClient>
): Promise<Client | undefined> {
  const results = await db
    .update(clients)
    .set(data)
    .where(eq(clients.id, id))
    .returning();
  return results[0];
}

// Delete client
export async function deleteClient(id: string): Promise<void> {
  await db.delete(clients).where(eq(clients.id, id));
}

// Toggle client active status
export async function toggleClientActive(
  id: string,
  active: boolean
): Promise<Client | undefined> {
  const results = await db
    .update(clients)
    .set({ active })
    .where(eq(clients.id, id))
    .returning();
  return results[0];
}

// Bulk update orderIndex for multiple clients
export async function updateClientsOrder(
  updates: Array<{ id: string; orderIndex: number }>
): Promise<void> {
  await Promise.all(
    updates.map(({ id, orderIndex }) =>
      db
        .update(clients)
        .set({ orderIndex })
        .where(eq(clients.id, id))
    )
  );
}

