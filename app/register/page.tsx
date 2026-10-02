import { AuthShell } from "@/components/AuthShell";
import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Athlete registration"
      subtitle="Create your account so SGA Performance can follow up with you."
    >
      <RegisterForm />
    </AuthShell>
  );
}
