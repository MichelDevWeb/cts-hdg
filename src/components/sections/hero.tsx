import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  pattern?: boolean;
  size?: "default" | "compact" | "large";
}

export function Hero({
  title,
  subtitle,
  description,
  children,
  className,
  pattern = true,
  size = "default",
}: HeroProps) {
  const sizeClasses = {
    compact: "py-12 md:py-16",
    default: "py-16 md:py-24",
    large: "py-20 md:py-32",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-hdg-dark-900 via-hdg-dark-800 to-hdg-blue-900 text-white",
        sizeClasses[size],
        className
      )}
    >
      {/* Background Pattern */}
      {pattern && (
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Accent Shapes */}
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-hdg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-hdg-blue-400/20 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl">
          {subtitle && (
            <span className="mb-4 inline-block rounded-full bg-hdg-blue-500/20 px-4 py-1.5 text-sm font-medium text-hdg-blue-300 opacity-0 animate-fade-in-up">
              {subtitle}
            </span>
          )}
          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight opacity-0 animate-fade-in-up animation-delay-100 md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mb-8 text-lg leading-relaxed text-gray-300 opacity-0 animate-fade-in-up animation-delay-200 md:text-xl">
              {description}
            </p>
          )}
          {children && (
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up animation-delay-300">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
