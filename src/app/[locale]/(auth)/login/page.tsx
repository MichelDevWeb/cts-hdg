import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login | HDG Admin",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-2xl font-bold text-secondary-foreground">
            HDG
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Admin Login
          </h1>
          <p className="text-primary-200">
            Sign in to access the admin dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

