import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateTeamMembersOrder } from "@/lib/db/queries/team";

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { updates } = await request.json();

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    await updateTeamMembersOrder(updates);

    // Revalidate cached pages
    revalidatePath("/[locale]/about", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating team member order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

