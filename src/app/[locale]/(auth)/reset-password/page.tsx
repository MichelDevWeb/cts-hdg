import { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reset Password | HDG Admin",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-hdg-dark-900 via-hdg-dark-800 to-hdg-blue-900 p-4">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
}

