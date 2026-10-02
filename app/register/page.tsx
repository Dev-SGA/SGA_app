import { AuthShell } from "@/components/AuthShell";
import { RegisterForm } from "@/components/RegisterForm";
import { safeRedirectPath } from "@/lib/safe-redirect";

type RegisterPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { next } = await searchParams;
  const redirectTo = safeRedirectPath(next);
  const needsTestAccess = redirectTo.startsWith("/tests/") || redirectTo.startsWith("/result");

  return (
    <AuthShell
      title="Athlete registration"
      subtitle={
        needsTestAccess
          ? "Create your account to take the tactical test — we’ll send you straight to it after sign-up."
          : "Create your account with your position. We email SGA product recommendations when you use an email contact."
      }
    >
      <RegisterForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
