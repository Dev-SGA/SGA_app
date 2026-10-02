export const ATHLETE_POSITIONS = [
  { id: "CB", label: "Center back (CB)" },
  { id: "FB", label: "Fullback (FB)" },
  { id: "MF", label: "Midfielder (MF)" },
  { id: "AMF", label: "Attacking midfielder (AMF)" },
  { id: "WG", label: "Winger (WG)" },
  { id: "ST", label: "Striker (ST)" },
] as const;

export type AthletePositionId = (typeof ATHLETE_POSITIONS)[number]["id"];

const POSITION_SET = new Set<string>(ATHLETE_POSITIONS.map((p) => p.id));

export function parseAthletePosition(value: string): AthletePositionId | null {
  const id = value.trim().toUpperCase();
  return POSITION_SET.has(id) ? (id as AthletePositionId) : null;
}

export function positionLabel(id: AthletePositionId): string {
  return ATHLETE_POSITIONS.find((p) => p.id === id)?.label ?? id;
}

/** One tactical test slug per position (4 tests, 6 positions). */
export function testSlugForPosition(position: AthletePositionId): string {
  switch (position) {
    case "CB":
      return "defensive-block";
    case "FB":
    case "WG":
      return "defense-to-attack-transition";
    case "MF":
      return "possession-reading";
    case "AMF":
    case "ST":
      return "final-third";
    default:
      return "possession-reading";
  }
}
