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
          RECENT TESTS
        </h2>
        <Link href="/result" className="activity__link">
          View result <span aria-hidden="true">→</span>
        </Link>
      </div>

      {loading ? (
        <p className="activity__status" role="status">
          Loading recent tests…
        </p>
      ) : null}

      {!loading && empty ? (
        <p className="activity__status" role="status">
          No completed tests on this device yet. Start with the free test above.
        </p>
      ) : null}

      {!loading && items && items.length > 0 ? (
        <ul className="activity__list" role="list">
          {items.map((item) => (
            <li key={`${item.testSlug}-${item.completedAt}`}>
              <Link href={`/result?test=${item.testSlug}`} className="activity-card">
                <span className="activity-card__score">{item.score}</span>
                <span className="activity-card__body">
                  <strong>{item.testTitle}</strong>
                  <span>{item.profileTitle}</span>
                </span>
                <time className="activity-card__time" dateTime={item.completedAt}>
                  {new Date(item.completedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="activity__note">Completed tests · newest first · approximate completion times</p>
    </section>
  );
}
