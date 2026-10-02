function trimUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function buildPostgresUrlFromParts(): string | undefined {
  const host = process.env.PGHOST ?? process.env.POSTGRES_HOST;
  const user = process.env.PGUSER ?? process.env.POSTGRES_USER;
  const password = process.env.PGPASSWORD ?? process.env.POSTGRES_PASSWORD;
  const database = process.env.PGDATABASE ?? process.env.POSTGRES_DATABASE;
  if (!host || !user || !password || !database) return undefined;

  const port = process.env.PGPORT ?? process.env.POSTGRES_PORT ?? "5432";
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}?sslmode=require`;
}

/** Pooled Postgres URL (Neon / Vercel Postgres integrations). */
export function getDatabaseUrl(): string | undefined {
  return (
    trimUrl(process.env.DATABASE_URL) ??
    trimUrl(process.env.POSTGRES_URL) ??
    trimUrl(process.env.POSTGRES_PRISMA_URL) ??
    buildPostgresUrlFromParts()
  );
}

/** Direct connection — preferred for DDL (CREATE TABLE). */
export function getDirectDatabaseUrl(): string | undefined {
  return (
    trimUrl(process.env.DATABASE_URL_UNPOOLED) ??
    trimUrl(process.env.POSTGRES_URL_NON_POOLING) ??
    getDatabaseUrl()
  );
}

export function isVercelDeployment(): boolean {
  return Boolean(process.env.VERCEL);
}

export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 16) return secret;
  return "dev-session-secret-change-me";
}

export function getAdminCredentials(): { username: string; password: string } {
  return {
    username: (process.env.ADMIN_USERNAME ?? "admin").trim(),
    password: process.env.ADMIN_PASSWORD ?? "sga-admin-dev",
  };
}
