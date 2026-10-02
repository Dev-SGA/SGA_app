"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      contact: String(form.get("contact") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Sign-in failed.");
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <label className="auth-field">
        <span>Contact (email or phone)</span>
        <input name="contact" type="text" required autoComplete="username" />
      </label>
      <label className="auth-field">
        <span>Password</span>
        <input name="password" type="password" required autoComplete="current-password" />
      </label>

      {error ? (
        <p className="auth-form__error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="auth-form__footer">
        New athlete?{" "}
        <Link href="/register" className="landing-text-link">
          Create an account
        </Link>
      </p>
    </form>
  );
}
