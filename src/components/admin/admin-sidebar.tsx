"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Users,
  MessageSquare,
  Settings,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/admin-projects",
    icon: FolderKanban,
  },
  {
    title: "Posts",
    href: "/admin-posts",
    icon: FileText,
  },
  {
    title: "Team",
    href: "/admin-team",
    icon: Users,
  },
  {
    title: "Inquiries",
    href: "/admin-inquiries",
    icon: MessageSquare,
  },
  {
    title: "Clients",
    href: "/admin-clients",
    icon: Building2,
  },
  {
    title: "Settings",
    href: "/admin-settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  // Extract the path without locale
  const currentPath = pathname.replace(/^\/(vi|en|zh)/, "");

  return (
    <aside className="hidden w-64 border-r bg-card lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
            HDG
          </div>
          <span className="font-heading font-semibold">Admin</span>
        </Link>
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = currentPath === item.href || currentPath.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

