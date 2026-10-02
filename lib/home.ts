import { TACTICAL_TESTS } from "@/lib/tests";

export const PRIMARY_TEST_SLUG = TACTICAL_TESTS[0]?.slug ?? "possession-reading";

export const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Take a free test",
    body: "Answer real match scenarios in about four minutes. No account needed to start.",
  },
  {
    number: "02",
    title: "Get your tactical profile",
    body: "See your decision-quality score and the player profile that fits how you read the game.",
  },
  {
    number: "03",
    title: "Connect with SGA",
    body: "Register so our analysts can follow up with development plans, reports, and scouting material.",
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
