"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we're in an admin or auth route
  const isAdminRoute = pathname.includes("/dashboard") || pathname.includes("/admin-");
  const isAuthRoute = pathname.includes("/login") || pathname.includes("/reset-password");

  // Hide header/footer for admin and auth routes
  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

