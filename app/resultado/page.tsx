import { SiteShell } from "@/components/SiteShell";
import { ResultView } from "@/components/ResultView";

type ResultPageProps = {
  searchParams: Promise<{ test?: string }>;
};

export default async function ResultadoPage({ searchParams }: ResultPageProps) {
  const { test } = await searchParams;

  return (
    <SiteShell
      eyebrow="Seu resultado"
      title="Perfil & produtos"
      meta="Use este resumo para conversar com a equipe SGA ou incluir no seu material de scouting."
    >
      <ResultView testSlug={test} />
    </SiteShell>
  );
}
