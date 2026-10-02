import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { TacticalQuiz } from "@/components/TacticalQuiz";
import { getTestBySlug } from "@/lib/tests";

type TestPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TestPage({ params }: TestPageProps) {
  const { slug } = await params;
  const test = getTestBySlug(slug);
  if (!test) notFound();

  return (
    <SiteShell
      eyebrow={test.phase}
      title={test.title}
      meta={`${test.questions.length} situações · ~${test.durationMinutes} min`}
    >
      <p className="test-intro">{test.intro}</p>
      <TacticalQuiz test={test} />
    </SiteShell>
  );
}
