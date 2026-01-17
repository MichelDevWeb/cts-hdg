import { cn } from "@/lib/utils";

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
  className?: string;
}

export function ProcessStep({
  step,
  title,
  description,
  isLast = false,
  className,
}: ProcessStepProps) {
  return (
    <div className={cn("relative flex gap-6", className)}>
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
          {step}
        </div>
        {!isLast && (
          <div className="mt-4 h-full w-0.5 bg-gradient-to-b from-primary to-primary/20" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <h3 className="mb-2 font-heading text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

