"use client";

import { useEffect, useState } from "react";
import type { AthleteRecord } from "@/lib/athletes";
import { PasswordInput } from "@/components/PasswordInput";
import { ATHLETE_POSITIONS, positionLabel, testSlugForPosition } from "@/lib/positions";

export type AdminAthleteMode = "view" | "edit" | "delete";

type AdminAthleteManageProps = {
  athleteId: string | null;
  mode: AdminAthleteMode | null;
  onClose: () => void;
  onUpdated: (athlete: AthleteRecord) => void;
  onDeleted: (id: string) => void;
};

export function AdminAthleteManage({
  athleteId,
  mode,
  onClose,
  onUpdated,
  onDeleted,
}: AdminAthleteManageProps) {
  const [athlete, setAthlete] = useState<AthleteRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!athleteId || !mode) {
      setAthlete(null);
      setError(null);
      return;
    }

    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/athletes/${athleteId}`);
        const data = (await res.json()) as { ok: boolean; athlete?: AthleteRecord; error?: string };
        if (!res.ok || !data.ok || !data.athlete) {
          setError(data.error ?? "Could not load profile.");
          return;
        }
        setAthlete(data.athlete);
      } catch {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    })();
  }, [athleteId, mode]);

  if (!mode || !athleteId) return null;

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!athleteId) return;
    setSaving(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    try {
      const res = await fetch(`/api/admin/athletes/${athleteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          club: String(form.get("club") ?? ""),
          birthYear: Number(form.get("birthYear")),
          position: String(form.get("position") ?? ""),
          contact: String(form.get("contact") ?? ""),
          message: String(form.get("message") ?? ""),
          password: password || undefined,
        }),
      });
      const data = (await res.json()) as { ok: boolean; athlete?: AthleteRecord; error?: string };
      if (!res.ok || !data.ok || !data.athlete) {
        setError(data.error ?? "Update failed.");
        return;
      }
      onUpdated(data.athlete);
      onClose();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!athleteId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/athletes/${athleteId}`, { method: "DELETE" });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Delete failed.");
        return;
      }
      onDeleted(athleteId);
      onClose();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  const title =
    mode === "view" ? "Athlete profile" : mode === "edit" ? "Edit athlete" : "Delete athlete";

  return (
    <div className="admin-modal" role="presentation" onClick={onClose}>
      <div
        className="admin-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-athlete-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="admin-modal__head">
          <h2 id="admin-athlete-title" className="admin-modal__title">
            {title}
          </h2>
          <button type="button" className="admin-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        {loading ? <p className="empty-state">Loading profile…</p> : null}
        {error ? (
          <p className="form__error" role="alert">
            {error}
          </p>
        ) : null}

        {!loading && athlete && mode === "view" ? (
          <div className="admin-profile">
            <dl className="details">
              <div>
                <dt>Name</dt>
                <dd>{athlete.name}</dd>
              </div>
              <div>
                <dt>Club</dt>
                <dd>{athlete.club}</dd>
              </div>
              <div>
                <dt>Position</dt>
                <dd>{positionLabel(athlete.position)}</dd>
              </div>
              <div>
                <dt>Year of birth</dt>
                <dd>{athlete.birthYear}</dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>{athlete.contact}</dd>
              </div>
              <div>
                <dt>Assigned test</dt>
                <dd>{testSlugForPosition(athlete.position)}</dd>
              </div>
              <div>
                <dt>Registered</dt>
                <dd>{new Date(athlete.createdAt).toLocaleString("en-US")}</dd>
              </div>
              {athlete.message ? (
                <div className="details__full">
                  <dt>Message</dt>
                  <dd>{athlete.message}</dd>
                </div>
              ) : null}
            </dl>
            <div className="admin-modal__actions">
              <button type="button" className="btn btn--secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : null}

        {!loading && athlete && mode === "edit" ? (
          <form className="form admin-modal__form" onSubmit={(e) => void handleEditSubmit(e)}>
            <label className="field">
              <span className="field__label">Full name</span>
              <input name="name" type="text" required defaultValue={athlete.name} />
            </label>
            <div className="form__row">
              <label className="field">
                <span className="field__label">Club</span>
                <input name="club" type="text" required defaultValue={athlete.club} />
              </label>
              <label className="field">
                <span className="field__label">Year of birth</span>
                <input
                  name="birthYear"
                  type="number"
                  required
                  min={1970}
                  max={currentYear}
                  defaultValue={athlete.birthYear}
                />
              </label>
            </div>
            <label className="field">
              <span className="field__label">Position</span>
              <select name="position" required defaultValue={athlete.position}>
                {ATHLETE_POSITIONS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="field__label">Contact</span>
              <input name="contact" type="text" required defaultValue={athlete.contact} />
            </label>
            <label className="field">
              <span className="field__label">
                Message <em>optional</em>
              </span>
              <textarea name="message" rows={3} defaultValue={athlete.message ?? ""} />
            </label>
            <PasswordInput
              name="password"
              label="New password (optional)"
              minLength={8}
              autoComplete="new-password"
              placeholder="Leave blank to keep current"
            />
            <div className="admin-modal__actions">
              <button type="button" className="btn btn--ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary" disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        ) : null}

        {!loading && athlete && mode === "delete" ? (
          <div className="admin-delete">
            <p>
              Permanently remove <strong>{athlete.name}</strong> ({athlete.contact})? This cannot be undone.
            </p>
            <div className="admin-modal__actions">
              <button type="button" className="btn btn--ghost" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--primary btn--danger"
                disabled={saving}
                onClick={() => void handleDeleteConfirm()}
              >
                {saving ? "Deleting…" : "Delete athlete"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
