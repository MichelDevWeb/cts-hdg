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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Upload, X, Loader2, Plus, FolderOpen, Users, Link as LinkIcon } from "lucide-react";
import type { TeamMember } from "@/lib/db/schema";
import { ImageBrowser } from "./image-browser";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roleVi: z.string().min(1, "Vietnamese role is required"),
  roleEn: z.string().min(1, "English role is required"),
  roleZh: z.string().min(1, "Chinese role is required"),
  bioVi: z.string().optional(),
  bioEn: z.string().optional(),
  bioZh: z.string().optional(),
  educationVi: z.string().optional(),
  educationEn: z.string().optional(),
  educationZh: z.string().optional(),
  certificationsVi: z.array(z.string()).optional(),
  certificationsEn: z.array(z.string()).optional(),
  certificationsZh: z.array(z.string()).optional(),
  photo: z.string().nullable().optional(),
  orderIndex: z.coerce.number().default(0),
  active: z.boolean().default(true),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamMemberFormProps {
  member?: TeamMember;
  locale: string;
}

export function TeamMemberForm({ member, locale }: TeamMemberFormProps) {
  const router = useRouter();
  const t = useTranslations("admin.team");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState<string | null>(member?.photo || null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showImageBrowser, setShowImageBrowser] = useState(false);

  // State for certifications
  const [certificationsVi, setCertificationsVi] = useState<string[]>(
    member?.certificationsVi || []
  );
  const [certificationsEn, setCertificationsEn] = useState<string[]>(
    member?.certificationsEn || []
  );
  const [certificationsZh, setCertificationsZh] = useState<string[]>(
    member?.certificationsZh || []
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: member?.name || "",
      roleVi: member?.roleVi || "",
      roleEn: member?.roleEn || "",
      roleZh: member?.roleZh || "",
      bioVi: member?.bioVi || "",
      bioEn: member?.bioEn || "",
      bioZh: member?.bioZh || "",
      educationVi: member?.educationVi || "",
      educationEn: member?.educationEn || "",
      educationZh: member?.educationZh || "",
      certificationsVi: member?.certificationsVi || [],
      certificationsEn: member?.certificationsEn || [],
      certificationsZh: member?.certificationsZh || [],
      photo: member?.photo || null,
      orderIndex: member?.orderIndex || 0,
      active: member?.active ?? true,
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "team");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setPhoto(data.url);
      setValue("photo", data.url);
      toast.success("Photo uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setValue("photo", null);
  };

  const handleImageUrlSubmit = () => {
    if (imageUrlInput.trim()) {
      setPhoto(imageUrlInput.trim());
      setValue("photo", imageUrlInput.trim());
      setImageUrlInput("");
      setShowUrlInput(false);
      toast.success("Image URL set successfully");
    }
  };

  const addCertification = (
    lang: "vi" | "en" | "zh",
    value: string
  ) => {
    if (!value.trim()) return;
    
    switch (lang) {
      case "vi":
        const newViCerts = [...certificationsVi, value.trim()];
        setCertificationsVi(newViCerts);
        setValue("certificationsVi", newViCerts);
        break;
      case "en":
        const newEnCerts = [...certificationsEn, value.trim()];
        setCertificationsEn(newEnCerts);
        setValue("certificationsEn", newEnCerts);
        break;
      case "zh":
        const newZhCerts = [...certificationsZh, value.trim()];
        setCertificationsZh(newZhCerts);
        setValue("certificationsZh", newZhCerts);
        break;
    }
  };

  const removeCertification = (lang: "vi" | "en" | "zh", index: number) => {
    switch (lang) {
      case "vi":
        const newViCerts = certificationsVi.filter((_, i) => i !== index);
        setCertificationsVi(newViCerts);
        setValue("certificationsVi", newViCerts);
        break;
      case "en":
        const newEnCerts = certificationsEn.filter((_, i) => i !== index);
        setCertificationsEn(newEnCerts);
        setValue("certificationsEn", newEnCerts);
        break;
      case "zh":
        const newZhCerts = certificationsZh.filter((_, i) => i !== index);
        setCertificationsZh(newZhCerts);
        setValue("certificationsZh", newZhCerts);
        break;
    }
  };

  const onSubmit = async (data: TeamMemberFormData) => {
    setIsSubmitting(true);
    try {
      const url = member
        ? `/api/admin/team/${member.id}`
        : "/api/admin/team";
      const method = member ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          photo,
          certificationsVi,
          certificationsEn,
          certificationsZh,
        }),
      });

      if (!response.ok) throw new Error("Failed to save team member");

      toast.success(t("form.saveSuccess"));
      router.push(`/${locale}/admin-team`);
      router.refresh();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save team member");
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
          setPhoto(url);
          setValue("photo", url);
          setShowImageBrowser(false);
        }}
        folder="team"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
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

                <div className="grid gap-4 sm:grid-cols-2">
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

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="active">{t("form.active")}</Label>
                      <p className="text-sm text-muted-foreground">
                        Show this member on the website
                      </p>
                    </div>
                    <Switch
                      id="active"
                      checked={watch("active")}
                      onCheckedChange={(checked) => setValue("active", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Roles */}
            <Card>
              <CardHeader>
                <CardTitle>Role / Position</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vi">
                  <TabsList className="mb-4">
                    <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="zh">中文</TabsTrigger>
                  </TabsList>
                  <TabsContent value="vi">
                    <div className="space-y-2">
                      <Label htmlFor="roleVi">{t("form.roleVi")}</Label>
                      <Input
                        id="roleVi"
                        {...register("roleVi")}
                      />
                      {errors.roleVi && (
                        <p className="text-sm text-destructive">
                          {errors.roleVi.message}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="en">
                    <div className="space-y-2">
                      <Label htmlFor="roleEn">{t("form.roleEn")}</Label>
                      <Input
                        id="roleEn"
                        {...register("roleEn")}
                      />
                      {errors.roleEn && (
                        <p className="text-sm text-destructive">
                          {errors.roleEn.message}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="zh">
                    <div className="space-y-2">
                      <Label htmlFor="roleZh">{t("form.roleZh")}</Label>
                      <Input
                        id="roleZh"
                        {...register("roleZh")}
                      />
                      {errors.roleZh && (
                        <p className="text-sm text-destructive">
                          {errors.roleZh.message}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Bio & Education */}
            <Card>
              <CardHeader>
                <CardTitle>Bio & Education</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vi">
                  <TabsList className="mb-4">
                    <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="zh">中文</TabsTrigger>
                  </TabsList>
                  <TabsContent value="vi" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bioVi">{t("form.bioVi")}</Label>
                      <Textarea
                        id="bioVi"
                        rows={3}
                        {...register("bioVi")}
                      />
                      {errors.bioVi && (
                        <p className="text-sm text-destructive">
                          {errors.bioVi.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="educationVi">{t("form.educationVi")}</Label>
                      <Input
                        id="educationVi"
                        {...register("educationVi")}
                      />
                      {errors.educationVi && (
                        <p className="text-sm text-destructive">
                          {errors.educationVi.message}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="en" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bioEn">{t("form.bioEn")}</Label>
                      <Textarea
                        id="bioEn"
                        rows={3}
                        {...register("bioEn")}
                      />
                      {errors.bioEn && (
                        <p className="text-sm text-destructive">
                          {errors.bioEn.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="educationEn">{t("form.educationEn")}</Label>
                      <Input
                        id="educationEn"
                        {...register("educationEn")}
                      />
                      {errors.educationEn && (
                        <p className="text-sm text-destructive">
                          {errors.educationEn.message}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="zh" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bioZh">{t("form.bioZh")}</Label>
                      <Textarea
                        id="bioZh"
                        rows={3}
                        {...register("bioZh")}
                      />
                      {errors.bioZh && (
                        <p className="text-sm text-destructive">
                          {errors.bioZh.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="educationZh">{t("form.educationZh")}</Label>
                      <Input
                        id="educationZh"
                        {...register("educationZh")}
                      />
                      {errors.educationZh && (
                        <p className="text-sm text-destructive">
                          {errors.educationZh.message}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vi">
                  <TabsList className="mb-4">
                    <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="zh">中文</TabsTrigger>
                  </TabsList>
                  <TabsContent value="vi">
                    <CertificationList
                      certifications={certificationsVi}
                      onAdd={(value) => addCertification("vi", value)}
                      onRemove={(index) => removeCertification("vi", index)}
                      label={t("form.certificationsVi")}
                    />
                  </TabsContent>
                  <TabsContent value="en">
                    <CertificationList
                      certifications={certificationsEn}
                      onAdd={(value) => addCertification("en", value)}
                      onRemove={(index) => removeCertification("en", index)}
                      label={t("form.certificationsEn")}
                    />
                  </TabsContent>
                  <TabsContent value="zh">
                    <CertificationList
                      certifications={certificationsZh}
                      onAdd={(value) => addCertification("zh", value)}
                      onRemove={(index) => removeCertification("zh", index)}
                      label={t("form.certificationsZh")}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Photo */}
            <Card>
              <CardHeader>
                <CardTitle>{t("form.photo")}</CardTitle>
              </CardHeader>
              <CardContent>
                {photo ? (
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={photo}
                      alt="Team member photo"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={handleRemovePhoto}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={uploadingPhoto}
                      />
                      {uploadingPhoto ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="mt-2 text-sm text-muted-foreground">
                            Upload photo
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
                          placeholder="Enter image URL"
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

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Team Member"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

// Certification List Component
function CertificationList({
  certifications,
  onAdd,
  onRemove,
  label,
}: {
  certifications: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  label: string;
}) {
  const [newCert, setNewCert] = useState("");

  const handleAdd = () => {
    if (newCert.trim()) {
      onAdd(newCert);
      setNewCert("");
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Input
          value={newCert}
          onChange={(e) => setNewCert(e.target.value)}
          placeholder="Add certification..."
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
      {certifications.length > 0 && (
        <ul className="space-y-2">
          {certifications.map((cert, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm"
            >
              <span className="flex-1">{cert}</span>
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

