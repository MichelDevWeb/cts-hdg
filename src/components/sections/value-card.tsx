import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ValueCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function ValueCard({
  title,
  description,
  icon,
  className,
}: ValueCardProps) {
  return (
    <div
      className={cn(
        "group flex gap-4 rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-md",
        className
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>
      <div>
        <h3 className="mb-2 font-heading font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

