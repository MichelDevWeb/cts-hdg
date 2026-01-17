"use client";

import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="flex items-center justify-center">
          <div className="relative">
            <span className="font-heading text-[150px] font-bold text-hdg-blue-100 md:text-[200px]">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-20 w-20 text-hdg-blue-500/50 md:h-28 md:w-28" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md">
        <h1 className="mb-4 font-heading text-2xl font-bold text-hdg-dark-700 md:text-3xl">
          Page Not Found
        </h1>
        <p className="mb-8 text-muted-foreground">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button className="w-full bg-hdg-blue-500 hover:bg-hdg-blue-600 sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -left-20 top-1/4 h-40 w-40 rounded-full bg-hdg-blue-100/50 blur-3xl" />
      <div className="absolute -right-20 bottom-1/4 h-40 w-40 rounded-full bg-hdg-blue-100/50 blur-3xl" />
    </div>
  );
}
