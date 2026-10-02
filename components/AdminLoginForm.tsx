"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "@/components/PasswordInput";

type AdminLoginFormProps = {
  usernameHint: string;
  passwordHint: string;
};

export function AdminLoginForm({ usernameHint, passwordHint }: AdminLoginFormProps) {
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
        credentials: "same-origin",
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
    <>
      <aside className="admin-hint" aria-label="Admin credentials help">
        <p className="admin-hint__title">Staff credentials</p>
        <p>
          <strong>Username:</strong> {usernameHint}
        </p>
        <p>{passwordHint}</p>
        <p className="admin-hint__note">
          If you changed variables on Vercel, redeploy Production after saving. Use Show on the password field to
          verify what you type.
        </p>
      </aside>

      <form className="form" onSubmit={onSubmit}>
        <label className="field">
          <span className="field__label">Username</span>
          <input name="username" type="text" required autoComplete="username" defaultValue={usernameHint} />
        </label>
        <PasswordInput name="password" label="Password" required autoComplete="current-password" />

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
    </>
  );
}
