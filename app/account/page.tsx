import { redirect } from "next/navigation";
import { AccountActions } from "@/components/AccountActions";
import { AuthShell } from "@/components/AuthShell";
import { getAthleteById } from "@/lib/athletes";
import { positionLabel, testSlugForPosition } from "@/lib/positions";
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
    <AuthShell
      title={`Welcome, ${athlete.name.split(" ")[0]}`}
      subtitle="Your profile is registered with SGA Performance. Our team will reach out using your contact below."
    >
      <dl className="details">
        <div>
          <dt>Name</dt>
          <dd>{athlete.name}</dd>
        </div>
        <div>
          <dt>Club</dt>
          <dd>{athlete.club}</dd>
        </div>
        <div>
          <dt>Position</dt>
          <dd>{positionLabel(athlete.position)}</dd>
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
          <div className="details__full">
            <dt>Message</dt>
            <dd>{athlete.message}</dd>
          </div>
        ) : null}
      </dl>
      <AccountActions testHref={`/tests/${testSlugForPosition(athlete.position)}`} />
    </AuthShell>
  );
}
