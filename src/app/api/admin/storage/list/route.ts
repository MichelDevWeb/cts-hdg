import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "projects";
    const limit = parseInt(searchParams.get("limit") || "100");

    // List files from the storage bucket
    // If folder is empty or root, list from root, otherwise list from folder
    const listPath = folder === "projects" || folder === "" ? folder : folder;
    
    const { data, error } = await supabase.storage
      .from("project-images")
      .list(listPath, {
        limit,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error("Storage list error:", error);
      // If folder doesn't exist, return empty array instead of error
      if (error.message?.includes("not found")) {
        return NextResponse.json({ files: [] });
      }
      return NextResponse.json(
        { error: "Failed to list files" },
        { status: 500 }
      );
    }

    // Filter out folders, only return image files
    // Files have an 'id' field, folders don't (or have empty id)
    const imageFiles = (data || []).filter(
      (file) => file.name && file.id && file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
    );

    // Get public URLs for each file
    const filesWithUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = listPath ? `${listPath}/${file.name}` : file.name;
        const { data: urlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);

        return {
          name: file.name,
          path: filePath,
          url: urlData.publicUrl,
          size: file.metadata?.size || 0,
          created_at: file.created_at,
        };
      })
    );

    return NextResponse.json({ files: filesWithUrls });
  } catch (error) {
    console.error("Error listing files:", error);
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}

