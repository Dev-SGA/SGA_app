"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { SGA_GRADE_COLORS } from "@/lib/brand";
import { productsForProfile } from "@/lib/products";
import { RESULT_STORAGE_KEY, type TestResult } from "@/lib/scoring";

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
        if (!testSlug || parsed.testSlug === testSlug) {
          setResult(parsed);
        }
      }
    } catch {
      setResult(null);
    }
    setReady(true);
  }, [testSlug]);

  if (!ready) {
    return <p className="result-loading">Carregando resultado…</p>;
  }

  if (!result) {
    return (
      <div className="result-empty">
        <p>Nenhum resultado recente encontrado. Faça um teste tático para ver seu perfil e produtos recomendados.</p>
        <Link href="/" className="btn btn--primary">
          Escolher teste
        </Link>
      </div>
    );
  }

  const gradeColor =
    SGA_GRADE_COLORS[result.gradeLabel as keyof typeof SGA_GRADE_COLORS] ?? SGA_GRADE_COLORS.Average;
  const products = productsForProfile(result.profileId);

  return (
    <div className="result-grid">
      <section className="result-score card">
        <p className="section-label">Resultado — {result.testTitle}</p>
        <div className="result-score__ring" style={{ "--grade-color": gradeColor } as CSSProperties}>
          <span className="result-score__value">{result.score}</span>
          <span className="result-score__suffix">/ 100</span>
        </div>
        <p className="result-score__grade" style={{ color: gradeColor }}>
          {result.gradeLabel}
        </p>
        <p className="result-score__hint">
          Índice de qualidade das decisões táticas neste teste (escala SGA).
        </p>
        <Link href={`/tests/${result.testSlug}`} className="btn btn--ghost">
          Refazer teste
        </Link>
      </section>

      <section className="result-profile card">
        <p className="section-label">Perfil predominante</p>
        <h2 className="result-profile__title">{result.profileTitle}</h2>
        <p className="result-profile__headline">{result.profileHeadline}</p>
        <p className="result-profile__body">{result.profileDescription}</p>
      </section>

      <section className="result-products">
        <div className="result-products__header">
          <h2 className="result-products__title">Próximo passo com a SGA</h2>
          <p className="result-products__lead">
            Com base no seu perfil, estes produtos ajudam a evoluir o jogo e apresentar seu potencial a clubes.
          </p>
        </div>
        <ul className="product-list" role="list">
          {products.map((product, i) => (
            <li key={product.id}>
              <article className={`product-card${i === 0 ? " product-card--featured" : ""}`}>
                {i === 0 ? <span className="product-card__badge">Recomendado</span> : null}
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__tagline">{product.tagline}</p>
                <p className="product-card__desc">{product.description}</p>
                <a
                  href={product.href}
                  className="btn btn--primary product-card__cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.ctaLabel}
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
