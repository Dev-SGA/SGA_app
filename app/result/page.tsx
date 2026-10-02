import { ResultView } from "@/components/ResultView";
import { SiteShell } from "@/components/SiteShell";

type ResultPageProps = {
  searchParams: Promise<{ test?: string }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const { test } = await searchParams;

  return (
    <SiteShell
      eyebrow="Your result"
      title="Tactical profile"
      meta="Your score reflects the quality of your decisions across every scenario in this test."
    >
      <ResultView testSlug={test} />
    </SiteShell>
  );
}
