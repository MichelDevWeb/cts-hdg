import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export function Section({
  title,
  subtitle,
  children,
  className,
  containerClassName,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {subtitle && (
              <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-secondary">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="font-heading text-3xl font-bold text-primary md:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

