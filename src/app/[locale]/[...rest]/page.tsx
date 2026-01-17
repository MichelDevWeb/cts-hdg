import { notFound } from "next/navigation";

// Catch-all route for any unmatched paths
// This ensures that invalid routes are redirected to the not-found page
export default function CatchAllPage() {
  notFound();
}

