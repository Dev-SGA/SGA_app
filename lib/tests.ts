import type { TacticalProfileId } from "@/lib/profiles";

export type TestOption = {
  id: string;
  label: string;
  /** 0–100 — tactical quality of the choice */
  quality: number;
  profileWeights: Partial<Record<TacticalProfileId, number>>;
};

export type QuestionMedia = {
  /** Poster or thumbnail — set when video is on CDN/public */
  poster?: string;
  videoSrc?: string;
  caption?: string;
};

export type TestQuestion = {
  id: string;
  scenario: string;
  prompt: string;
  options: TestOption[];
  media?: QuestionMedia;
};

export type TacticalTest = {
  slug: string;
  title: string;
  phase: string;
  durationMinutes: number;
  intro: string;
  questions: TestQuestion[];
};

export const TACTICAL_TESTS: TacticalTest[] = [
  {
    slug: "possession-reading",
    title: "Reading in possession",
    phase: "Build-up",
    durationMinutes: 4,
    intro:
      "Build-up situations against a compact opponent. Pick the action that best combines scanning, open body shape, and threat.",
    questions: [
      {
        id: "lp1",
        scenario: "Center-back under a high press; the #10 shuts off the middle.",
        prompt: "First touch after receiving from the goalkeeper:",
        options: [
          {
            id: "a",
            label: "Forced long diagonal to the marked winger",
            quality: 35,
            profileWeights: { verticalizador: 2 },
          },
          {
            id: "b",
            label: "Short carry to draw pressure and free the wide fullback",
            quality: 88,
            profileWeights: { organizador: 2, leitor: 1 },
          },
          {
            id: "c",
            label: "Back pass to the keeper without scanning under pressure",
            quality: 42,
            profileWeights: { recuperador: 1 },
          },
        ],
      },
      {
        id: "lp2",
        scenario: "Central midfielder between the lines, partially facing away from the field.",
        prompt: "Before receiving, what do you prioritize?",
        options: [
          {
            id: "a",
            label: "Scan + body orientation to play forward or escape pressure",
            quality: 92,
            profileWeights: { leitor: 3 },
          },
          {
            id: "b",
            label: "Ask for the ball at the marker's feet to draw a foul",
            quality: 55,
            profileWeights: { organizador: 1 },
          },
          {
            id: "c",
            label: "Fix the marker first, then look for options",
            quality: 48,
            profileWeights: { finalizador: 1 },
          },
        ],
      },
      {
        id: "lp3",
        scenario: "Fullback with the inside channel closed; winger isolated 1v1.",
        prompt: "Best decision in the middle third:",
        options: [
          {
            id: "a",
            label: "Short exchange with the #6 to switch the point of attack",
            quality: 85,
            profileWeights: { organizador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Early cross into a crowded box with three markers",
            quality: 40,
            profileWeights: { finalizador: 2 },
          },
          {
            id: "c",
            label: "Diagonal through ball for the winger in space",
            quality: 78,
            profileWeights: { verticalizador: 3 },
          },
        ],
      },
      {
        id: "lp4",
        scenario: "Final third; deep defensive line, congested midfield.",
        prompt: "How do you break the block?",
        options: [
          {
            id: "a",
            label: "Striker movement between back line and midfield + timed pass",
            quality: 90,
            profileWeights: { leitor: 2, finalizador: 1 },
          },
          {
            id: "b",
            label: "Long-range shot without shifting the defense",
            quality: 50,
            profileWeights: { finalizador: 2 },
          },
          {
            id: "c",
            label: "Reset to the far side and circulate again",
            quality: 72,
            profileWeights: { organizador: 2 },
          },
        ],
      },
    ],
  },
  {
    slug: "defense-to-attack-transition",
    title: "Defense → attack transition",
    phase: "Transition",
    durationMinutes: 5,
    intro:
      "Moments in the first five seconds after winning the ball. Prioritize safe verticality and supporting runs.",
    questions: [
      {
        id: "td1",
        scenario: "Recovery in midfield; two teammates ahead, three disorganized opponents.",
        prompt: "First action:",
        options: [
          {
            id: "a",
            label: "Carry to draw cover and play the third-man pass",
            quality: 91,
            profileWeights: { verticalizador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Safe pass backward and reorganize",
            quality: 58,
            profileWeights: { organizador: 2 },
          },
          {
            id: "c",
            label: "Hopeful long ball",
            quality: 38,
            profileWeights: { verticalizador: 1 },
          },
        ],
      },
      {
        id: "td2",
        scenario: "Defensive midfielder wins the ball with light contact.",
        prompt: "Quick free kick available:",
        options: [
          {
            id: "a",
            label: "Quick pass to the winger in numerical advantage",
            quality: 86,
            profileWeights: { verticalizador: 2 },
          },
          {
            id: "b",
            label: "Wait for the referee and set up a dead ball",
            quality: 62,
            profileWeights: { organizador: 1 },
          },
          {
            id: "c",
            label: "Dribble in midfield with no support",
            quality: 44,
            profileWeights: { finalizador: 1 },
          },
        ],
      },
      {
        id: "td3",
        scenario: "Fullback wins the ball on your own byline.",
        prompt: "Counter-press incoming:",
        options: [
          {
            id: "a",
            label: "Clean outlet to the free center-back or pivot",
            quality: 84,
            profileWeights: { organizador: 2, recuperador: 1 },
          },
          {
            id: "b",
            label: "Clearance to the opposite flank",
            quality: 45,
            profileWeights: {},
          },
          {
            id: "c",
            label: "Vertical pass to the winger already moving",
            quality: 79,
            profileWeights: { verticalizador: 2, leitor: 1 },
          },
        ],
      },
      {
        id: "td4",
        scenario: "Forward wins the ball in the opponent's half.",
        prompt: "1v1 against the last center-back:",
        options: [
          {
            id: "a",
            label: "Drive inside and shoot if the angle opens",
            quality: 82,
            profileWeights: { finalizador: 3 },
          },
          {
            id: "b",
            label: "Square pass to the better-positioned teammate",
            quality: 88,
            profileWeights: { leitor: 2, organizador: 1 },
          },
          {
            id: "c",
            label: "Recycle possession to protect the lead",
            quality: 52,
            profileWeights: { organizador: 2 },
          },
        ],
      },
    ],
  },
  {
    slug: "defensive-block",
    title: "Block and cover",
    phase: "Defense",
    durationMinutes: 4,
    intro: "Defensive organization, compact lines, and when to press or hold.",
    questions: [
      {
        id: "bd1",
        scenario: "Opponent on the ball in midfield; your line is staggered.",
        prompt: "As the central midfielder, you:",
        options: [
          {
            id: "a",
            label: "Close the half-space and force play wide",
            quality: 90,
            profileWeights: { recuperador: 3 },
          },
          {
            id: "b",
            label: "Press the #10 on every first touch",
            quality: 55,
            profileWeights: { verticalizador: 1 },
          },
          {
            id: "c",
            label: "Man-mark in midfield regardless of the ball",
            quality: 48,
            profileWeights: {},
          },
        ],
      },
      {
        id: "bd2",
        scenario: "Cross from the right; you are the center-back at the far post.",
        prompt: "Box reading:",
        options: [
          {
            id: "a",
            label: "Scan for the second ball + position between attacker and goal",
            quality: 93,
            profileWeights: { recuperador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Early jump on the first attacker",
            quality: 60,
            profileWeights: { finalizador: 1 },
          },
          {
            id: "c",
            label: "Leave the near post for the fullback to cover",
            quality: 70,
            profileWeights: { organizador: 1 },
          },
        ],
      },
      {
        id: "bd3",
        scenario: "Opponent counter 3v3 in midfield.",
        prompt: "Last defender:",
        options: [
          {
            id: "a",
            label: "Delay, steer, and tackle at the right moment",
            quality: 87,
            profileWeights: { recuperador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Immediate challenge on the first attacker",
            quality: 42,
            profileWeights: {},
          },
          {
            id: "c",
            label: "Drop to the box and close the central lane",
            quality: 75,
            profileWeights: { recuperador: 2 },
          },
        ],
      },
      {
        id: "bd4",
        scenario: "High press after the opponent's short goal kick.",
        prompt: "As the left winger in the press:",
        options: [
          {
            id: "a",
            label: "Cut the pass lane to the center-back + trigger with midfield",
            quality: 88,
            profileWeights: { recuperador: 2, verticalizador: 1 },
          },
          {
            id: "b",
            label: "Sprint straight at the goalkeeper",
            quality: 35,
            profileWeights: {},
          },
          {
            id: "c",
            label: "Hold position and wait for them to go long",
            quality: 58,
            profileWeights: { organizador: 1 },
          },
        ],
      },
    ],
  },
  {
    slug: "final-third",
    title: "Final third",
    phase: "Attack",
    durationMinutes: 4,
    intro: "Finishing choices, final pass, and off-the-ball movement in the box.",
    questions: [
      {
        id: "fu1",
        scenario: "Diagonal run into the box; goalkeeper advancing.",
        prompt: "Best option:",
        options: [
          {
            id: "a",
            label: "Place it far post with the inside foot",
            quality: 85,
            profileWeights: { finalizador: 3 },
          },
          {
            id: "b",
            label: "Cutback to the free teammate",
            quality: 90,
            profileWeights: { leitor: 2, organizador: 1 },
          },
          {
            id: "c",
            label: "Look for a foul on light contact",
            quality: 50,
            profileWeights: {},
          },
        ],
      },
      {
        id: "fu2",
        scenario: "Low cross from the right; you attack the near post.",
        prompt: "Arrival timing:",
        options: [
          {
            id: "a",
            label: "Attack the gap between back line and midfield with one touch",
            quality: 92,
            profileWeights: { finalizador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Stand still on a static marker in the six-yard box",
            quality: 45,
            profileWeights: {},
          },
          {
            id: "c",
            label: "Glance on the run without adjusting stride",
            quality: 68,
            profileWeights: { finalizador: 1 },
          },
        ],
      },
      {
        id: "fu3",
        scenario: "Short set piece; high defensive line.",
        prompt: "Tactical rotation:",
        options: [
          {
            id: "a",
            label: "Block + second-wave run",
            quality: 86,
            profileWeights: { organizador: 2, finalizador: 1 },
          },
          {
            id: "b",
            label: "Direct shot over the wall",
            quality: 55,
            profileWeights: { finalizador: 1 },
          },
          {
            id: "c",
            label: "Long cross to the far post with no movement",
            quality: 48,
            profileWeights: {},
          },
        ],
      },
      {
        id: "fu4",
        scenario: "2v2 in the penalty area; you have the ball on the byline.",
        prompt: "Decision:",
        options: [
          {
            id: "a",
            label: "Weighted pass to the teammate between center-backs",
            quality: 91,
            profileWeights: { leitor: 2, verticalizador: 1 },
          },
          {
            id: "b",
            label: "Tight-angle across-body finish",
            quality: 72,
            profileWeights: { finalizador: 2 },
          },
          {
            id: "c",
            label: "Endless cutbacks until possession is lost",
            quality: 38,
            profileWeights: {},
          },
        ],
      },
    ],
  },
];

export function getTestBySlug(slug: string): TacticalTest | undefined {
  return TACTICAL_TESTS.find((t) => t.slug === slug);
}
