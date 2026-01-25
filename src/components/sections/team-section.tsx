"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronDown, ChevronUp } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  photo?: string;
  role: string;
  bio?: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  const t = useTranslations("about.team");
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_DISPLAY = 4;
  const displayedMembers = isExpanded ? members : members.slice(0, INITIAL_DISPLAY);
  const hasMore = members.length > INITIAL_DISPLAY;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedMembers.map((member) => (
          <Card
            key={member.id}
            className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-hdg-blue-50">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-hdg-blue-100">
                  <Users className="h-16 w-16 text-hdg-blue-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-hdg-dark-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <CardContent className="p-4">
              <h3 className="mb-1 font-heading text-base font-semibold">
                {member.name}
              </h3>
              <p className="mb-2 text-xs font-medium text-hdg-blue-600">
                {member.role}
              </p>
              {member.bio && (
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {member.bio}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                {t("showLess")}
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                {t("showAll", { count: members.length })}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

