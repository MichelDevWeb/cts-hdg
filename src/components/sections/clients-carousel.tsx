"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { clients } from "@/lib/data/mock-data";

interface ClientsCarouselProps {
  showTitle?: boolean;
}

export function ClientsCarousel({ showTitle = true }: ClientsCarouselProps) {
  const t = useTranslations("home");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate clients for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        
        // Reset position when we've scrolled half the content (original set)
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= halfWidth) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <div className="w-full">
      {showTitle && (
        <div className="mb-8 text-center">
          <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            {t("clients.title")}
          </h3>
          <p className="mt-2 text-muted-foreground">
            {t("clients.subtitle")}
          </p>
        </div>
      )}

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-hidden py-4"
          style={{ scrollBehavior: "auto" }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-lg border bg-white/50 px-4 py-2 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-hdg-dark-800/50"
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="h-auto max-h-12 w-auto max-w-full object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  onError={(e) => {
                    // Fallback to text if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-sm font-medium text-muted-foreground text-center">${client.name}</span>`;
                    }
                  }}
                />
              ) : (
                <span className="text-center text-sm font-medium text-muted-foreground">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

