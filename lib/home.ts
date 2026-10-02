import { TACTICAL_TESTS } from "@/lib/tests";

export const PRIMARY_TEST_SLUG = TACTICAL_TESTS[0]?.slug ?? "possession-reading";

export const START_STEPS = [
  {
    number: "01",
    title: "Know your game",
    body: "Start with the free tactical test. See how you read real match situations and where you can improve.",
    href: `/tests/${PRIMARY_TEST_SLUG}`,
    action: "Take the free test",
  },
  {
    number: "02",
    title: "Your SGA result",
    body: "When you finish, get your score, dominant profile, and product recommendations for scouts and clubs.",
    href: "/register",
    action: "Register with SGA",
  },
  {
    number: "03",
    title: "Explore your position",
    body: "Coming soon: video concepts and tactical animations matched to your profile (player POV and bird's-eye view).",
    href: "#concepts",
    action: "Preview concepts",
  },
] as const;

export const ATE_FRAMEWORK = [
  {
    letter: "A",
    title: "Awareness",
    subtitle: "Reading",
    body: "Reading the game. Knowing what's happening around you before the ball arrives.",
    tone: "accent" as const,
  },
  {
    letter: "T",
    title: "Timing",
    subtitle: "Timing",
    body: "Knowing when to act. The difference between a good idea and a good play.",
    tone: "warn" as const,
  },
  {
    letter: "E",
    title: "Execution",
    subtitle: "Execution",
    body: "Making it happen under pressure. Turning decisions into actions on the field.",
    tone: "positive" as const,
  },
] as const;
