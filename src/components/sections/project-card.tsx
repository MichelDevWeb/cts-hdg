import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  location: string;
  year: number;
  coverImage: string;
  slug: string;
  className?: string;
}

export function ProjectCard({
  title,
  category,
  location,
  year,
  coverImage,
  slug,
  className,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <Card
        className={cn(
          "group h-full overflow-hidden border-0 shadow-md transition-all hover:shadow-xl",
          className
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {category}
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

