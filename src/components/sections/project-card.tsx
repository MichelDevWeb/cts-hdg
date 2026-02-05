"use client";

import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { ImageWithDimensions } from "@/components/ui/image-with-dimensions";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  location: string;
  year: number;
  coverImage?: string | null;
  slug: string;
  className?: string;
}

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop";

export function ProjectCard({
  title,
  category,
  location,
  year,
  coverImage,
  slug,
  className,
}: ProjectCardProps) {
  const t = useTranslations("projects.filter");
  
  // Get localized category label
  const getCategoryLabel = (cat: string) => {
    if (cat === "all") return t("all");
    return t(cat as "residential" | "commercial" | "industrial" | "infrastructure") || cat;
  };

  return (
    <Link href={`/projects/${slug}`}>
      <Card
        className={cn(
          "group h-full overflow-hidden border-0 shadow-md transition-all hover:shadow-xl",
          className
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageWithDimensions
            src={coverImage || DEFAULT_COVER_IMAGE}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {getCategoryLabel(category)}
          </span>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 font-heading text-lg font-semibold transition-colors group-hover:text-primary">
            {title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {year}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

