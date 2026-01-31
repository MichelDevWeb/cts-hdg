import { NextResponse } from "next/server";
import { getActiveTeamMembers } from "@/lib/db/queries/team";

export async function GET() {
  try {
    const teamMembers = await getActiveTeamMembers();
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

