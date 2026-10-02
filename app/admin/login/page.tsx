import Link from "next/link";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AuthShell } from "@/components/AuthShell";

export default function AdminLoginPage() {
  return (
    <AuthShell title="Admin sign in" subtitle="View all athlete registrations.">
      <AdminLoginForm />
      <p className="auth-form__footer">
        <Link href="/" className="landing-text-link">
          ← Back to site
        </Link>
      </p>
    </AuthShell>
  );
}
