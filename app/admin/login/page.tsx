import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AuthShell } from "@/components/AuthShell";

export default function AdminLoginPage() {
  return (
    <AuthShell title="Staff sign in" subtitle="Access every athlete registration.">
      <AdminLoginForm />
    </AuthShell>
  );
}
