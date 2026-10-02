"use client";

import Link from "next/link";

type AccountActionsProps = {
  testHref: string;
};

export function AccountActions({ testHref }: AccountActionsProps) {
  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="account-actions">
      <Link href={testHref} className="btn btn--primary btn--block">
        Take my position test
      </Link>
      <div className="account-actions__row">
        <a href="https://sgaperformance.com" className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
          Contact SGA
        </a>
        <button type="button" className="btn btn--ghost" onClick={() => void signOut()}>
          Sign out
        </button>
      </div>
    </div>
  );
}
