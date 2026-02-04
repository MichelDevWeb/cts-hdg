"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Loader2, Plus, FolderOpen, ArrowLeft, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/db/schema";
import { ImageBrowser } from "./image-browser";

const projectSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  titleVi: z.string().min(1, "Vietnamese title is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleZh: z.string().min(1, "Chinese title is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  year: z.number().min(1900).max(2100),
  client: z.string().optional(),
  scale: z.string().optional(),
  summaryVi: z.string().optional(),
  summaryEn: z.string().optional(),
  summaryZh: z.string().optional(),
  contentVi: z.string().optional(),
  contentEn: z.string().optional(),
  contentZh: z.string().optional(),
  services: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  orderIndex: z.coerce.number().default(0),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const categories = [
  { value: "industrial", label: "Industrial" },
  { value: "commercial", label: "Commercial" },
  { value: "residential", label: "Residential" },
  { value: "infrastructure", label: "Infrastructure" },
];

const serviceOptions = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "integrated", label: "Integrated Solutions" },
];

interface ProjectFormProps {
  project?: Project;
  locale: string;
  onSuccess?: () => void;
}

export function ProjectForm({ project, locale, onSuccess }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(
    project?.coverImage || null
  );
  const [gallery, setGallery] = useState<string[]>(project?.gallery || []);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [showCoverBrowser, setShowCoverBrowser] = useState(false);
  const [showGalleryBrowser, setShowGalleryBrowser] = useState(false);
  const [coverImageUrlInput, setCoverImageUrlInput] = useState("");
  const [showCoverUrlInput, setShowCoverUrlInput] = useState(false);
  const [galleryImageUrlInput, setGalleryImageUrlInput] = useState("");
  const [showGalleryUrlInput, setShowGalleryUrlInput] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      slug: project?.slug || "",
      titleVi: project?.titleVi || "",
      titleEn: project?.titleEn || "",
      titleZh: project?.titleZh || "",
      category: project?.category || "",
      location: project?.location || "",
      year: project?.year || new Date().getFullYear(),
      client: project?.client || "",
      scale: project?.scale || "",
      summaryVi: project?.summaryVi || "",
      summaryEn: project?.summaryEn || "",
      summaryZh: project?.summaryZh || "",
      contentVi: project?.contentVi || "",
      contentEn: project?.contentEn || "",
      contentZh: project?.contentZh || "",
      services: project?.services || [],
      featured: project?.featured || false,
      published: project?.published || false,
      orderIndex: project?.orderIndex || 0,
    },
  });

  const selectedServices = watch("services");
  const featured = watch("featured");
  const published = watch("published");

  const handleImageUpload = async (
    file: File,
    type: "cover" | "gallery"
  ): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "projects");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const url = await handleImageUpload(file, "cover");
    if (url) {
      setCoverImage(url);
    }
    setUploadingCover(false);
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingGallery(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const url = await handleImageUpload(files[i], "gallery");
      if (url) {
        newImages.push(url);
      }
    }

    setGallery((prev) => [...prev, ...newImages]);
    setUploadingGallery(false);
  };

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCoverImageUrlSubmit = () => {
    if (coverImageUrlInput.trim()) {
      setCoverImage(coverImageUrlInput.trim());
      setCoverImageUrlInput("");
      setShowCoverUrlInput(false);
    }
  };

  const handleGalleryImageUrlSubmit = () => {
    if (galleryImageUrlInput.trim()) {
      setGallery((prev) => [...prev, galleryImageUrlInput.trim()]);
      setGalleryImageUrlInput("");
      setShowGalleryUrlInput(false);
    }
  };

  const toggleService = (service: string) => {
    const current = selectedServices || [];
    if (current.includes(service)) {
      setValue(
        "services",
        current.filter((s) => s !== service)
      );
    } else {
      setValue("services", [...current, service]);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);

    try {
      const payload = {
        ...data,
        coverImage,
        gallery,
      };

      const url = project
        ? `/api/admin/projects/${project.id}`
        : "/api/admin/projects";
      const method = project ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(`/${locale}/admin-projects`);
        }
        router.refresh();
      } else {
        console.error("Error saving project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/admin-projects`}>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {project ? "Update" : "Create"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    {...register("slug")}
                    placeholder="project-slug"
                  />
                  {errors.slug && (
                    <p className="text-sm text-destructive">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    {...register("year", { valueAsNumber: true })}
                  />
                  {errors.year && (
                    <p className="text-sm text-destructive">
                      {errors.year.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={watch("category")}
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
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
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...register("location")}
                    placeholder="Ho Chi Minh City"
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    {...register("client")}
                    placeholder="Client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scale">Scale</Label>
                  <Input
                    id="scale"
                    {...register("scale")}
                    placeholder="e.g., 20,000 sqm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Services</Label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => (
                    <Button
                      key={service.value}
                      type="button"
                      variant={
                        selectedServices?.includes(service.value)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleService(service.value)}
                    >
                      {service.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Titles */}
          <Card>
            <CardHeader>
              <CardTitle>Titles</CardTitle>
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
                    <Label htmlFor="titleVi">Vietnamese Title *</Label>
                    <Input id="titleVi" {...register("titleVi")} />
                    {errors.titleVi && (
                      <p className="text-sm text-destructive">
                        {errors.titleVi.message}
                      </p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="en">
                  <div className="space-y-2">
                    <Label htmlFor="titleEn">English Title *</Label>
                    <Input id="titleEn" {...register("titleEn")} />
                    {errors.titleEn && (
                      <p className="text-sm text-destructive">
                        {errors.titleEn.message}
                      </p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="zh">
                  <div className="space-y-2">
                    <Label htmlFor="titleZh">Chinese Title *</Label>
                    <Input id="titleZh" {...register("titleZh")} />
                    {errors.titleZh && (
                      <p className="text-sm text-destructive">
                        {errors.titleZh.message}
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Summaries */}
          <Card>
            <CardHeader>
              <CardTitle>Summaries</CardTitle>
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
                    <Label htmlFor="summaryVi">Vietnamese Summary</Label>
                    <Textarea id="summaryVi" {...register("summaryVi")} rows={3} />
                  </div>
                </TabsContent>
                <TabsContent value="en">
                  <div className="space-y-2">
                    <Label htmlFor="summaryEn">English Summary</Label>
                    <Textarea id="summaryEn" {...register("summaryEn")} rows={3} />
                  </div>
                </TabsContent>
                <TabsContent value="zh">
                  <div className="space-y-2">
                    <Label htmlFor="summaryZh">Chinese Summary</Label>
                    <Textarea id="summaryZh" {...register("summaryZh")} rows={3} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
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
                    <Label htmlFor="contentVi">Vietnamese Content</Label>
                    <Textarea id="contentVi" {...register("contentVi")} rows={6} />
                  </div>
                </TabsContent>
                <TabsContent value="en">
                  <div className="space-y-2">
                    <Label htmlFor="contentEn">English Content</Label>
                    <Textarea id="contentEn" {...register("contentEn")} rows={6} />
                  </div>
                </TabsContent>
                <TabsContent value="zh">
                  <div className="space-y-2">
                    <Label htmlFor="contentZh">Chinese Content</Label>
                    <Textarea id="contentZh" {...register("contentZh")} rows={6} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={(checked) => setValue("published", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured</Label>
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={(checked) => setValue("featured", checked)}
                />
              </div>
              <div className="space-y-2 pt-2 border-t">
                <Label htmlFor="orderIndex">Order Index</Label>
                <Input
                  id="orderIndex"
                  type="number"
                  {...register("orderIndex")}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first. Default: 0
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
              {coverImage ? (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => setCoverImage(null)}
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
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                    />
                    {uploadingCover ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="mt-2 text-sm text-muted-foreground">
                          Upload cover image
                        </span>
                      </>
                    )}
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowCoverBrowser(true)}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Select from Storage
                  </Button>

                  {showCoverUrlInput ? (
                    <div className="flex gap-2">
                      <Input
                        value={coverImageUrlInput}
                        onChange={(e) => setCoverImageUrlInput(e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleCoverImageUrlSubmit}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowCoverUrlInput(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowCoverUrlInput(true)}
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Enter URL
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-1 top-1 h-6 w-6"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleGalleryUpload}
                      disabled={uploadingGallery}
                    />
                    {uploadingGallery ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    )}
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowGalleryBrowser(true)}
                  >
                    <FolderOpen className="mr-1 h-3 w-3" />
                    Browse Storage
                  </Button>
                  {showGalleryUrlInput ? (
                    <div className="flex gap-1">
                      <Input
                        value={galleryImageUrlInput}
                        onChange={(e) => setGalleryImageUrlInput(e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1 text-xs h-8"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleGalleryImageUrlSubmit}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setShowGalleryUrlInput(false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setShowGalleryUrlInput(true)}
                    >
                      <LinkIcon className="mr-1 h-3 w-3" />
                      Enter URL
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Browsers */}
          <ImageBrowser
            open={showCoverBrowser}
            onOpenChange={setShowCoverBrowser}
            onSelect={(url) => {
              setCoverImage(url);
              setShowCoverBrowser(false);
            }}
            folder="projects"
          />
          <ImageBrowser
            open={showGalleryBrowser}
            onOpenChange={setShowGalleryBrowser}
            onSelect={(url) => {
              setGallery((prev) => [...prev, url]);
              setShowGalleryBrowser(false);
            }}
            folder="projects"
          />

        </div>
      </div>
    </form>
  );
}

