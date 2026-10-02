"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(form.get("username") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Sign-in failed.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="field">
        <span className="field__label">Username</span>
        <input name="username" type="text" required autoComplete="username" />
      </label>
      <label className="field">
        <span className="field__label">Password</span>
        <input name="password" type="password" required autoComplete="current-password" />
      </label>

      {error ? (
        <p className="form__error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={loading}>
        {loading ? "Signing in…" : "Sign in to admin"}
      </button>

      <p className="form__footer">
        <Link href="/">← Back to site</Link>
      </p>
    </form>
  );
}
