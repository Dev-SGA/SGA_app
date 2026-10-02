import Link from "next/link";
import type { TacticalTest } from "@/lib/tests";

type TestCardProps = {
  test: TacticalTest;
};

export function TestCard({ test }: TestCardProps) {
  return (
    <article className="test-card">
      <p className="test-card__phase">{test.phase}</p>
      <h2 className="test-card__title">{test.title}</h2>
      <p className="test-card__intro">{test.intro}</p>
      <div className="test-card__meta">
        <span>{test.questions.length} situações</span>
        <span>~{test.durationMinutes} min</span>
      </div>
      <Link href={`/tests/${test.slug}`} className="btn btn--primary test-card__cta">
        Iniciar teste
      </Link>
    </article>
  );
}
