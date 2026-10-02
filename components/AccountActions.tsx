"use client";

export function AccountActions() {
  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="account-actions">
      <a href="https://sgaperformance.com" className="btn btn--primary" target="_blank" rel="noopener noreferrer">
        Contact SGA Performance
      </a>
      <button type="button" className="btn btn--ghost" onClick={() => void signOut()}>
        Sign out
      </button>
    </div>
  );
}
