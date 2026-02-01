import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAllClients, createClient as createClientRecord } from "@/lib/db/queries/clients";
import type { NewClient } from "@/lib/db/schema";

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = "force-dynamic";

// Helper to revalidate pages that display clients
function revalidateClientPages() {
  revalidatePath("/[locale]", "page");
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clientsList = await getAllClients();
    return NextResponse.json(clientsList);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const clientData: NewClient = {
      name: body.name,
      logoUrl: body.logoUrl || null,
      website: body.website || null,
      category: body.category || "other",
      orderIndex: body.orderIndex || 0,
      active: body.active ?? true,
    };

    const client = await createClientRecord(clientData);
    // Revalidate cached pages
    revalidateClientPages();
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}

