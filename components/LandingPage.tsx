import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";
import { RecentTestsPanel } from "@/components/RecentTestsPanel";
import { SgaLogo } from "@/components/SgaLogo";
import { TACTICAL_CONCEPTS } from "@/lib/concepts";
import { ATE_FRAMEWORK, PRIMARY_TEST_SLUG, START_STEPS } from "@/lib/home";
import { BRAND } from "@/lib/brand";
import { TACTICAL_TESTS } from "@/lib/tests";

export function LandingPage() {
  return (
    <div className="landing">
      <a className="landing-skip" href="#start">
        Ir para os testes
      </a>

      <nav aria-label="Seções" className="landing-nav">
        <a href="#start">Começar grátis</a>
        <a href="#conceitos">O jogo</a>
        <a href="#framework">Método</a>
      </nav>

      <div className="landing-top-actions">
        <Link href="/resultado" className="landing-text-link">
          Ver resultado
        </Link>
      </div>

      <header className="landing-hero">
        <Link href="/" className="landing-hero__logo" aria-label={`${BRAND.name} — início`}>
          <SgaLogo variant="horizontal" size="hero" priority />
        </Link>

        <h1 className="landing-hero__title">
          TREINE SEU
          <br />
          <span className="landing-hero__accent">CÉREBRO TÁTICO</span>
        </h1>

        <p className="landing-hero__lead">
          Leia o jogo. Decida melhor. Comece pelo teste tático gratuito e descubra produtos SGA para evoluir e se
          apresentar a clubes.
        </p>

        <div className="landing-hero__ctas">
          <Link href={`/tests/${PRIMARY_TEST_SLUG}`} className="btn btn--primary btn--lg">
            Fazer teste gratuito
          </Link>
          <Link href="/resultado" className="btn btn--secondary btn--lg">
            Ver meu resultado
          </Link>
        </div>

        <HeroVideo />
      </header>

      <RecentTestsPanel />

      <section id="start" className="landing-section landing-section--wide">
        <div className="landing-section__intro">
          <h2 className="landing-section__title">COMECE GRÁTIS</h2>
          <p className="landing-section__subtitle">
            Seus primeiros passos: testar sua leitura, ver o resultado e explorar conceitos do seu perfil.
          </p>
        </div>
        <div className="step-grid">
          {START_STEPS.map((step) => (
            <Link key={step.number} href={step.href} className="step-card">
              <span className="step-card__number">{step.number}</span>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__body">{step.body}</p>
              <span className="step-card__action">
                {step.action} <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="catalogo" className="landing-section landing-section--wide">
        <div className="landing-section__intro">
          <p className="landing-section__eyebrow">Catálogo SGA</p>
          <h2 className="landing-section__title">TESTES DISPONÍVEIS</h2>
          <p className="landing-section__subtitle">Micro testes por fase do jogo — vídeos situacionais serão adicionados em breve.</p>
        </div>
        <div className="catalog-grid">
          {TACTICAL_TESTS.map((test) => (
            <Link key={test.slug} href={`/tests/${test.slug}`} className="catalog-card">
              <span className="catalog-card__phase">{test.phase}</span>
              <h3 className="catalog-card__title">{test.title}</h3>
              <p className="catalog-card__meta">
                {test.questions.length} situações · ~{test.durationMinutes} min
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="conceitos" className="landing-section landing-section--wide">
        <div className="landing-section__intro">
          <p className="landing-section__eyebrow">Aprenda conceitos como estes</p>
          <h2 className="landing-section__title">ANÁLISE DE JOGO REAL</h2>
          <p className="landing-section__subtitle">
            Explore o jogo por conceitos táticos e animações guiadas (conteúdo em vídeo a ser publicado).
          </p>
        </div>
        <div className="concept-grid">
          {TACTICAL_CONCEPTS.map((concept) => (
            <Link key={concept.id} href={concept.href} className="concept-card">
              <div className="concept-card__media">
                <div className="concept-card__placeholder" aria-hidden="true" />
                <span className="concept-card__tag">{concept.tag}</span>
              </div>
              <div className="concept-card__body">
                <h4 className="concept-card__title">{concept.title}</h4>
                <p className="concept-card__desc">{concept.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section--narrow access">
        <div className="access__primary">
          <h2 className="landing-section__title access__title">Continue de onde parou.</h2>
          <p>Seus resultados ficam salvos neste navegador até você concluir um novo teste.</p>
          <Link href="/resultado" className="btn btn--secondary">
            Abrir resultado
          </Link>
        </div>
        <div className="access__card card">
          <h3>Já fez um teste?</h3>
          <p className="access__card-text">
            Revise nota, perfil tático e produtos recomendados da SGA Performance.
          </p>
          <Link href="/resultado" className="btn btn--primary">
            Ver perfil e produtos
          </Link>
        </div>
      </section>

      <section id="framework" className="landing-section landing-section--wide">
        <div className="landing-section__intro">
          <p className="landing-section__eyebrow landing-section__eyebrow--muted">Nossa metodologia</p>
          <h2 className="landing-section__title">O FRAMEWORK A→T→E</h2>
        </div>
        <div className="framework-grid">
          {ATE_FRAMEWORK.map((phase) => (
            <article key={phase.letter} className={`framework-card framework-card--${phase.tone}`}>
              <div className="framework-card__badge" aria-hidden="true">
                {phase.letter}
              </div>
              <h4 className="framework-card__title">{phase.title}</h4>
              <p className="framework-card__body">{phase.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section--narrow hub card">
        <h2 className="hub__title">Próximo passo com a SGA</h2>
        <p>Transforme seu resultado em IDP, relatório de jogo ou material para captadores.</p>
        <Link href="/resultado" className="btn btn--primary">
          Ver produtos recomendados
        </Link>
      </section>

      <footer className="landing-footer">
        <p className="footer__slogan">{BRAND.slogan}</p>
        <p className="footer__rights">© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</p>
      </footer>
    </div>
  );
}
