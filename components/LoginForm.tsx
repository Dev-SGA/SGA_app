"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo = "/account" }: LoginFormProps) {
  const router = useRouter();
  const afterAuth = redirectTo;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: String(form.get("contact") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Sign-in failed.");
        return;
      }
      router.push(afterAuth);
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
        <span className="field__label">Contact</span>
        <input name="contact" type="text" required autoComplete="username" placeholder="Email or phone number" />
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
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="form__footer">
        New athlete?{" "}
        <Link href={afterAuth === "/account" ? "/register" : `/register?next=${encodeURIComponent(afterAuth)}`}>
          Create an account
        </Link>
      </p>
    </form>
  );
}
