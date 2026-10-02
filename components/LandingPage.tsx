import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";
import { PitchGraphic, type PitchVariant } from "@/components/PitchGraphic";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TestCard } from "@/components/TestCard";
import { TACTICAL_CONCEPTS } from "@/lib/concepts";
import { ATE_FRAMEWORK, HOW_IT_WORKS } from "@/lib/home";
import { TACTICAL_TESTS } from "@/lib/tests";

const totalScenarios = TACTICAL_TESTS.reduce((sum, t) => sum + t.questions.length, 0);
type LandingPageProps = {
  athleteTestSlug?: string;
};

export function LandingPage({ athleteTestSlug }: LandingPageProps) {
  const registerHref = "/register";
  const heroTestHref = athleteTestSlug ? `/tests/${athleteTestSlug}` : registerHref;
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container hero">
          <div className="hero__copy">
            <p className="eyebrow">Free tactical IQ tests</p>
            <h1 className="hero__title">
              Train your <span className="hero__accent">tactical brain.</span>
            </h1>
            <p className="hero__lead">
              Read the game, make better decisions, and get noticed.               Register with your position (CB, FB, MF, AMF, WG, ST), take your tailored tactical test, and get SGA
              product recommendations by email.
            </p>
            <div className="hero__ctas">
              <Link href={heroTestHref} className="btn btn--primary btn--lg">
                {athleteTestSlug ? "Take my position test" : "Register & start test"}
              </Link>
              <Link href="#tests" className="btn btn--secondary btn--lg">
                Browse tests
              </Link>
            </div>
            <dl className="hero__stats">
              <div>
                <dt>Tests</dt>
                <dd>{TACTICAL_TESTS.length}</dd>
              </div>
              <div>
                <dt>Scenarios</dt>
                <dd>{totalScenarios}</dd>
              </div>
              <div>
                <dt>Per test</dt>
                <dd>~4 min</dd>
              </div>
            </dl>
          </div>
          <HeroVideo />
        </section>

        <section id="tests" className="section">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Choose your test</p>
              <h2 className="section__title">Position-based tactical tests</h2>
              <p className="section__lead">
                After registration, you take the test mapped to your position. CB and MF scenarios differ — your account
                unlocks only your assigned test.
              </p>
            </div>
            <div className="test-grid">
              {TACTICAL_TESTS.map((test) => (
                <TestCard key={test.slug} test={test} highlight={athleteTestSlug === test.slug} />
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="section section--alt">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">How it works</p>
              <h2 className="section__title">From test to development plan</h2>
            </div>
            <ol className="steps" role="list">
              {HOW_IT_WORKS.map((step) => (
                <li key={step.number} className="step">
                  <span className="step__number">{step.number}</span>
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__body">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="concepts" className="section">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Learn concepts like these</p>
              <h2 className="section__title">Real match analysis</h2>
              <p className="section__lead">
                Guided video breakdowns are on the way. Preview the concepts behind each test.
              </p>
            </div>
            <div className="concept-grid">
              {TACTICAL_CONCEPTS.map((concept) => (
                <Link key={concept.id} href={concept.href} className="concept-card">
                  <div className="concept-card__visual">
                    <PitchGraphic variant={concept.id as PitchVariant} label={concept.title} />
                    <span className="chip chip--solid concept-card__tag">{concept.tag}</span>
                  </div>
                  <div className="concept-card__body">
                    <h3 className="concept-card__title">{concept.title}</h3>
                    <p className="concept-card__desc">{concept.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="section section--alt">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Our methodology</p>
              <h2 className="section__title">The A→T→E framework</h2>
            </div>
            <div className="framework">
              {ATE_FRAMEWORK.map((phase) => (
                <article key={phase.letter} className={`framework__item framework__item--${phase.tone}`}>
                  <span className="framework__letter" aria-hidden="true">
                    {phase.letter}
                  </span>
                  <div>
                    <h3 className="framework__title">{phase.title}</h3>
                    <p className="framework__body">{phase.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="cta-band">
              <div>
                <h2 className="cta-band__title">Ready to be seen by SGA?</h2>
                <p className="cta-band__text">
                  Create your athlete profile with your club and contact details — our team will reach out.
                </p>
              </div>
              <div className="cta-band__actions">
                <Link href={registerHref} className="btn btn--primary btn--lg">
                  Register &amp; take a test
                </Link>
                <Link href="/login" className="btn btn--ghost btn--lg">
                  Already registered? Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
