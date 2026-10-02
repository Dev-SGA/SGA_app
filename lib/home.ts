import { TACTICAL_TESTS } from "@/lib/tests";

export const PRIMARY_TEST_SLUG = TACTICAL_TESTS[0]?.slug ?? "leitura-posse";

export const START_STEPS = [
  {
    number: "01",
    title: "Conheça seu jogo",
    body: "Comece pelo teste tático gratuito. Veja como você lê situações reais e onde pode evoluir.",
    href: `/tests/${PRIMARY_TEST_SLUG}`,
    action: "Fazer teste gratuito",
  },
  {
    number: "02",
    title: "Seu resultado SGA",
    body: "Ao concluir, receba nota, perfil predominante e recomendações de produtos para captadores e clubes.",
    href: "/resultado",
    action: "Ver último resultado",
  },
  {
    number: "03",
    title: "Explore sua posição",
    body: "Em breve: conceitos em vídeo e animações táticas alinhados ao seu perfil (POV do jogador e visão aérea).",
    href: "#conceitos",
    action: "Ver conceitos em breve",
  },
] as const;

export const ATE_FRAMEWORK = [
  {
    letter: "A",
    title: "Awareness",
    subtitle: "Leitura",
    body: "Ler o jogo. Saber o que acontece ao redor antes da bola chegar.",
    tone: "accent" as const,
  },
  {
    letter: "T",
    title: "Timing",
    subtitle: "Timing",
    body: "Saber quando agir. A diferença entre uma boa ideia e uma boa jogada.",
    tone: "warn" as const,
  },
  {
    letter: "E",
    title: "Execution",
    subtitle: "Execução",
    body: "Executar sob pressão. Transformar decisões em ações no campo.",
    tone: "positive" as const,
  },
] as const;
