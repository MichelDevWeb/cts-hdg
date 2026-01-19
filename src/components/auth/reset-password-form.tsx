"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "@/lib/i18n/navigation";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Check if we have a valid reset token and session
  useEffect(() => {
    const checkSession = async () => {
      setIsChecking(true);

      // Check for token in URL hash (Supabase sends it here)
      const hashParams = new URLSearchParams(
        window.location.hash.substring(1)
      );
      const accessToken = hashParams.get("access_token");
      const type = hashParams.get("type");

      // If we have a recovery token in the hash, Supabase will handle the session exchange
      if (accessToken && type === "recovery") {
        // Exchange the token for a session
        const { error: exchangeError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: hashParams.get("refresh_token") || "",
        });

        if (exchangeError) {
          setError(exchangeError.message);
          setIsValidToken(false);
          setIsChecking(false);
          return;
        }

        // Verify we have a valid session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          setError("Invalid or expired reset link. Please request a new one.");
        }
      } else {
        // Check if we already have a valid session (user might have refreshed the page)
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
          setError("No valid reset token found. Please request a new password reset link.");
        }
      }

      setIsChecking(false);

      // Clean up the hash from URL
      if (accessToken) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    checkSession();
  }, [supabase.auth]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    // Verify session is still valid
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("Your session has expired. Please request a new password reset link.");
      setIsLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (updateError) {
      setError(updateError.message);
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setIsLoading(false);

    // Sign out the recovery session
    await supabase.auth.signOut();

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  // Show loading state while checking token
  if (isChecking) {
    return (
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
            <CardTitle className="text-2xl font-heading">Verifying Link</CardTitle>
            <CardDescription>Please wait while we verify your reset link...</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-hdg-blue-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error if token is invalid
  if (isValidToken === false) {
    return (
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
            <CardTitle className="text-2xl font-heading">Invalid Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error || "Please request a new password reset link."}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-hdg-blue-500 hover:bg-hdg-blue-600">
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // Show success state
  if (isSuccess) {
    return (
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
            <CardTitle className="text-2xl font-heading flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Password Reset Successful
            </CardTitle>
            <CardDescription>
              Your password has been updated. Redirecting to login...
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle className="h-4 w-4" />
            You can now sign in with your new password.
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-hdg-blue-500 hover:bg-hdg-blue-600">
              Go to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // Show reset password form
  return (
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
          <CardTitle className="text-2xl font-heading flex items-center justify-center gap-2">
            <Lock className="h-5 w-5 text-hdg-blue-500" />
            Reset Password
          </CardTitle>
          <CardDescription>
            Enter your new password below. Make sure it&apos;s strong and secure.
          </CardDescription>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("password")}
                className={errors.password ? "border-destructive pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters with uppercase, lowercase, and a number
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
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
                Updating Password...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Update Password
              </>
            )}
          </Button>
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
