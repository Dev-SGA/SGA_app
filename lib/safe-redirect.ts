/** Allow only same-origin relative paths (no open redirects). */
export function safeRedirectPath(
  next: string | null | undefined,
  fallback = "/account",
): string {
  if (!next || typeof next !== "string") return fallback;
  const path = next.trim();
  if (!path.startsWith("/") || path.startsWith("//")) return fallback;
  if (path.startsWith("/admin")) return fallback;
  return path;
}
