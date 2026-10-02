"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productsForProfile } from "@/lib/products";
import { RESULT_STORAGE_KEY, type TestResult } from "@/lib/scoring";

const GRADE_TONES: Record<string, string> = {
  "Above Level": "accent",
  Good: "positive",
  Average: "warn",
  "Below Level": "negative",
};

const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type ResultViewProps = {
  testSlug?: string;
};

export function ResultView({ testSlug }: ResultViewProps) {
  const [result, setResult] = useState<TestResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as TestResult;
        if (!testSlug || parsed.testSlug === testSlug) setResult(parsed);
      }
    } catch {
      setResult(null);
    }
    setReady(true);
  }, [testSlug]);

  if (!ready) {
    return <p className="empty-state">Loading result…</p>;
  }

  if (!result) {
    return (
      <div className="empty-state">
        <p>No recent result on this device. Take a tactical test to see your profile and recommendations.</p>
        <Link href="/#tests" className="btn btn--primary">
          Choose a test
        </Link>
      </div>
    );
  }

  const tone = GRADE_TONES[result.gradeLabel] ?? "accent";
  const products = productsForProfile(result.profileId);
  const dashOffset = RING_CIRCUMFERENCE * (1 - result.score / 100);

  return (
    <div className="result">
      <section className="result__summary card">
        <div className={`score-ring score-ring--${tone}`}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle className="score-ring__track" cx="60" cy="60" r={RING_RADIUS} />
            <circle
              className="score-ring__value"
              cx="60"
              cy="60"
              r={RING_RADIUS}
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="score-ring__label">
            <strong>{result.score}</strong>
            <span>/ 100</span>
          </div>
        </div>

        <div className="result__profile">
          <span className={`chip chip--${tone}`}>{result.gradeLabel}</span>
          <p className="result__test">{result.testTitle}</p>
          <h2 className="result__profile-title">{result.profileTitle}</h2>
          <p className="result__headline">{result.profileHeadline}</p>
          <p className="result__description">{result.profileDescription}</p>
          <div className="result__actions">
            <Link href="/register" className="btn btn--primary">
              Send my profile to SGA
            </Link>
            <Link href={`/tests/${result.testSlug}`} className="btn btn--ghost">
              Retake test
            </Link>
          </div>
        </div>
      </section>

      <section className="result__products">
        <div className="section__head section__head--compact">
          <p className="eyebrow">Recommended for you</p>
          <h2 className="section__title section__title--sm">Next steps with SGA</h2>
        </div>
        <ul className="product-grid" role="list">
          {products.map((product, i) => (
            <li key={product.id}>
              <article className={`product${i === 0 ? " product--featured" : ""}`}>
                {i === 0 ? <span className="chip chip--solid">Best match</span> : null}
                <h3 className="product__name">{product.name}</h3>
                <p className="product__tagline">{product.tagline}</p>
                <p className="product__desc">{product.description}</p>
                <a href={product.href} className="product__cta" target="_blank" rel="noopener noreferrer">
                  {product.ctaLabel} <span aria-hidden="true">→</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
