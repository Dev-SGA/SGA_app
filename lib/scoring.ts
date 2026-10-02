import type { TacticalProfileId } from "@/lib/profiles";
import { TACTICAL_PROFILES } from "@/lib/profiles";
import type { TacticalTest, TestOption } from "@/lib/tests";

export type TestAnswers = Record<string, string>;

export type TestResult = {
  testSlug: string;
  testTitle: string;
  score: number;
  gradeLabel: string;
  profileId: TacticalProfileId;
  profileTitle: string;
  profileHeadline: string;
  profileDescription: string;
  completedAt: string;
};

function gradeFromScore(score: number): string {
  if (score >= 85) return "Above Level";
  if (score >= 70) return "Good";
  if (score >= 55) return "Average";
  return "Below Level";
}

export function computeTestResult(test: TacticalTest, answers: TestAnswers): TestResult {
  let qualitySum = 0;
  let qualityCount = 0;
  const profileTotals: Record<TacticalProfileId, number> = {
    leitor: 0,
    organizador: 0,
    verticalizador: 0,
    recuperador: 0,
    finalizador: 0,
  };

  for (const question of test.questions) {
    const optionId = answers[question.id];
    const option: TestOption | undefined = question.options.find((o) => o.id === optionId);
    if (!option) continue;

    qualitySum += option.quality;
    qualityCount += 1;

    for (const [profileId, weight] of Object.entries(option.profileWeights) as [
      TacticalProfileId,
      number,
    ][]) {
      profileTotals[profileId] += weight;
    }
  }

  const score = qualityCount > 0 ? Math.round(qualitySum / qualityCount) : 0;

  let profileId: TacticalProfileId = "leitor";
  let best = -1;
  for (const id of Object.keys(profileTotals) as TacticalProfileId[]) {
    if (profileTotals[id] > best) {
      best = profileTotals[id];
      profileId = id;
    }
  }

  const profile = TACTICAL_PROFILES[profileId];

  return {
    testSlug: test.slug,
    testTitle: test.title,
    score,
    gradeLabel: gradeFromScore(score),
    profileId,
    profileTitle: profile.title,
    profileHeadline: profile.headline,
    profileDescription: profile.description,
    completedAt: new Date().toISOString(),
  };
}

export const RESULT_STORAGE_KEY = "sga-tactical-last-result";
