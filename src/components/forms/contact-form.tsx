"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { contactInfo } from "@/lib/data/mock-data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    // Get company email from contact info
    const companyEmail = contactInfo.email;
    
    // Build email subject
    const subject = encodeURIComponent(
      `Contact Form Submission from ${data.name}`
    );
    
    // Build email body
    const bodyParts = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
    ];
    
    if (data.phone) {
      bodyParts.push(`Phone: ${data.phone}`);
    }
    
    if (data.company) {
      bodyParts.push(`Company: ${data.company}`);
    }
    
    bodyParts.push("", "Message:", data.message);
    
    const body = encodeURIComponent(bodyParts.join("\n"));
    
    // Create mailto link
    const mailtoLink = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setStatus("success");
    reset();
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="mb-4 h-16 w-16 text-accent" />
        <h3 className="mb-2 font-heading text-xl font-semibold">{t("success")}</h3>
        <p className="text-muted-foreground">{t("successMessage")}</p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")} *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register("name")}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")} *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+84 xxx xxx xxx"
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">{t("company")}</Label>
          <Input
            id="company"
            placeholder="Company name"
            {...register("company")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("message")} *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project..."
          rows={6}
          {...register("message")}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg">
        {t("submit")}
      </Button>
    </form>
  );
}

