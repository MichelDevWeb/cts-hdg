"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X, Loader2, FolderOpen, Building2, Link as LinkIcon, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Client } from "@/lib/db/schema";
import { ImageBrowser } from "./image-browser";

const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logoUrl: z.string().nullable().optional(),
  website: z.string().url().optional().or(z.literal("")),
  category: z.string().default("other"),
  orderIndex: z.coerce.number().default(0),
  active: z.boolean().default(true),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  client?: Client;
  locale: string;
}

const clientCategories = [
  { value: "japanese", label: "Japanese Companies" },
  { value: "multinational", label: "Multinational Corporations" },
  { value: "construction", label: "Construction & Engineering" },
  { value: "developer", label: "Real Estate Developers" },
  { value: "other", label: "Other" },
];

export function ClientForm({ client, locale }: ClientFormProps) {
  const router = useRouter();
  const t = useTranslations("admin.clients");
  const tCommon = useTranslations("common.toast");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logo, setLogo] = useState<string | null>(client?.logoUrl || null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showImageBrowser, setShowImageBrowser] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      logoUrl: client?.logoUrl || null,
      website: client?.website || "",
      category: client?.category || "other",
      orderIndex: client?.orderIndex || 0,
      active: client?.active ?? true,
    },
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "clients");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setLogo(data.url);
      setValue("logoUrl", data.url);
      toast.success(tCommon("uploadSuccess"));
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(tCommon("uploadError"));
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setValue("logoUrl", null);
  };

  const handleImageUrlSubmit = () => {
    if (imageUrlInput.trim()) {
      setLogo(imageUrlInput.trim());
      setValue("logoUrl", imageUrlInput.trim());
      setImageUrlInput("");
      setShowUrlInput(false);
      toast.success(tCommon("urlSetSuccess"));
    }
  };

  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true);
    try {
      const url = client
        ? `/api/admin/clients/${client.id}`
        : "/api/admin/clients";
      const method = client ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          logoUrl: logo,
        }),
      });

      if (!response.ok) throw new Error("Failed to save client");

      toast.success(tCommon("saveSuccess"));
      router.push(`/${locale}/admin-clients`);
      router.refresh();
    } catch (error) {
      console.error("Save error:", error);
      toast.error(tCommon("saveError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ImageBrowser
        open={showImageBrowser}
        onOpenChange={setShowImageBrowser}
        onSelect={(url) => {
          setLogo(url);
          setValue("logoUrl", url);
          setShowImageBrowser(false);
        }}
        folder="clients"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/admin-clients`}>
            <Button type="button" variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1" />
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Client"
            )}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("form.name")}</Label>
                  <Input
                    id="name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">{t("form.website")}</Label>
                  <Input
                    id="website"
                    {...register("website")}
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive">
                      {errors.website.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">{t("form.category")}</Label>
                    <Select
                      onValueChange={(value) => setValue("category", value)}
                      defaultValue={watch("category")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orderIndex">{t("form.orderIndex")}</Label>
                    <Input
                      id="orderIndex"
                      type="number"
                      {...register("orderIndex")}
                    />
                    {errors.orderIndex && (
                      <p className="text-sm text-destructive">
                        {errors.orderIndex.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="active">{t("form.active")}</Label>
                    <p className="text-sm text-muted-foreground">
                      Show this client on the website
                    </p>
                  </div>
                  <Switch
                    id="active"
                    checked={watch("active")}
                    onCheckedChange={(checked) => setValue("active", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Logo */}
            <Card>
              <CardHeader>
                <CardTitle>Logo</CardTitle>
              </CardHeader>
              <CardContent>
                {logo ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border bg-white">
                    <Image
                      src={logo}
                      alt="Client logo"
                      fill
                      className="object-contain p-4"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={handleRemoveLogo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                        disabled={uploadingLogo}
                      />
                      {uploadingLogo ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="mt-2 text-sm text-muted-foreground">
                            Upload logo
                          </span>
                        </>
                      )}
                    </label>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowImageBrowser(true)}
                    >
                      <FolderOpen className="mr-2 h-4 w-4" />
                      Select from Storage
                    </Button>

                    {showUrlInput ? (
                      <div className="flex gap-2">
                        <Input
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          placeholder="Enter logo URL"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleImageUrlSubmit}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowUrlInput(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowUrlInput(true)}
                      >
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Enter URL
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
}

