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
    title: "Leitor de jogo",
    headline: "Antecipa espaços antes da bola chegar",
    description:
      "Você tende a escanear o campo, ajustar o corpo cedo e escolher a linha de passe que desorganiza a defesa adversária.",
  },
  organizador: {
    id: "organizador",
    title: "Organizador",
    headline: "Controla ritmo e estrutura da equipe",
    description:
      "Suas decisões costumam estabilizar a posse, conectar setores e manter a formação compacta entre fases do jogo.",
  },
  verticalizador: {
    id: "verticalizador",
    title: "Verticalizador",
    headline: "Transforma posse em ameaça direta",
    description:
      "Você busca ganhar linhas rapidamente — passes em profundidade, conduções entre linhas e apoio imediato ao último terço.",
  },
  recuperador: {
    id: "recuperador",
    title: "Recuperador",
    headline: "Leitura defensiva e timing de pressão",
    description:
      "Prioriza coberturas, fechamento de corredores e o momento certo para disputar a bola sem quebrar o bloco.",
  },
  finalizador: {
    id: "finalizador",
    title: "Finalizador",
    headline: "Decisão no terço final",
    description:
      "Orienta-se por espaço na área, timing de movimento e escolhas de finalização ou último passe antes do chute.",
  },
};
