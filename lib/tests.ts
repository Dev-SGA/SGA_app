import type { TacticalProfileId } from "@/lib/profiles";

export type TestOption = {
  id: string;
  label: string;
  /** 0–100 — qualidade tática da escolha */
  quality: number;
  profileWeights: Partial<Record<TacticalProfileId, number>>;
};

export type QuestionMedia = {
  /** Poster ou thumbnail — substituir quando o vídeo estiver no CDN/public */
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
    slug: "leitura-posse",
    title: "Leitura na posse",
    phase: "Construção",
    durationMinutes: 4,
    intro:
      "Situações de construção com adversário compacto. Escolha a ação que melhor combina scan, corpo aberto e ameaça.",
    questions: [
      {
        id: "lp1",
        scenario: "Zagueiro com linha de pressão alta; meio fechado pelo 10 adversário.",
        prompt: "Primeiro toque após receber do goleiro:",
        options: [
          {
            id: "a",
            label: "Passe longo diagonal forçado para o ponta marcado",
            quality: 35,
            profileWeights: { verticalizador: 2 },
          },
          {
            id: "b",
            label: "Condução curta para atrair pressão e liberar lateral livre",
            quality: 88,
            profileWeights: { organizador: 2, leitor: 1 },
          },
          {
            id: "c",
            label: "Recuo sem scan para o goleiro sob pressão",
            quality: 42,
            profileWeights: { recuperador: 1 },
          },
        ],
      },
      {
        id: "lp2",
        scenario: "Meio-centro entre linhas, costas parcialmente ao campo.",
        prompt: "Antes de receber, o que prioriza?",
        options: [
          {
            id: "a",
            label: "Scan + orientação do corpo para jogar para frente ou sair da pressão",
            quality: 92,
            profileWeights: { leitor: 3 },
          },
          {
            id: "b",
            label: "Pedir bola no pé do marcador para ganhar falta",
            quality: 55,
            profileWeights: { organizador: 1 },
          },
          {
            id: "c",
            label: "Fixar marcador e só então olhar opções",
            quality: 48,
            profileWeights: { finalizador: 1 },
          },
        ],
      },
      {
        id: "lp3",
        scenario: "Ala com interior fechado; ponta aberto em 1v1.",
        prompt: "Melhor decisão com posse no terço médio:",
        options: [
          {
            id: "a",
            label: "Troca curta com o 6 para mudar o ponto de ataque",
            quality: 85,
            profileWeights: { organizador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Centro imediato para área com 3 marcados",
            quality: 40,
            profileWeights: { finalizador: 2 },
          },
          {
            id: "c",
            label: "Passe em profundidade na diagonal do ponta",
            quality: 78,
            profileWeights: { verticalizador: 3 },
          },
        ],
      },
      {
        id: "lp4",
        scenario: "Último terço; linha defensiva recuada, meio-cheia.",
        prompt: "Como quebrar o bloco?",
        options: [
          {
            id: "a",
            label: "Movimento de atacante entre zaga e meio + passe no timing",
            quality: 90,
            profileWeights: { leitor: 2, finalizador: 1 },
          },
          {
            id: "b",
            label: "Chute de meia distância sem deslocar a defesa",
            quality: 50,
            profileWeights: { finalizador: 2 },
          },
          {
            id: "c",
            label: "Reset para lateral oposta e nova circulação",
            quality: 72,
            profileWeights: { organizador: 2 },
          },
        ],
      },
    ],
  },
  {
    slug: "transicao-defesa-ataque",
    title: "Transição defesa → ataque",
    phase: "Transição",
    durationMinutes: 5,
    intro:
      "Momentos nos primeiros 5 segundos após recuperar a bola. Priorize verticalidade segura e apoios.",
    questions: [
      {
        id: "td1",
        scenario: "Recuperação no meio; 2 companheiros à frente, 3 adversários desorganizados.",
        prompt: "Primeira ação:",
        options: [
          {
            id: "a",
            label: "Condução até atrair cobertura e passe no terceiro homem",
            quality: 91,
            profileWeights: { verticalizador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Passe seguro para trás e reorganizar",
            quality: 58,
            profileWeights: { organizador: 2 },
          },
          {
            id: "c",
            label: "Lançamento longo na esperança",
            quality: 38,
            profileWeights: { verticalizador: 1 },
          },
        ],
      },
      {
        id: "td2",
        scenario: "Volante recupera e leva contato leve.",
        prompt: "Com falta rápida disponível:",
        options: [
          {
            id: "a",
            label: "Jogo rápido para extremo em superioridade",
            quality: 86,
            profileWeights: { verticalizador: 2 },
          },
          {
            id: "b",
            label: "Esperar árbitro e montar bola parada",
            quality: 62,
            profileWeights: { organizador: 1 },
          },
          {
            id: "c",
            label: "Driblar no meio sem apoio",
            quality: 44,
            profileWeights: { finalizador: 1 },
          },
        ],
      },
      {
        id: "td3",
        scenario: "Lateral recupera na linha de fundo própria.",
        prompt: "Contra-pressão iminente:",
        options: [
          {
            id: "a",
            label: "Saída limpa para zagueiro livre ou meio pivot",
            quality: 84,
            profileWeights: { organizador: 2, recuperador: 1 },
          },
          {
            id: "b",
            label: "Chutão na lateral oposta",
            quality: 45,
            profileWeights: {},
          },
          {
            id: "c",
            label: "Passe vertical para ponta já em movimento",
            quality: 79,
            profileWeights: { verticalizador: 2, leitor: 1 },
          },
        ],
      },
      {
        id: "td4",
        scenario: "Atacante recupera na linha média adversária.",
        prompt: "Decisão com 1v1 contra último zagueiro:",
        options: [
          {
            id: "a",
            label: "Conduzir para dentro e finalizar se abrir ângulo",
            quality: 82,
            profileWeights: { finalizador: 3 },
          },
          {
            id: "b",
            label: "Passe rasteiro para companheiro melhor posicionado",
            quality: 88,
            profileWeights: { leitor: 2, organizador: 1 },
          },
          {
            id: "c",
            label: "Recuar posse para segurar resultado",
            quality: 52,
            profileWeights: { organizador: 2 },
          },
        ],
      },
    ],
  },
  {
    slug: "bloco-defensivo",
    title: "Bloco e coberturas",
    phase: "Defesa",
    durationMinutes: 4,
    intro: "Organização defensiva, linhas compactas e momento de pressionar ou segurar.",
    questions: [
      {
        id: "bd1",
        scenario: "Adversário com bola no meio; sua linha está escalonada.",
        prompt: "Como meio-centro, você:",
        options: [
          {
            id: "a",
            label: "Fecha o half-space e orienta passe para lateral",
            quality: 90,
            profileWeights: { recuperador: 3 },
          },
          {
            id: "b",
            label: "Pressiona o 10 no primeiro toque sempre",
            quality: 55,
            profileWeights: { verticalizador: 1 },
          },
          {
            id: "c",
            label: "Marca homem a homem no meio independente da bola",
            quality: 48,
            profileWeights: {},
          },
        ],
      },
      {
        id: "bd2",
        scenario: "Cruzamento da direita; você é zagueiro na segunda trave.",
        prompt: "Leitura de área:",
        options: [
          {
            id: "a",
            label: "Scan da segunda bola + posição entre atacante e gol",
            quality: 93,
            profileWeights: { recuperador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Salto antecipado no primeiro atacante",
            quality: 60,
            profileWeights: { finalizador: 1 },
          },
          {
            id: "c",
            label: "Libera primeira trave para lateral cobrir",
            quality: 70,
            profileWeights: { organizador: 1 },
          },
        ],
      },
      {
        id: "bd3",
        scenario: "Contra-ataque adversário 3v3 no meio.",
        prompt: "Último homem da linha:",
        options: [
          {
            id: "a",
            label: "Atrasar, orientar e tackle no momento certo",
            quality: 87,
            profileWeights: { recuperador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Entrada imediata no primeiro jogador",
            quality: 42,
            profileWeights: {},
          },
          {
            id: "c",
            label: "Recuar até a área e fechar corredor central",
            quality: 75,
            profileWeights: { recuperador: 2 },
          },
        ],
      },
      {
        id: "bd4",
        scenario: "Pressão alta após saída curta do goleiro adversário.",
        prompt: "Como ponta esquerdo na pressão:",
        options: [
          {
            id: "a",
            label: "Corta linha de passe para zagueiro + trigger com meio",
            quality: 88,
            profileWeights: { recuperador: 2, verticalizador: 1 },
          },
          {
            id: "b",
            label: "Corre direto ao goleiro",
            quality: 35,
            profileWeights: {},
          },
          {
            id: "c",
            label: "Segura posição e espera recuo",
            quality: 58,
            profileWeights: { organizador: 1 },
          },
        ],
      },
    ],
  },
  {
    slug: "finalizacao-ultimo-passe",
    title: "Último terço",
    phase: "Ataque",
    durationMinutes: 4,
    intro: "Escolhas de finalização, último passe e movimentos off-the-ball na área.",
    questions: [
      {
        id: "fu1",
        scenario: "Entrada na área pela diagonal; goleiro avançando.",
        prompt: "Melhor opção:",
        options: [
          {
            id: "a",
            label: "Colocar no canto longo com superfície interna",
            quality: 85,
            profileWeights: { finalizador: 3 },
          },
          {
            id: "b",
            label: "Corte para trás para companheiro livre",
            quality: 90,
            profileWeights: { leitor: 2, organizador: 1 },
          },
          {
            id: "c",
            label: "Pedir falta no contato leve",
            quality: 50,
            profileWeights: {},
          },
        ],
      },
      {
        id: "fu2",
        scenario: "Cruzamento baixo da direita; você ataca primeiro pau.",
        prompt: "Timing de chegada:",
        options: [
          {
            id: "a",
            label: "Surge no espaço entre zaga e meio com um toque",
            quality: 92,
            profileWeights: { finalizador: 2, leitor: 1 },
          },
          {
            id: "b",
            label: "Para na marcação estática na pequena área",
            quality: 45,
            profileWeights: {},
          },
          {
            id: "c",
            label: "Desvia na corrida sem ajustar passo",
            quality: 68,
            profileWeights: { finalizador: 1 },
          },
        ],
      },
      {
        id: "fu3",
        scenario: "Bola parada curta; defesa alta.",
        prompt: "Rotação tática:",
        options: [
          {
            id: "a",
            label: "Bloqueio + movimento de segundo andar",
            quality: 86,
            profileWeights: { organizador: 2, finalizador: 1 },
          },
          {
            id: "b",
            label: "Chute direto por cima do muro",
            quality: 55,
            profileWeights: { finalizador: 1 },
          },
          {
            id: "c",
            label: "Cruzamento longo segundo pau sem movimento",
            quality: 48,
            profileWeights: {},
          },
        ],
      },
      {
        id: "fu4",
        scenario: "2v2 na grande área; você com bola no limite.",
        prompt: "Decisão:",
        options: [
          {
            id: "a",
            label: "Passe colocado no pé do companheiro entre zagueiros",
            quality: 91,
            profileWeights: { leitor: 2, verticalizador: 1 },
          },
          {
            id: "b",
            label: "Finalização cruzada de ângulo fechado",
            quality: 72,
            profileWeights: { finalizador: 2 },
          },
          {
            id: "c",
            label: "Recorte infinito até perder a bola",
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
