"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QuestionMediaSlot } from "@/components/QuestionMediaSlot";
import { phaseTone, testVisual } from "@/lib/phases";
import { computeTestResult, RESULT_STORAGE_KEY } from "@/lib/scoring";
import type { TacticalTest } from "@/lib/tests";

const LETTERS = ["A", "B", "C", "D", "E"];

type TacticalQuizProps = {
  test: TacticalTest;
};

export function TacticalQuiz({ test }: TacticalQuizProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = test.questions.length;
  const question = test.questions[index];
  const selected = question ? answers[question.id] : undefined;
  const isLast = index === total - 1;
  const progress = ((index + (selected ? 1 : 0)) / total) * 100;

  function choose(optionId: string) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  }

  function goNext() {
    if (!selected) return;
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    const result = computeTestResult(test, answers);
    try {
      sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
    } catch {
      /* storage unavailable (private mode) */
    }
    router.push(`/result?test=${test.slug}`);
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (!question) return;

      const key = e.key.toLowerCase();
      const pick = Math.max(["a", "b", "c", "d", "e"].indexOf(key), ["1", "2", "3", "4", "5"].indexOf(key));
      if (pick >= 0 && question.options[pick]) {
        choose(question.options[pick].id);
        return;
      }
      // Enter on a focused button already fires its click handler.
      if (e.key === "Enter" && target?.tagName !== "BUTTON") goNext();
      if (e.key === "ArrowLeft") goBack();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!question) {
    return (
      <p className="empty-state">
        This test has no questions yet. <Link href="/">Back to home</Link>
      </p>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__progress">
        <div className="quiz__progress-row">
          <span className={`chip chip--${phaseTone(test.phase)}`}>{test.phase}</span>
          <span className="quiz__counter">
            Question <strong>{index + 1}</strong> of {total}
          </span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="quiz__grid">
        <QuestionMediaSlot media={question.media} variant={testVisual(test.slug)} />

        <section className="quiz__panel" aria-live="polite">
          <p className="quiz__scenario">{question.scenario}</p>
          <h2 className="quiz__prompt">{question.prompt}</h2>

          <ul className="options" role="list">
            {question.options.map((opt, i) => {
              const isSelected = selected === opt.id;
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={`option${isSelected ? " is-selected" : ""}`}
                    onClick={() => choose(opt.id)}
                    aria-pressed={isSelected}
                  >
                    <kbd className="option__key">{LETTERS[i]}</kbd>
                    <span className="option__label">{opt.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="quiz__nav">
            <button type="button" className="btn btn--ghost" onClick={goBack} disabled={index === 0}>
              ← Back
            </button>
            <button type="button" className="btn btn--primary" onClick={goNext} disabled={!selected}>
              {isLast ? "See my result" : "Next question"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
