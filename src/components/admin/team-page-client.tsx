"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TeamTable } from "./team-table";
import { TeamDialog } from "./team-dialog";
import type { TeamMember } from "@/lib/db/schema";

interface TeamPageClientProps {
  members: TeamMember[];
  locale: string;
}

export function TeamPageClient({
  members,
  locale,
}: TeamPageClientProps) {
  const t = useTranslations("admin.team");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleOpenDialog = (member?: TeamMember) => {
    setSelectedMember(member || null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addMember")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allMembers")}</CardTitle>
        </CardHeader>
        <CardContent>
          {members && members.length > 0 ? (
            <TeamTable
              members={members}
              locale={locale}
              onEdit={handleOpenDialog}
            />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>{t("noMembers")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <TeamDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        member={selectedMember}
        locale={locale}
      />
    </div>
  );
}
