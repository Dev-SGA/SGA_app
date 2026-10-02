import { redirect } from "next/navigation";
import { AccountActions } from "@/components/AccountActions";
import { AuthShell } from "@/components/AuthShell";
import { getAthleteById } from "@/lib/athletes";
import { getSession } from "@/lib/session";

export default async function AccountPage() {
  const session = await getSession();
  if (!session || session.role !== "athlete" || !session.athleteId) {
    redirect("/login");
  }

  const athlete = await getAthleteById(session.athleteId);
  if (!athlete) {
    redirect("/login");
  }

  return (
    <AuthShell title={`Welcome, ${athlete.name}`} subtitle="Your registration is saved with SGA Performance.">
      <dl className="account-details">
        <div>
          <dt>Name</dt>
          <dd>{athlete.name}</dd>
        </div>
        <div>
          <dt>Club</dt>
          <dd>{athlete.club}</dd>
        </div>
        <div>
          <dt>Year of birth</dt>
          <dd>{athlete.birthYear}</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>{athlete.contact}</dd>
        </div>
        {athlete.message ? (
          <div>
            <dt>Message</dt>
            <dd>{athlete.message}</dd>
          </div>
        ) : null}
      </dl>
      <AccountActions />
    </AuthShell>
  );
}
