"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
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
    key: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "projects",
    href: "/admin-projects",
    icon: FolderKanban,
  },
  {
    key: "posts",
    href: "/admin-posts",
    icon: FileText,
  },
  {
    key: "team",
    href: "/admin-team",
    icon: Users,
  },
  {
    key: "inquiries",
    href: "/admin-inquiries",
    icon: MessageSquare,
  },
  {
    key: "clients",
    href: "/admin-clients",
    icon: Building2,
  },
  {
    key: "settings",
    href: "/admin-settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const t = useTranslations("admin");

  // Extract the path without locale
  const currentPath = pathname.replace(/^\/(vi|en|zh)/, "");

  return (
    <aside className="hidden w-64 border-r bg-card lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Image
            src="/images/logo.png"
            alt="HDG Logo"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-heading font-semibold text-hdg-dark-700">Admin</span>
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
                  ? "bg-hdg-blue-500 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {t(`${item.key}.title`)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
