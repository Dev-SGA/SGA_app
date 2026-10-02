import type { TacticalProfileId } from "@/lib/profiles";

export type SgaProduct = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  href: string;
  forProfiles: TacticalProfileId[];
};

/** SGA products — replace href values with live commercial URLs. */
export const SGA_PRODUCTS: SgaProduct[] = [
  {
    id: "idp",
    name: "IDP — Individual Development Plan",
    tagline: "Tactical and physical goals with coaching support",
    description:
      "We translate your game-reading profile into weekly objectives, reference clips, and checkpoints with the SGA team.",
    ctaLabel: "Learn about IDP",
    href: "https://sgaperformance.com",
    forProfiles: ["leitor", "organizador", "recuperador"],
  },
  {
    id: "game-stats",
    name: "Game Stats Report",
    tagline: "Match numbers in the SGA standard",
    description:
      "Visual report with possession, connections, duels, and phase metrics — ideal for players who structure the team.",
    ctaLabel: "See a sample report",
    href: "https://github.com/Dev-SGA",
    forProfiles: ["organizador", "verticalizador"],
  },
  {
    id: "video-tactical",
    name: "Tactical video analysis",
    tagline: "Real situations with clear feedback",
    description:
      "Clip selection aligned to your profile, with notes on positioning, scanning, and decisions under pressure.",
    ctaLabel: "Request analysis",
    href: "https://sgaperformance.com",
    forProfiles: ["leitor", "recuperador", "finalizador"],
  },
  {
    id: "transition-lab",
    name: "Transition Lab",
    tagline: "From recovery to clear chance",
    description:
      "Program focused on counter-attacking, carry support, and the final pass — for players who verticalize often.",
    ctaLabel: "Talk to SGA",
    href: "https://sgaperformance.com",
    forProfiles: ["verticalizador", "finalizador"],
  },
  {
    id: "scouting-pack",
    name: "Scouting Pack",
    tagline: "Material for scouts and clubs",
    description:
      "Package with tactical profile summary, suggested clips, and key indicators for clubs or agents.",
    ctaLabel: "Build my pack",
    href: "https://sgaperformance.com",
    forProfiles: ["leitor", "verticalizador", "finalizador", "organizador", "recuperador"],
  },
];

export function productsForProfile(profileId: TacticalProfileId): SgaProduct[] {
  const ranked = SGA_PRODUCTS.filter((p) => p.forProfiles.includes(profileId));
  const rest = SGA_PRODUCTS.filter((p) => !p.forProfiles.includes(profileId));
  return [...ranked, ...rest].slice(0, 4);
}
