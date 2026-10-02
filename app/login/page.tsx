import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/components/LoginForm";
import { safeRedirectPath } from "@/lib/safe-redirect";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const redirectTo = safeRedirectPath(next);
  const needsTestAccess = redirectTo.startsWith("/tests/") || redirectTo.startsWith("/result");

  return (
    <AuthShell
      title="Athlete sign in"
      subtitle={
        needsTestAccess
          ? "Sign in to continue to your tactical test."
          : "Access your profile and continue your tactical journey with SGA."
      }
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
