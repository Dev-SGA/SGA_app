import { TACTICAL_TESTS } from "@/lib/tests";

export const PRIMARY_TEST_SLUG = TACTICAL_TESTS[0]?.slug ?? "possession-reading";

export const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Create your athlete account",
    body: "Register with your name, club, birth year, and contact so SGA can follow up with you.",
  },
  {
    number: "02",
    title: "Take a tactical test",
    body: "Answer real match scenarios in about four minutes — one test per phase of play.",
  },
  {
    number: "03",
    title: "Get your profile",
    body: "See your decision-quality score, tactical profile, and recommended SGA products.",
  },
] as const;

export const ATE_FRAMEWORK = [
  {
    letter: "A",
    title: "Awareness",
    body: "Reading the game. Knowing what's happening around you before the ball arrives.",
    tone: "accent" as const,
  },
  {
    letter: "T",
    title: "Timing",
    body: "Knowing when to act. The difference between a good idea and a good play.",
    tone: "warn" as const,
  },
  {
    letter: "E",
    title: "Execution",
    body: "Making it happen under pressure. Turning decisions into actions on the field.",
    tone: "positive" as const,
  },
] as const;
