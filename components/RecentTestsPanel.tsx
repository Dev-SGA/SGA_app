"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RECENT_RESULTS_KEY, type RecentResultEntry } from "@/lib/activity";

/** Only renders when this browser has completed tests. */
export function RecentTestsPanel() {
  const [items, setItems] = useState<RecentResultEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_RESULTS_KEY);
      setItems(raw ? (JSON.parse(raw) as RecentResultEntry[]) : []);
    } catch {
      setItems([]);
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="container recent" aria-labelledby="recent-title">
      <div className="recent__inner">
        <h2 id="recent-title" className="recent__title">
          Your recent results
        </h2>
        <ul className="recent__list" role="list">
          {items.map((item) => (
            <li key={`${item.testSlug}-${item.completedAt}`}>
              <Link href={`/result?test=${item.testSlug}`} className="recent__item">
                <span className="recent__score">{item.score}</span>
                <span className="recent__text">
                  <strong>{item.testTitle}</strong>
                  <span>{item.profileTitle}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
