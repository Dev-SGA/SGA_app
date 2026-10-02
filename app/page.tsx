import { SiteShell } from "@/components/SiteShell";
import { TestCard } from "@/components/TestCard";
import { TACTICAL_TESTS } from "@/lib/tests";

export default function HomePage() {
  return (
    <SiteShell
      eyebrow="Captação de atletas"
      title="Testes táticos SGA"
      meta="Responda situações reais de jogo, receba seu perfil e conheça os produtos certos para evoluir."
    >
      <section className="home-lead">
        <p>
          Cada teste leva poucos minutos. Ao final, você vê uma nota de qualidade decisória, um perfil tático
          predominante e recomendações de serviços da Soccer Growth Analytics.
        </p>
      </section>
      <div className="test-grid">
        {TACTICAL_TESTS.map((test) => (
          <TestCard key={test.slug} test={test} />
        ))}
      </div>
    </SiteShell>
  );
}
