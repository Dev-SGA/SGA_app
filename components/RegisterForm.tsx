"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirmPassword") ?? "");
    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const payload = {
      name: String(form.get("name") ?? ""),
      club: String(form.get("club") ?? ""),
      birthYear: Number(form.get("birthYear")),
      contact: String(form.get("contact") ?? ""),
      message: String(form.get("message") ?? ""),
      password,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Registration failed.");
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

  const currentYear = new Date().getFullYear();

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <label className="auth-field">
        <span>Name</span>
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label className="auth-field">
        <span>Club</span>
        <input name="club" type="text" required />
      </label>
      <label className="auth-field">
        <span>Year of birth</span>
        <input
          name="birthYear"
          type="number"
          required
          min={1970}
          max={currentYear}
          placeholder="e.g. 2008"
        />
      </label>
      <label className="auth-field">
        <span>Contact (email or phone)</span>
        <input name="contact" type="text" required autoComplete="email" />
      </label>
      <label className="auth-field">
        <span>Message for SGA (optional)</span>
        <textarea name="message" rows={3} placeholder="How can we help you?" />
      </label>
      <label className="auth-field">
        <span>Password</span>
        <input name="password" type="password" required minLength={8} autoComplete="new-password" />
      </label>
      <label className="auth-field">
        <span>Confirm password</span>
        <input name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" />
      </label>

      {error ? (
        <p className="auth-form__error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
        {loading ? "Creating account…" : "Register & contact SGA"}
      </button>

      <p className="auth-form__footer">
        Already registered?{" "}
        <Link href="/login" className="landing-text-link">
          Sign in
        </Link>
      </p>
    </form>
  );
}
