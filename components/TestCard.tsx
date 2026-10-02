import Link from "next/link";
import { PitchGraphic } from "@/components/PitchGraphic";
import { phaseTone, testVisual } from "@/lib/phases";
import type { TacticalTest } from "@/lib/tests";

type TestCardProps = {
  test: TacticalTest;
  highlight?: boolean;
};

export function TestCard({ test, highlight = false }: TestCardProps) {
  return (
    <Link href={`/tests/${test.slug}`} className={`test-card${highlight ? " test-card--yours" : ""}`}>
      <div className="test-card__visual">
        <PitchGraphic variant={testVisual(test.slug)} label={`${test.title} diagram`} />
      </div>
      <div className="test-card__body">
        <div className="test-card__meta">
          <span className={`chip chip--${phaseTone(test.phase)}`}>{test.phase}</span>
          {highlight ? <span className="chip chip--gold">Your position test</span> : null}
          <span className="test-card__duration">~{test.durationMinutes} min</span>
        </div>
        <h3 className="test-card__title">{test.title}</h3>
        <p className="test-card__intro">{test.intro}</p>
        <div className="test-card__footer">
          <span>{test.questions.length} scenarios</span>
          <span className="test-card__arrow" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
