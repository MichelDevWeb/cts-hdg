"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSectionProps {
  className?: string;
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSection({
  className,
  message,
  size = "md",
}: LoadingSectionProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        containerClasses[size],
        className
      )}
    >
      <Loader2
        className={cn(
          "animate-spin text-hdg-blue-500",
          sizeClasses[size]
        )}
      />
      {message && (
        <p className="mt-4 text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
}

// Skeleton variants for different content types
export function LoadingCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg border bg-card p-6",
        className
      )}
    >
      <div className="h-4 w-3/4 rounded bg-muted" />
      <div className="mt-4 h-4 w-1/2 rounded bg-muted" />
      <div className="mt-6 h-24 rounded bg-muted" />
    </div>
  );
}

export function LoadingTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex gap-4 border-b pb-4">
        <div className="h-4 w-1/4 rounded bg-muted" />
        <div className="h-4 w-1/4 rounded bg-muted" />
        <div className="h-4 w-1/4 rounded bg-muted" />
        <div className="h-4 w-1/4 rounded bg-muted" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-4">
          <div className="h-4 w-1/4 rounded bg-muted" />
          <div className="h-4 w-1/4 rounded bg-muted" />
          <div className="h-4 w-1/4 rounded bg-muted" />
          <div className="h-4 w-1/4 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border bg-card overflow-hidden"
        >
          <div className="aspect-video bg-muted" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingTeamGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border bg-card overflow-hidden"
        >
          <div className="aspect-square bg-muted" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

