import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateServicesOrder } from "@/lib/db/queries/services";

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

    await updateServicesOrder(updates);

    // Revalidate cached pages
    revalidatePath("/[locale]", "page");
    revalidatePath("/[locale]/services", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating service order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

