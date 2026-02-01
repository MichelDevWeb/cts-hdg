import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  getProjectById,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
  toggleProjectPublished,
} from "@/lib/db/queries/projects";

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = "force-dynamic";

// Helper to revalidate all project-related pages
function revalidateProjectPages() {
  // Revalidate home page (featured projects)
  revalidatePath("/[locale]", "page");
  // Revalidate projects list page
  revalidatePath("/[locale]/projects", "page");
  // Revalidate all project detail pages
  revalidatePath("/[locale]/projects/[slug]", "page");
}

// GET single project
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
    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PATCH update project
export async function PATCH(
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
    const data = await request.json();

    // Check for special actions
    if (data.action === "toggleFeatured") {
      const project = await toggleProjectFeatured(id);
      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
      // Revalidate cached pages
      revalidateProjectPages();
      return NextResponse.json(project);
    }

    if (data.action === "togglePublished") {
      const project = await toggleProjectPublished(id);
      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
      // Revalidate cached pages
      revalidateProjectPages();
      return NextResponse.json(project);
    }

    // Regular update
    const project = await updateProject(id, data);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Revalidate cached pages
    revalidateProjectPages();
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project
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
    const success = await deleteProject(id);

    if (!success) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Revalidate cached pages
    revalidateProjectPages();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

