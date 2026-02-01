import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  getAllTeamMembers,
  createTeamMember,
} from "@/lib/db/queries/team";
import type { NewTeamMember } from "@/lib/db/schema";

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = "force-dynamic";

// Helper to revalidate pages that display team members
function revalidateTeamPages() {
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

    const teamMembers = await getAllTeamMembers();
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
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
    
    const teamMemberData: NewTeamMember = {
      name: body.name,
      roleVi: body.roleVi,
      roleEn: body.roleEn,
      roleZh: body.roleZh,
      bioVi: body.bioVi || null,
      bioEn: body.bioEn || null,
      bioZh: body.bioZh || null,
      educationVi: body.educationVi || null,
      educationEn: body.educationEn || null,
      educationZh: body.educationZh || null,
      certificationsVi: body.certificationsVi || [],
      certificationsEn: body.certificationsEn || [],
      certificationsZh: body.certificationsZh || [],
      photo: body.photo || null,
      orderIndex: body.orderIndex || 0,
      active: body.active ?? true,
    };

    const teamMember = await createTeamMember(teamMemberData);
    // Revalidate cached pages
    revalidateTeamPages();
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

