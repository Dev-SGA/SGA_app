import type { TestResult } from "@/lib/scoring";

export const RECENT_RESULTS_KEY = "sga-tactical-recent-results";

export type RecentResultEntry = {
  testSlug: string;
  testTitle: string;
  score: number;
  profileTitle: string;
  completedAt: string;
};

export function appendRecentResult(result: TestResult): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RECENT_RESULTS_KEY);
    const list: RecentResultEntry[] = raw ? (JSON.parse(raw) as RecentResultEntry[]) : [];
    const entry: RecentResultEntry = {
      testSlug: result.testSlug,
      testTitle: result.testTitle,
      score: result.score,
      profileTitle: result.profileTitle,
      completedAt: result.completedAt,
    };
    const filtered = list.filter((item) => item.testSlug !== entry.testSlug);
    const next = [entry, ...filtered].slice(0, 8);
    localStorage.setItem(RECENT_RESULTS_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}
