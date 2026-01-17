import { ReactNode } from "react";
import { Link } from "@/lib/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  href,
  className,
}: ServiceCardProps) {
  const content = (
    <Card
      className={cn(
        "group h-full border-2 transition-all hover:border-primary hover:shadow-lg",
        className
      )}
    >
      <CardHeader>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          {icon}
        </div>
        <CardTitle className="flex items-center gap-2 font-heading text-xl">
          {title}
          {href && (
            <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

