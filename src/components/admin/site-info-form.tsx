"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Building2, MapPin, Phone, Mail, Clock, User, Globe, FileText } from "lucide-react";
import type { SiteInfo } from "@/lib/db/schema";

interface SiteInfoFormProps {
  siteInfo: SiteInfo[];
  locale: string;
}

// Define the fields we want to edit
const infoFields = [
  { key: "company_name", label: "Company Name", icon: Building2, hasLocale: true },
  { key: "company_abbreviation", label: "Company Abbreviation", icon: Building2, hasLocale: true },
  { key: "office_address", label: "Office Address", icon: MapPin, hasLocale: true },
  { key: "registered_address", label: "Registered Address", icon: MapPin, hasLocale: true },
  { key: "phone", label: "Phone", icon: Phone, hasLocale: false },
  { key: "email", label: "Email", icon: Mail, hasLocale: false },
  { key: "website", label: "Website", icon: Globe, hasLocale: false },
  { key: "map_url", label: "Google Maps Embed URL", icon: MapPin, hasLocale: false },
  { key: "working_hours", label: "Working Hours", icon: Clock, hasLocale: true },
  { key: "legal_representative", label: "Legal Representative", icon: User, hasLocale: true },
  { key: "company_profile_url", label: "Company Profile URL", icon: FileText, hasLocale: false },
];

export function SiteInfoForm({ siteInfo, locale }: SiteInfoFormProps) {
  const router = useRouter();
  const t = useTranslations("admin.information");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convert array to map for easier access
  const infoMap = siteInfo.reduce(
    (acc, info) => {
      acc[info.key] = info;
      return acc;
    },
    {} as Record<string, SiteInfo>
  );

  // State for form values
  const [formData, setFormData] = useState<Record<string, {
    valueVi: string;
    valueEn: string;
    valueZh: string;
    valuePlain: string;
  }>>(
    infoFields.reduce((acc, field) => {
      const info = infoMap[field.key];
      acc[field.key] = {
        valueVi: info?.valueVi || "",
        valueEn: info?.valueEn || "",
        valueZh: info?.valueZh || "",
        valuePlain: info?.valuePlain || "",
      };
      return acc;
    }, {} as Record<string, { valueVi: string; valueEn: string; valueZh: string; valuePlain: string }>)
  );

  const handleChange = (
    key: string,
    field: "valueVi" | "valueEn" | "valueZh" | "valuePlain",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const items = Object.entries(formData).map(([key, values]) => ({
        key,
        ...values,
      }));

      const response = await fetch("/api/admin/site-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });

      if (!response.ok) throw new Error("Failed to save site info");

      toast.success(t("saveSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Save error:", error);
      toast.error(t("saveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t("contact.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {infoFields
            .filter((f) => !f.hasLocale)
            .map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key} className="flex items-center gap-2">
                  <field.icon className="h-4 w-4 text-muted-foreground" />
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  value={formData[field.key]?.valuePlain || ""}
                  onChange={(e) =>
                    handleChange(field.key, "valuePlain", e.target.value)
                  }
                />
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Localized Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t("localized.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vi">
            <TabsList className="mb-4">
              <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="zh">中文</TabsTrigger>
            </TabsList>

            {(["vi", "en", "zh"] as const).map((lang) => (
              <TabsContent key={lang} value={lang} className="space-y-4">
                {infoFields
                  .filter((f) => f.hasLocale)
                  .map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label
                        htmlFor={`${field.key}-${lang}`}
                        className="flex items-center gap-2"
                      >
                        <field.icon className="h-4 w-4 text-muted-foreground" />
                        {field.label}
                      </Label>
                      <Input
                        id={`${field.key}-${lang}`}
                        value={
                          formData[field.key]?.[
                            lang === "vi"
                              ? "valueVi"
                              : lang === "zh"
                                ? "valueZh"
                                : "valueEn"
                          ] || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            field.key,
                            lang === "vi"
                              ? "valueVi"
                              : lang === "zh"
                                ? "valueZh"
                                : "valueEn",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          t("save")
        )}
      </Button>
    </form>
  );
}

