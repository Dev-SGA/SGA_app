import { AuthShell } from "@/components/AuthShell";
import { AdminAthletesPanel } from "@/components/AdminAthletesPanel";

export default function AdminPage() {
  return (
    <AuthShell wide title="Athlete registrations" subtitle="All sign-ups from the tactical test app.">
      <AdminAthletesPanel />
    </AuthShell>
  );
}
