/** Concept previews — link thumbnails/videos when assets are ready. */
export type TacticalConcept = {
  id: string;
  tag: string;
  title: string;
  description: string;
  poster?: string;
  href: string;
};

export const TACTICAL_CONCEPTS: TacticalConcept[] = [
  {
    id: "build-up",
    tag: "3-2-5",
    title: "Build-up structure",
    description: "How the team shapes in possession to progress the ball safely.",
    poster: "/media/concepts/build-up.jpg",
    href: "/tests/possession-reading",
  },
  {
    id: "advantages",
    tag: "Overlap",
    title: "Creating advantages",
    description: "Overlaps, switches of play, and movements to exploit space.",
    poster: "/media/concepts/advantages.jpg",
    href: "/tests/defense-to-attack-transition",
  },
  {
    id: "pocket",
    tag: "Half-space",
    title: "Receiving in the pocket",
    description: "Finding the gap between lines to receive, turn, and project the attack.",
    poster: "/media/concepts/pocket.jpg",
    href: "/tests/final-third",
  },
];
