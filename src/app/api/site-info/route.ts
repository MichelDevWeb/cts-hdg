import { NextResponse } from "next/server";
import { getSiteInfoMap } from "@/lib/db/queries/site-info";

export async function GET() {
  try {
    const siteInfo = await getSiteInfoMap();
    return NextResponse.json(siteInfo);
  } catch (error) {
    console.error("Error fetching site info:", error);
    return NextResponse.json(
      { error: "Failed to fetch site info" },
      { status: 500 }
    );
  }
}

