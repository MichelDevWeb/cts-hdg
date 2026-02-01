import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAllServices, createService } from "@/lib/db/queries/services";
import type { NewService } from "@/lib/db/schema";

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = "force-dynamic";

// Helper to revalidate all service-related pages
function revalidateServicePages() {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/services", "page");
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

    const services = await getAllServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
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

    const data: NewService = await request.json();
    const service = await createService(data);
    // Revalidate cached pages
    revalidateServicePages();
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

