"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "@/lib/i18n/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, AlertCircle, CheckCircle, Mail, Lock } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const onResetPassword = async (data: ResetPasswordFormData) => {
    setResetPasswordLoading(true);
    setResetPasswordError(null);
    setResetPasswordSuccess(false);

    // Get current locale from pathname
    const pathname = window.location.pathname;
    const localeMatch = pathname.match(/^\/(vi|en|zh)/);
    const locale = localeMatch ? localeMatch[1] : "en";

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        redirectTo: `${window.location.origin}/${locale}/reset-password`,
      }
    );

    if (resetError) {
      setResetPasswordError(resetError.message);
      setResetPasswordLoading(false);
      return;
    }

    setResetPasswordSuccess(true);
    setResetPasswordLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="HDG Logo"
              width={64}
              height={64}
              className="h-16 w-16"
              priority
            />
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-heading">Welcome Back</CardTitle>
            <CardDescription>Sign in to access the admin dashboard</CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@hdg.vn"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-xs text-hdg-blue-600 hover:text-hdg-blue-700 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-hdg-blue-500" />
                        Reset Password
                      </DialogTitle>
                      <DialogDescription>
                        Enter your email address and we&apos;ll send you a link to reset your password.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitReset(onResetPassword)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="admin@hdg.vn"
                          {...registerReset("email")}
                          className={resetErrors.email ? "border-destructive" : ""}
                        />
                        {resetErrors.email && (
                          <p className="text-sm text-destructive">
                            {resetErrors.email.message}
                          </p>
                        )}
                      </div>

                      {resetPasswordError && (
                        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          {resetPasswordError}
                        </div>
                      )}

                      {resetPasswordSuccess && (
                        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                          <CheckCircle className="h-4 w-4" />
                          Password reset email sent! Please check your inbox.
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-hdg-blue-500 hover:bg-hdg-blue-600"
                        disabled={resetPasswordLoading || resetPasswordSuccess}
                      >
                        {resetPasswordLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : resetPasswordSuccess ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Email Sent
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Reset Link
                          </>
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-hdg-blue-500 hover:bg-hdg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <Link href="/" className="w-full">
              <Button
                type="button"
                variant="outline"
                className="w-full"
              >
                Back to Site Home
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
