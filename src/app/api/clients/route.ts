import { NextResponse } from "next/server";
import { getActiveClients } from "@/lib/db/queries/clients";

export async function GET() {
  try {
    const clients = await getActiveClients();
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

