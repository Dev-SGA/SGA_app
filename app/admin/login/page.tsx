import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AuthShell } from "@/components/AuthShell";
import { getAdminLoginHint } from "@/lib/admin-hints";

export default function AdminLoginPage() {
  const hint = getAdminLoginHint();

  return (
    <AuthShell title="Staff sign in" subtitle="Access every athlete registration.">
      <AdminLoginForm usernameHint={hint.username} passwordHint={hint.passwordHint} />
    </AuthShell>
  );
}
