"use client";

import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";

export function AdminLink() {
  const t = useTranslations("nav");

  return (
    <Link href="/dashboard">
      <Button
        variant="ghost"
        size="icon"
        className="hidden lg:flex text-muted-foreground hover:text-hdg-blue-600 transition-colors"
        title={t("admin")}
      >
        <UserIcon className="h-5 w-5" />
      </Button>
    </Link>
  );
}
