"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, Download, ExternalLink } from "lucide-react";

interface CompanyProfileDialogProps {
  pdfUrl?: string;
}

export function CompanyProfileDialog({
  pdfUrl = "/documents/hdg-company-profile.pdf",
}: CompanyProfileDialogProps) {
  const t = useTranslations("about");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
        >
          <FileText className="h-5 w-5" />
          {t("companyProfile")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>{t("companyProfile")}</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-2"
              >
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden sm:inline">Open in new tab</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-2"
              >
                <a href={pdfUrl} download>
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 rounded-lg overflow-hidden border bg-muted/50">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full"
            title={t("companyProfile")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

