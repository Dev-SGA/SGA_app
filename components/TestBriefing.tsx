"use client";

import Link from "next/link";
import type { TacticalTest } from "@/lib/tests";

type TestBriefingProps = {
  test: TacticalTest;
  onStart: () => void;
};

export function TestBriefing({ test, onStart }: TestBriefingProps) {
  return (
    <div className="test-brief">
      <p className="test-brief__eyebrow">Before you begin</p>
      <h1 className="test-brief__title">{test.title}</h1>
      <p className="test-brief__meta">
        {test.questions.length} scenarios · ~{test.durationMinutes} minutes · {test.phase}
      </p>

      <div className="card test-brief__rules">
        <ul className="test-brief__list" role="list">
          <li>
            <span className="test-brief__icon test-brief__icon--warn" aria-hidden="true">
              !
            </span>
            <div>
              <strong>Read each scenario carefully</strong>
              <span>Every question simulates a match moment. Videos and diagrams will be added soon.</span>
            </div>
          </li>
          <li>
            <span className="test-brief__icon test-brief__icon--warn" aria-hidden="true">
              !
            </span>
            <div>
              <strong>Don&apos;t leave mid-test</strong>
              <span>Closing or refreshing the tab may reset your progress for this attempt.</span>
            </div>
          </li>
          <li>
            <span className="test-brief__icon test-brief__icon--ok" aria-hidden="true">
              ~
            </span>
            <div>
              <strong>Set aside {test.durationMinutes} minutes</strong>
              <span>At the end you&apos;ll see your score, tactical profile, and recommended SGA products.</span>
            </div>
          </li>
        </ul>
      </div>

      <button type="button" className="btn btn--primary btn--lg btn--block" onClick={onStart}>
        I&apos;m ready — start the test
      </button>
      <Link href="/" className="test-brief__back landing-text-link">
        ← Go back
      </Link>
    </div>
  );
}
