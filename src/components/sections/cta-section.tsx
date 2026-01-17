import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  href?: string;
  className?: string;
}

export function CTASection({
  title,
  description,
  buttonText,
  href = "/contact",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-hdg-blue-600 via-hdg-blue-500 to-hdg-dark-700 py-16 text-white md:py-24",
        className
      )}
    >
      {/* Decorative Elements */}
      <div className="absolute -right-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-hdg-blue-300/20 blur-3xl" />

      <div className="container relative mx-auto px-4 text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
          {description}
        </p>
        <Link href={href}>
          <Button
            size="lg"
            className="group bg-white text-hdg-blue-600 hover:bg-gray-100 font-semibold shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
