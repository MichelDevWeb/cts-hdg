import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { inquiries, type Inquiry, type NewInquiry } from "@/lib/db/schema";

// Get all inquiries (for admin)
export async function getAllInquiries(): Promise<Inquiry[]> {
  return db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt));
}

// Get inquiries by status
export async function getInquiriesByStatus(status: string): Promise<Inquiry[]> {
  return db
    .select()
    .from(inquiries)
    .where(eq(inquiries.status, status))
    .orderBy(desc(inquiries.createdAt));
}

// Get inquiry by ID
export async function getInquiryById(id: string): Promise<Inquiry | undefined> {
  const result = await db
    .select()
    .from(inquiries)
    .where(eq(inquiries.id, id))
    .limit(1);

  return result[0];
}

// Create a new inquiry (from contact form)
export async function createInquiry(data: NewInquiry): Promise<Inquiry> {
  const result = await db.insert(inquiries).values(data).returning();
  return result[0];
}

// Update inquiry status
export async function updateInquiryStatus(
  id: string,
  status: string
): Promise<Inquiry | undefined> {
  const result = await db
    .update(inquiries)
    .set({ status })
    .where(eq(inquiries.id, id))
    .returning();

  return result[0];
}

// Delete an inquiry
export async function deleteInquiry(id: string): Promise<boolean> {
  const result = await db
    .delete(inquiries)
    .where(eq(inquiries.id, id))
    .returning();

  return result.length > 0;
}

// Get new inquiries count
export async function getNewInquiriesCount(): Promise<number> {
  const result = await db
    .select()
    .from(inquiries)
    .where(eq(inquiries.status, "new"));

  return result.length;
}

