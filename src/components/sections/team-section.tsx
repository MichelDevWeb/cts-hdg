"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Users, ChevronDown, ChevronUp, Briefcase } from "lucide-react";

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
          <HoverCard key={member.id} openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
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
                  <p className="text-xs font-medium text-hdg-blue-600">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-80 border-hdg-blue-200 bg-white/95 backdrop-blur-sm dark:bg-hdg-dark-800/95"
              side="top"
              align="center"
            >
              <div className="flex gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-hdg-blue-100">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Users className="h-8 w-8 text-hdg-blue-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading text-sm font-semibold">
                    {member.name}
                  </h4>
                  <div className="mt-1 flex items-center gap-1 text-xs text-hdg-blue-600">
                    <Briefcase className="h-3 w-3" />
                    <span>{member.role}</span>
                  </div>
                  {member.bio && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
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

