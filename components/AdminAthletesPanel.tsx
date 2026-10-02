"use client";

import { useEffect, useState } from "react";
import type { AthleteRecord } from "@/lib/athletes";

export function AdminAthletesPanel() {
  const [athletes, setAthletes] = useState<AthleteRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/athletes");
        const data = (await res.json()) as { ok: boolean; athletes?: AthleteRecord[]; error?: string };
        if (!res.ok || !data.ok) {
          setError(data.error ?? "Could not load registrations.");
          return;
        }
        setAthletes(data.athletes ?? []);
      } catch {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  if (loading) {
    return <p className="auth-form__hint">Loading registrations…</p>;
  }

  if (error) {
    return <p className="auth-form__error">{error}</p>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__toolbar">
        <p className="auth-form__hint">{athletes.length} athlete registration(s)</p>
        <button type="button" className="btn btn--ghost" onClick={() => void signOut()}>
          Sign out
        </button>
      </div>

      {athletes.length === 0 ? (
        <p className="auth-form__hint">No registrations yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Club</th>
                <th>Birth year</th>
                <th>Contact</th>
                <th>Message</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {athletes.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.club}</td>
                  <td>{a.birthYear}</td>
                  <td>
                    <a href={contactHref(a.contact)} className="landing-text-link">
                      {a.contact}
                    </a>
                  </td>
                  <td>{a.message ?? "—"}</td>
                  <td>{new Date(a.createdAt).toLocaleString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function contactHref(contact: string): string {
  if (contact.includes("@")) return `mailto:${contact}`;
  const digits = contact.replace(/\D/g, "");
  return digits ? `tel:${digits}` : "#";
}
