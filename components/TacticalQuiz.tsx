"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { appendRecentResult } from "@/lib/activity";
import { QuestionMediaSlot } from "@/components/QuestionMediaSlot";
import { computeTestResult, RESULT_STORAGE_KEY } from "@/lib/scoring";
import type { TacticalTest } from "@/lib/tests";

type TacticalQuizProps = {
  test: TacticalTest;
};

export function TacticalQuiz({ test }: TacticalQuizProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = test.questions[index];
  const progress = ((index + 1) / test.questions.length) * 100;
  const selected = question ? answers[question.id] : undefined;

  const canAdvance = Boolean(selected);

  const stepLabel = useMemo(
    () => `${test.phase} · ${index + 1} de ${test.questions.length}`,
    [index, test.questions.length, test.phase],
  );

  const optionLetters = ["A", "B", "C", "D", "E"];

  function choose(optionId: string) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  }

  function goNext() {
    if (!canAdvance) return;
    if (index < test.questions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }

    const result = computeTestResult(test, answers);
    try {
      sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
      appendRecentResult(result);
    } catch {
      /* ignore quota / private mode */
    }
    router.push(`/resultado?test=${test.slug}`);
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  if (!question) {
    return (
      <p className="test-empty">
        Este teste ainda não possui perguntas.{" "}
        <Link href="/">Voltar ao início</Link>
      </p>
    );
  }

  return (
    <div className="quiz quiz--immersive">
      <header className="quiz__header">
        <p className="quiz__part">Teste tático · {test.title}</p>
        <p className="quiz__step">{stepLabel}</p>
        <div
          className="quiz__progress"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="quiz__progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <QuestionMediaSlot
        media={question.media}
        phase={test.phase}
        index={index}
        total={test.questions.length}
      />

      <section className="quiz__panel">
        <p className="quiz__scenario">{question.scenario}</p>
        <h2 className="quiz__prompt">{question.prompt}</h2>

        <ul className="quiz__options" role="list">
          {question.options.map((opt, optIndex) => {
            const isSelected = selected === opt.id;
            const letter = optionLetters[optIndex] ?? "?";
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  className={`quiz__option${isSelected ? " is-selected" : ""}`}
                  onClick={() => choose(opt.id)}
                  aria-pressed={isSelected}
                >
                  <span className="quiz__option-badge" aria-hidden="true">
                    {letter}
                  </span>
                  <span className="quiz__option-label">{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="quiz__actions">
        <button type="button" className="btn btn--ghost" onClick={goBack} disabled={index === 0}>
          Anterior
        </button>
        <button type="button" className="btn btn--primary" onClick={goNext} disabled={!canAdvance}>
          {index === test.questions.length - 1 ? "Ver resultado" : "Próxima"}
        </button>
      </div>
    </div>
  );
}
