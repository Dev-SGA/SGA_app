import { LandingPage } from "@/components/LandingPage";
import { parseAthletePosition, testSlugForPosition } from "@/lib/positions";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const session = await getSession();
  let athleteTestSlug: string | undefined;
  if (session?.role === "athlete" && session.position) {
    const position = parseAthletePosition(session.position);
    if (position) athleteTestSlug = testSlugForPosition(position);
  }
  return <LandingPage athleteTestSlug={athleteTestSlug} />;
}
