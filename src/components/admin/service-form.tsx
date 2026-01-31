"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/lib/db/schema";
import { iconOptions } from "@/lib/utils";

interface ServiceFormProps {
  service?: Service;
  locale: string;
}

const serviceSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  nameVi: z.string().min(1, "Vietnamese name is required"),
  nameEn: z.string().min(1, "English name is required"),
  nameZh: z.string().min(1, "Chinese name is required"),
  descriptionVi: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionZh: z.string().optional(),
  icon: z.string().optional(),
  orderIndex: z.coerce.number().default(0),
  active: z.boolean().default(true),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export function ServiceForm({ service, locale }: ServiceFormProps) {
  const router = useRouter();
  const t = useTranslations("admin.services");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for features
  const [featuresVi, setFeaturesVi] = useState<string[]>(
    service?.featuresVi || []
  );
  const [featuresEn, setFeaturesEn] = useState<string[]>(
    service?.featuresEn || []
  );
  const [featuresZh, setFeaturesZh] = useState<string[]>(
    service?.featuresZh || []
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      slug: service?.slug || "",
      nameVi: service?.nameVi || "",
      nameEn: service?.nameEn || "",
      nameZh: service?.nameZh || "",
      descriptionVi: service?.descriptionVi || "",
      descriptionEn: service?.descriptionEn || "",
      descriptionZh: service?.descriptionZh || "",
      icon: service?.icon || "",
      orderIndex: service?.orderIndex || 0,
      active: service?.active ?? true,
    },
  });

  const isActive = watch("active");

  const addFeature = (lang: "vi" | "en" | "zh", value: string) => {
    if (!value.trim()) return;

    switch (lang) {
      case "vi":
        setFeaturesVi([...featuresVi, value.trim()]);
        break;
      case "en":
        setFeaturesEn([...featuresEn, value.trim()]);
        break;
      case "zh":
        setFeaturesZh([...featuresZh, value.trim()]);
        break;
    }
  };

  const removeFeature = (lang: "vi" | "en" | "zh", index: number) => {
    switch (lang) {
      case "vi":
        setFeaturesVi(featuresVi.filter((_, i) => i !== index));
        break;
      case "en":
        setFeaturesEn(featuresEn.filter((_, i) => i !== index));
        break;
      case "zh":
        setFeaturesZh(featuresZh.filter((_, i) => i !== index));
        break;
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      const url = service
        ? `/api/admin/services/${service.id}`
        : "/api/admin/services";
      const method = service ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          featuresVi,
          featuresEn,
          featuresZh,
        }),
      });

      if (!response.ok) throw new Error("Failed to save service");

      toast.success(t("form.saveSuccess"));
      router.push(`/${locale}/admin-services`);
      router.refresh();
    } catch (error) {
      console.error("Save error:", error);
      toast.error(t("form.saveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/admin-services`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1" />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Service"
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" {...register("slug")} />
                  {errors.slug && (
                    <p className="text-sm text-destructive">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderIndex">{t("form.orderIndex")}</Label>
                  <Input
                    id="orderIndex"
                    type="number"
                    {...register("orderIndex", { valueAsNumber: true })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">{t("form.icon")}</Label>
                <select
                  id="icon"
                  {...register("icon")}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">{t("form.selectIconPlaceholder")}</option>
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Names */}
          <Card>
            <CardHeader>
              <CardTitle>Service Name</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="en">
                <TabsList className="mb-4">
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="zh">中文</TabsTrigger>
                </TabsList>
                <TabsContent value="vi">
                  <div className="space-y-2">
                    <Label htmlFor="nameVi">{t("form.nameVi")}</Label>
                    <Input id="nameVi" {...register("nameVi")} />
                    {errors.nameVi && (
                      <p className="text-sm text-destructive">
                        {errors.nameVi.message}
                      </p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="en">
                  <div className="space-y-2">
                    <Label htmlFor="nameEn">{t("form.nameEn")}</Label>
                    <Input id="nameEn" {...register("nameEn")} />
                    {errors.nameEn && (
                      <p className="text-sm text-destructive">
                        {errors.nameEn.message}
                      </p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="zh">
                  <div className="space-y-2">
                    <Label htmlFor="nameZh">{t("form.nameZh")}</Label>
                    <Input id="nameZh" {...register("nameZh")} />
                    {errors.nameZh && (
                      <p className="text-sm text-destructive">
                        {errors.nameZh.message}
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Descriptions */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="en">
                <TabsList className="mb-4">
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="zh">中文</TabsTrigger>
                </TabsList>
                <TabsContent value="vi">
                  <div className="space-y-2">
                    <Label htmlFor="descriptionVi">
                      {t("form.descriptionVi")}
                    </Label>
                    <Textarea
                      id="descriptionVi"
                      {...register("descriptionVi")}
                      rows={3}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="en">
                  <div className="space-y-2">
                    <Label htmlFor="descriptionEn">
                      {t("form.descriptionEn")}
                    </Label>
                    <Textarea
                      id="descriptionEn"
                      {...register("descriptionEn")}
                      rows={3}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="zh">
                  <div className="space-y-2">
                    <Label htmlFor="descriptionZh">
                      {t("form.descriptionZh")}
                    </Label>
                    <Textarea
                      id="descriptionZh"
                      {...register("descriptionZh")}
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="en">
                <TabsList className="mb-4">
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="zh">中文</TabsTrigger>
                </TabsList>
                <TabsContent value="vi">
                  <FeatureList
                    features={featuresVi}
                    onAdd={(value) => addFeature("vi", value)}
                    onRemove={(index) => removeFeature("vi", index)}
                    label={t("form.featuresVi")}
                  />
                </TabsContent>
                <TabsContent value="en">
                  <FeatureList
                    features={featuresEn}
                    onAdd={(value) => addFeature("en", value)}
                    onRemove={(index) => removeFeature("en", index)}
                    label={t("form.featuresEn")}
                  />
                </TabsContent>
                <TabsContent value="zh">
                  <FeatureList
                    features={featuresZh}
                    onAdd={(value) => addFeature("zh", value)}
                    onRemove={(index) => removeFeature("zh", index)}
                    label={t("form.featuresZh")}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active</Label>
                <Switch
                  id="active"
                  checked={isActive}
                  onCheckedChange={(checked) => setValue("active", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}

// Feature List Component
function FeatureList({
  features,
  onAdd,
  onRemove,
  label,
}: {
  features: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  label: string;
}) {
  const [newFeature, setNewFeature] = useState("");

  const handleAdd = () => {
    if (newFeature.trim()) {
      onAdd(newFeature);
      setNewFeature("");
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Input
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Add feature..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button type="button" variant="outline" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm"
            >
              <span className="flex-1">{feature}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
