import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/db/queries/team";
import type { NewTeamMember } from "@/lib/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const teamMember = await getTeamMemberById(id);

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updateData: Partial<NewTeamMember> = {
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
      orderIndex: body.orderIndex,
      active: body.active,
    };

    const teamMember = await updateTeamMember(id, updateData);

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await deleteTeamMember(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}

