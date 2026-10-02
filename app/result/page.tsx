import { SiteShell } from "@/components/SiteShell";
import { ResultView } from "@/components/ResultView";

type ResultPageProps = {
  searchParams: Promise<{ test?: string }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const { test } = await searchParams;

  return (
    <SiteShell
      eyebrow="Your result"
      title="Profile & products"
      meta="Use this summary with the SGA team or in your scouting materials."
    >
      <ResultView testSlug={test} />
    </SiteShell>
  );
}
