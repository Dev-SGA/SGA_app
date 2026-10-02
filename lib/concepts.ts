/** Pré-visualizações de conceitos (thumbnails/vídeos podem ser ligados depois). */
export type TacticalConcept = {
  id: string;
  tag: string;
  title: string;
  description: string;
  /** Caminho em public/ quando o asset existir */
  poster?: string;
  href: string;
};

export const TACTICAL_CONCEPTS: TacticalConcept[] = [
  {
    id: "build-up",
    tag: "3-2-5",
    title: "Estrutura de construção",
    description: "Como o time se organiza na posse para progredir a bola com segurança.",
    poster: "/media/concepts/build-up.jpg",
    href: "/tests/leitura-posse",
  },
  {
    id: "advantages",
    tag: "Sobreposição",
    title: "Criando vantagens",
    description: "Sobreposições, trocas de lado e movimentos para explorar espaço.",
    poster: "/media/concepts/advantages.jpg",
    href: "/tests/transicao-defesa-ataque",
  },
  {
    id: "pocket",
    tag: "Entre linhas",
    title: "Receber no bolso",
    description: "Encontrar o intervalo entre linhas para receber, girar e projetar o jogo.",
    poster: "/media/concepts/pocket.jpg",
    href: "/tests/finalizacao-ultimo-passe",
  },
];
