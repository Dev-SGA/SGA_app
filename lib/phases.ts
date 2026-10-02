import type { PitchVariant } from "@/components/PitchGraphic";

export type Tone = "accent" | "warn" | "positive" | "gold";

const PHASE_TONES: Record<string, Tone> = {
  "Build-up": "accent",
  Transition: "warn",
  Defense: "positive",
  Attack: "gold",
};

const TEST_VISUALS: Record<string, PitchVariant> = {
  "possession-reading": "build-up",
  "defense-to-attack-transition": "transition",
  "defensive-block": "defense",
  "final-third": "attack",
};

export function phaseTone(phase: string): Tone {
  return PHASE_TONES[phase] ?? "accent";
}

export function testVisual(slug: string): PitchVariant {
  return TEST_VISUALS[slug] ?? "build-up";
}
