"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "@/components/PasswordInput";
import { ATHLETE_POSITIONS } from "@/lib/positions";

type RegisterFormProps = {
  redirectTo?: string;
};

export function RegisterForm({ redirectTo = "/account" }: RegisterFormProps) {
  const router = useRouter();
  const afterAuth = redirectTo;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password !== String(form.get("confirmPassword") ?? "")) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          club: String(form.get("club") ?? ""),
          birthYear: Number(form.get("birthYear")),
          position: String(form.get("position") ?? ""),
          contact: String(form.get("contact") ?? ""),
          message: String(form.get("message") ?? ""),
          password,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; redirectTo?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Registration failed.");
        return;
      }
      router.push(data.redirectTo ?? afterAuth);
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
        <span className="field__label">Full name</span>
        <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
      </label>

      <div className="form__row">
        <label className="field">
          <span className="field__label">Club</span>
          <input name="club" type="text" required placeholder="Current club" />
        </label>
        <label className="field">
          <span className="field__label">Year of birth</span>
          <input name="birthYear" type="number" required min={1970} max={currentYear} placeholder="2008" />
        </label>
      </div>

      <label className="field">
        <span className="field__label">Position</span>
        <select name="position" required defaultValue="">
          <option value="" disabled>
            Select your position
          </option>
          {ATHLETE_POSITIONS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <span className="field__hint">Your tactical test is tailored to this position.</span>
      </label>

      <label className="field">
        <span className="field__label">Contact</span>
        <input name="contact" type="text" required autoComplete="email" placeholder="Email or phone number" />
        <span className="field__hint">
          Use an email to receive SGA product recommendations after sign-up. You&apos;ll also use this to sign in.
        </span>
      </label>

      <label className="field">
        <span className="field__label">
          Message <em>optional</em>
        </span>
        <textarea name="message" rows={3} placeholder="Goals or how SGA can help you" />
      </label>

      <div className="form__row">
        <PasswordInput name="password" label="Password" required minLength={8} autoComplete="new-password" />
        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>

      {error ? (
        <p className="form__error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </button>

      <p className="form__footer">
        Already registered?{" "}
        <Link href={afterAuth === "/account" ? "/login" : `/login?next=${encodeURIComponent(afterAuth)}`}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
