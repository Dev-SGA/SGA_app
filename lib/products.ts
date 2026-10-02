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

/** Produtos SGA — links podem ser trocados pelas URLs comerciais reais. */
export const SGA_PRODUCTS: SgaProduct[] = [
  {
    id: "idp",
    name: "IDP — Plano de Desenvolvimento Individual",
    tagline: "Metas táticas e físicas com acompanhamento",
    description:
      "Traduzimos seu perfil de leitura de jogo em objetivos semanais, clipes de referência e checkpoints com a equipe SGA.",
    ctaLabel: "Conhecer o IDP",
    href: "https://sgaperformance.com",
    forProfiles: ["leitor", "organizador", "recuperador"],
  },
  {
    id: "game-stats",
    name: "Game Stats Report",
    tagline: "Números de jogo no padrão SGA",
    description:
      "Relatório visual com métricas de posse, conexões, duelos e fases — ideal para atletas que estruturam o time.",
    ctaLabel: "Ver exemplo de relatório",
    href: "https://github.com/Dev-SGA",
    forProfiles: ["organizador", "verticalizador"],
  },
  {
    id: "video-tactical",
    name: "Análise tática em vídeo",
    tagline: "Situações reais com feedback objetivo",
    description:
      "Seleção de lances alinhada ao seu perfil, com comentários sobre posicionamento, scan e decisão sob pressão.",
    ctaLabel: "Solicitar análise",
    href: "https://sgaperformance.com",
    forProfiles: ["leitor", "recuperador", "finalizador"],
  },
  {
    id: "transition-lab",
    name: "Transition Lab",
    tagline: "Da recuperação à chance clara",
    description:
      "Programa focado em contra-ataque, apoios de condução e último passe — para quem verticaliza com frequência.",
    ctaLabel: "Falar com a SGA",
    href: "https://sgaperformance.com",
    forProfiles: ["verticalizador", "finalizador"],
  },
  {
    id: "scouting-pack",
    name: "Scouting Pack",
    tagline: "Material para captadores e clubes",
    description:
      "Pacote com resumo de perfil tático, clipes sugeridos e indicadores-chave para apresentação a clubes ou agentes.",
    ctaLabel: "Montar meu pack",
    href: "https://sgaperformance.com",
    forProfiles: ["leitor", "verticalizador", "finalizador", "organizador", "recuperador"],
  },
];

export function productsForProfile(profileId: TacticalProfileId): SgaProduct[] {
  const ranked = SGA_PRODUCTS.filter((p) => p.forProfiles.includes(profileId));
  const rest = SGA_PRODUCTS.filter((p) => !p.forProfiles.includes(profileId));
  return [...ranked, ...rest].slice(0, 4);
}
