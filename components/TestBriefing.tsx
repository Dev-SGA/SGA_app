"use client";

import Link from "next/link";
import { PitchGraphic } from "@/components/PitchGraphic";
import { phaseTone, testVisual } from "@/lib/phases";
import type { TacticalTest } from "@/lib/tests";

type TestBriefingProps = {
  test: TacticalTest;
  onStart: () => void;
};

export function TestBriefing({ test, onStart }: TestBriefingProps) {
  return (
    <div className="brief">
      <div className="brief__visual">
        <PitchGraphic variant={testVisual(test.slug)} label={`${test.title} diagram`} />
      </div>

      <div className="brief__body">
        <span className={`chip chip--${phaseTone(test.phase)}`}>{test.phase}</span>
        <h1 className="brief__title">{test.title}</h1>
        <p className="brief__intro">{test.intro}</p>

        <ul className="brief__facts" role="list">
          <li>
            <strong>{test.questions.length}</strong>
            <span>scenarios</span>
          </li>
          <li>
            <strong>~{test.durationMinutes}</strong>
            <span>minutes</span>
          </li>
          <li>
            <strong>Free</strong>
            <span>instant result</span>
          </li>
        </ul>

        <ul className="brief__tips" role="list">
          <li>Read each scenario carefully — pick the action you would make in the match.</li>
          <li>Use keys A, B, C to answer and Enter to continue.</li>
          <li>Refreshing the page restarts the test.</li>
        </ul>

        <div className="brief__actions">
          <button type="button" className="btn btn--primary btn--lg" onClick={onStart}>
            Start the test
          </button>
          <Link href="/#tests" className="btn btn--ghost btn--lg">
            Other tests
          </Link>
        </div>
      </div>
    </div>
  );
}
