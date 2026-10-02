"use client";

import { useState } from "react";
import { TestBriefing } from "@/components/TestBriefing";
import { TacticalQuiz } from "@/components/TacticalQuiz";
import type { TacticalTest } from "@/lib/tests";

type TestFlowProps = {
  test: TacticalTest;
};

export function TestFlow({ test }: TestFlowProps) {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <TestBriefing test={test} onStart={() => setStarted(true)} />;
  }

  return <TacticalQuiz test={test} />;
}
