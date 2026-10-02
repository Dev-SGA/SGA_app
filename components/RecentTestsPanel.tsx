"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RECENT_RESULTS_KEY, type RecentResultEntry } from "@/lib/activity";

export function RecentTestsPanel() {
  const [items, setItems] = useState<RecentResultEntry[] | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_RESULTS_KEY);
      setItems(raw ? (JSON.parse(raw) as RecentResultEntry[]) : []);
    } catch {
      setItems([]);
    }
  }, []);

  const loading = items === null;
  const empty = items !== null && items.length === 0;

  return (
    <section id="recent-activity" className="landing-section activity" aria-labelledby="activity-title">
      <div className="activity__header">
        <h2 id="activity-title" className="landing-section__title">
          TESTES RECENTES
        </h2>
        <Link href="/resultado" className="activity__link">
          Ver resultado <span aria-hidden="true">→</span>
        </Link>
      </div>

      {loading ? (
        <p className="activity__status" role="status">
          Carregando testes recentes…
        </p>
      ) : null}

      {!loading && empty ? (
        <p className="activity__status" role="status">
          Nenhum teste concluído neste dispositivo ainda. Comece pelo teste gratuito acima.
        </p>
      ) : null}

      {!loading && items && items.length > 0 ? (
        <ul className="activity__list" role="list">
          {items.map((item) => (
            <li key={`${item.testSlug}-${item.completedAt}`}>
              <Link href={`/resultado?test=${item.testSlug}`} className="activity-card">
                <span className="activity-card__score">{item.score}</span>
                <span className="activity-card__body">
                  <strong>{item.testTitle}</strong>
                  <span>{item.profileTitle}</span>
                </span>
                <time className="activity-card__time" dateTime={item.completedAt}>
                  {new Date(item.completedAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                  })}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="activity__note">Testes concluídos · mais recentes primeiro · horários aproximados</p>
    </section>
  );
}
