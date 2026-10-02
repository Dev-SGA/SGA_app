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
        Skip to tests
      </a>

      <nav aria-label="Sections" className="landing-nav">
        <a href="#start">Start free</a>
        <a href="#concepts">The game</a>
        <a href="#framework">Our method</a>
      </nav>

      <div className="landing-top-actions">
        <Link href="/login" className="landing-text-link">
          Sign in
        </Link>
        <Link href="/register" className="btn btn--secondary btn--sm">
          Register
        </Link>
      </div>

      <header className="landing-hero">
        <Link href="/" className="landing-hero__logo" aria-label={`${BRAND.name} — home`}>
          <SgaLogo variant="horizontal" size="hero" priority />
        </Link>

        <h1 className="landing-hero__title">
          TRAIN YOUR
          <br />
          <span className="landing-hero__accent">TACTICAL BRAIN</span>
        </h1>

        <p className="landing-hero__lead">
          Read the game. Make better decisions. Start with the free tactical test, then explore SGA products to
          develop and showcase your profile to clubs.
        </p>

        <div className="landing-hero__ctas">
          <Link href={`/tests/${PRIMARY_TEST_SLUG}`} className="btn btn--primary btn--lg">
            Take the free test
          </Link>
          <Link href="/result" className="btn btn--secondary btn--lg">
            View my result
          </Link>
        </div>

        <HeroVideo />
      </header>

      <RecentTestsPanel />

      <section id="start" className="landing-section landing-section--wide">
        <div className="landing-section__intro">
          <h2 className="landing-section__title">START FREE</h2>
          <p className="landing-section__subtitle">
            Your first steps: test your reading, review your result, and explore concepts for your profile.
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

      <section id="catalog" className="landing-section landing-section--wide">
        <div className="landing-section__intro">
          <p className="landing-section__eyebrow">SGA catalog</p>
          <h2 className="landing-section__title">AVAILABLE TESTS</h2>
          <p className="landing-section__subtitle">
            Micro tests by phase of play — situational videos will be added soon.
          </p>
        </div>
        <div className="catalog-grid">
          {TACTICAL_TESTS.map((test) => (
            <Link key={test.slug} href={`/tests/${test.slug}`} className="catalog-card">
              <span className="catalog-card__phase">{test.phase}</span>
              <h3 className="catalog-card__title">{test.title}</h3>
              <p className="catalog-card__meta">
                {test.questions.length} scenarios · ~{test.durationMinutes} min
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="concepts" className="landing-section landing-section--wide">
        <div className="landing-section__intro">
          <p className="landing-section__eyebrow">Learn concepts like these</p>
          <h2 className="landing-section__title">REAL MATCH ANALYSIS</h2>
          <p className="landing-section__subtitle">
            Explore the game through tactical concepts and guided animations (video content coming soon).
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
          <h2 className="landing-section__title access__title">Pick up where you left off.</h2>
          <p>Results are saved in this browser until you complete a new test.</p>
          <Link href="/result" className="btn btn--secondary">
            Open result
          </Link>
        </div>
        <div className="access__card card">
          <h3>Already taken a test?</h3>
          <p className="access__card-text">Review your score, tactical profile, and recommended SGA Performance products.</p>
          <Link href="/result" className="btn btn--primary">
            View profile & products
          </Link>
        </div>
      </section>

      <section id="framework" className="landing-section landing-section--wide">
        <div className="landing-section__intro">
          <p className="landing-section__eyebrow landing-section__eyebrow--muted">Our methodology</p>
          <h2 className="landing-section__title">THE A→T→E FRAMEWORK</h2>
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
        <h2 className="hub__title">Next step with SGA</h2>
        <p>Turn your result into an IDP, match report, or scouting materials.</p>
        <Link href="/result" className="btn btn--primary">
          View recommended products
        </Link>
      </section>

      <footer className="landing-footer">
        <p className="footer__slogan">{BRAND.slogan}</p>
        <p className="footer__rights">© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</p>
      </footer>
    </div>
  );
}
