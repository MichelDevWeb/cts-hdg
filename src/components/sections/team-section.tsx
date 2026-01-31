"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Users, ChevronDown, ChevronUp, Briefcase, GraduationCap, Award } from "lucide-react";
import { LoadingTeamGrid } from "@/components/ui/loading-section";
import { teamMembers as mockTeamMembers, getLocalizedTeamMember } from "@/lib/data/mock-data";
import type { TeamMember as TeamMemberDB } from "@/lib/db/schema";
import type { Locale } from "@/lib/i18n/config";

interface TeamMember {
  id: string;
  name: string;
  photo?: string;
  role: string;
  bio?: string;
  education?: string;
  certifications?: string[];
}

interface TeamSectionProps {
  members?: TeamMember[];
  useDynamicData?: boolean;
}

export function TeamSection({ members: propMembers, useDynamicData = false }: TeamSectionProps) {
  const t = useTranslations("about.team");
  const locale = useLocale() as Locale;
  const [isExpanded, setIsExpanded] = useState(false);
  const [dynamicMembers, setDynamicMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(useDynamicData);
  const INITIAL_DISPLAY = 4;

  // Fetch dynamic data if enabled
  useEffect(() => {
    if (useDynamicData) {
      const fetchMembers = async () => {
        try {
          const response = await fetch("/api/team");
          if (!response.ok) throw new Error("Failed to fetch team members");
          const data: TeamMemberDB[] = await response.json();
          
          // Transform to localized format
          const localizedMembers = data.map((member) => ({
            id: member.id,
            name: member.name,
            photo: member.photo || undefined,
            role: locale === "vi" ? member.roleVi : locale === "zh" ? member.roleZh : member.roleEn,
            bio: locale === "vi" ? member.bioVi : locale === "zh" ? member.bioZh : member.bioEn,
            education: locale === "vi" ? member.educationVi : locale === "zh" ? member.educationZh : member.educationEn,
            certifications: locale === "vi" ? member.certificationsVi : locale === "zh" ? member.certificationsZh : member.certificationsEn,
          }));
          
          setDynamicMembers(localizedMembers as TeamMember[]);
        } catch (error) {
          console.error("Error fetching team members:", error);
          // Fallback to mock data on error
          const mockMembers = mockTeamMembers.map((member) => 
            getLocalizedTeamMember(member, locale)
          );
          setDynamicMembers(mockMembers);
        } finally {
          setLoading(false);
        }
      };
      fetchMembers();
    }
  }, [useDynamicData, locale]);

  const members = useDynamicData ? dynamicMembers : (propMembers || []);
  const displayedMembers = isExpanded ? members : members.slice(0, INITIAL_DISPLAY);
  const hasMore = members.length > INITIAL_DISPLAY;

  if (loading) {
    return <LoadingTeamGrid count={4} />;
  }

  if (members.length === 0) {
    return null;
  }

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
              className="w-96 border-hdg-blue-200 bg-white/95 backdrop-blur-sm dark:bg-hdg-dark-800/95"
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
                <div className="flex-1 space-y-2">
                  <div>
                    <h4 className="font-heading text-sm font-semibold">
                      {member.name}
                    </h4>
                    <div className="mt-1 flex items-center gap-1 text-xs text-hdg-blue-600">
                      <Briefcase className="h-3 w-3 flex-shrink-0" />
                      <span>{member.role}</span>
                    </div>
                  </div>
                  
                  {member.education && (
                    <div className="flex items-start gap-1 text-xs text-muted-foreground">
                      <GraduationCap className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{member.education}</span>
                    </div>
                  )}
                  
                  {member.certifications && member.certifications.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs font-medium text-hdg-blue-600">
                        <Award className="h-3 w-3 flex-shrink-0" />
                        <span>{t("certifications")}</span>
                      </div>
                      <ul className="ml-4 space-y-0.5">
                        {member.certifications.slice(0, 2).map((cert, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground">
                            • {cert}
                          </li>
                        ))}
                        {member.certifications.length > 2 && (
                          <li className="text-xs text-muted-foreground italic">
                            +{member.certifications.length - 2} {t("more")}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {member.bio && !member.certifications && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
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

