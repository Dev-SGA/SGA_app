import { getAdminCredentials } from "@/lib/env";

export function getAdminLoginHint() {
  const { username, password } = getAdminCredentials();
  const customPassword = Boolean(process.env.ADMIN_PASSWORD?.trim());

  return {
    username,
    passwordHint: customPassword
      ? "Password is stored in Vercel → Project → Settings → Environment Variables → ADMIN_PASSWORD. Use the eye icon there to reveal it."
      : `Default password (until you set ADMIN_PASSWORD): ${password}`,
    customPassword,
  };
}
