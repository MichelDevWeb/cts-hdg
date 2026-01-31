import Link from "next/link";
import { Heart } from "lucide-react";

export function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>© {currentYear} HDG Construction Design Consulting</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> by{" "}
          <Link
            href="https://cheotechstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-hdg-blue-600 hover:text-hdg-blue-700 transition-colors"
          >
            CheoTechStudio
          </Link>
        </p>
      </div>
    </footer>
  );
}

