import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAllSiteInfo, upsertSiteInfo } from "@/lib/db/queries/site-info";
import type { NewSiteInfo } from "@/lib/db/schema";

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = "force-dynamic";

// Helper to revalidate pages that display site info (footer, contact, etc.)
function revalidateSiteInfoPages() {
  // Revalidate all locale pages as site info is used in footer/header
  revalidatePath("/[locale]", "layout");
  revalidatePath("/[locale]/contact", "page");
  revalidatePath("/[locale]/about", "page");
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

    const siteInfo = await getAllSiteInfo();
    return NextResponse.json(siteInfo);
  } catch (error) {
    console.error("Error fetching site info:", error);
    return NextResponse.json(
      { error: "Failed to fetch site info" },
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

    const { key, ...data }: NewSiteInfo = await request.json();
    const info = await upsertSiteInfo(key, data);
    // Revalidate cached pages
    revalidateSiteInfoPages();
    return NextResponse.json(info, { status: 201 });
  } catch (error) {
    console.error("Error upserting site info:", error);
    return NextResponse.json(
      { error: "Failed to upsert site info" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Bulk update site info
    const items: NewSiteInfo[] = await request.json();
    const results = await Promise.all(
      items.map((item) => upsertSiteInfo(item.key, item))
    );
    // Revalidate cached pages
    revalidateSiteInfoPages();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error bulk updating site info:", error);
    return NextResponse.json(
      { error: "Failed to update site info" },
      { status: 500 }
    );
  }
}

