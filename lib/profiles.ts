export type TacticalProfileId =
  | "leitor"
  | "organizador"
  | "verticalizador"
  | "recuperador"
  | "finalizador";

export type TacticalProfile = {
  id: TacticalProfileId;
  title: string;
  headline: string;
  description: string;
};

export const TACTICAL_PROFILES: Record<TacticalProfileId, TacticalProfile> = {
  leitor: {
    id: "leitor",
    title: "Game reader",
    headline: "Anticipates space before the ball arrives",
    description:
      "You tend to scan early, set your body shape, and choose passing lines that disrupt the opposing defense.",
  },
  organizador: {
    id: "organizador",
    title: "Organizer",
    headline: "Controls tempo and team structure",
    description:
      "Your decisions often stabilize possession, connect lines, and keep the shape compact across phases.",
  },
  verticalizador: {
    id: "verticalizador",
    title: "Line breaker",
    headline: "Turns possession into direct threat",
    description:
      "You look to gain ground quickly — through balls, carries between lines, and immediate support in the final third.",
  },
  recuperador: {
    id: "recuperador",
    title: "Ball winner",
    headline: "Defensive reading and pressing timing",
    description:
      "You prioritize cover, lane closure, and the right moment to challenge without breaking the block.",
  },
  finalizador: {
    id: "finalizador",
    title: "Finisher",
    headline: "Decision-making in the final third",
    description:
      "You orient to space in the box, movement timing, and choices to finish or play the last pass before the shot.",
  },
};
