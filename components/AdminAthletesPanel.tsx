"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { AthleteRecord } from "@/lib/athletes";
import { AdminAthleteManage, type AdminAthleteMode } from "@/components/AdminAthleteManage";

export function AdminAthletesPanel() {
  const [athletes, setAthletes] = useState<AthleteRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [manageId, setManageId] = useState<string | null>(null);
  const [manageMode, setManageMode] = useState<AdminAthleteMode | null>(null);

  const loadAthletes = useCallback(async () => {
    setLoading(true);
    setError(null);
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
  }, []);

  useEffect(() => {
    void loadAthletes();
  }, [loadAthletes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return athletes;
    return athletes.filter((a) =>
      [a.name, a.club, a.position, a.contact, String(a.birthYear), a.message ?? ""].some((v) =>
        v.toLowerCase().includes(q),
      ),
    );
  }, [athletes, query]);

  const clubs = useMemo(() => new Set(athletes.map((a) => a.club.toLowerCase())).size, [athletes]);
  const lastWeek = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return athletes.filter((a) => new Date(a.createdAt).getTime() >= cutoff).length;
  }, [athletes]);

  function openManage(id: string, mode: AdminAthleteMode) {
    setManageId(id);
    setManageMode(mode);
  }

  function closeManage() {
    setManageId(null);
    setManageMode(null);
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  if (loading) return <p className="empty-state">Loading registrations…</p>;
  if (error) return <p className="form__error">{error}</p>;

  return (
    <div className="admin-panel">
      <AdminAthleteManage
        athleteId={manageId}
        mode={manageMode}
        onClose={closeManage}
        onUpdated={(athlete) => {
          setAthletes((rows) => rows.map((r) => (r.id === athlete.id ? athlete : r)));
        }}
        onDeleted={(id) => {
          setAthletes((rows) => rows.filter((r) => r.id !== id));
        }}
      />

      <dl className="stat-grid">
        <div className="stat">
          <dt>Total athletes</dt>
          <dd>{athletes.length}</dd>
        </div>
        <div className="stat">
          <dt>Last 7 days</dt>
          <dd>{lastWeek}</dd>
        </div>
        <div className="stat">
          <dt>Clubs</dt>
          <dd>{clubs}</dd>
        </div>
      </dl>

      <div className="admin-panel__toolbar">
        <input
          type="search"
          className="input"
          placeholder="Search name, club, contact…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search registrations"
        />
        <div className="admin-panel__buttons">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => exportCsv(filtered)}
            disabled={filtered.length === 0}
          >
            Export CSV
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">{athletes.length === 0 ? "No registrations yet." : "No matches for your search."}</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Athlete</th>
                <th>Club</th>
                <th>Pos.</th>
                <th>Born</th>
                <th>Contact</th>
                <th>Registered</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td className="table__strong">{a.name}</td>
                  <td>{a.club}</td>
                  <td>{a.position}</td>
                  <td>{a.birthYear}</td>
                  <td>
                    <a href={contactHref(a.contact)}>{a.contact}</a>
                  </td>
                  <td className="table__muted">
                    {new Date(a.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="table__actions">
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => openManage(a.id, "view")}>
                      View
                    </button>
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => openManage(a.id, "edit")}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm table__danger"
                      onClick={() => openManage(a.id, "delete")}
                    >
                      Delete
                    </button>
                  </td>
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
  const digits = contact.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function exportCsv(rows: AthleteRecord[]) {
  const header = ["Name", "Club", "Position", "Birth year", "Contact", "Message", "Registered"];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [
    header.map(escape).join(","),
    ...rows.map((a) =>
      [a.name, a.club, a.position, a.birthYear, a.contact, a.message, a.createdAt].map(escape).join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sga-athletes-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
