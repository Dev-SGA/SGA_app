import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";
import { promises as fs } from "fs";
import path from "path";
import { getDatabaseUrl, getDirectDatabaseUrl, isVercelDeployment } from "@/lib/env";
import { parseAthletePosition, type AthletePositionId } from "@/lib/positions";
import { hashPassword, verifyPassword } from "@/lib/password";

export type AthleteRecord = {
  id: string;
  name: string;
  club: string;
  birthYear: number;
  position: AthletePositionId;
  contact: string;
  message: string | null;
  createdAt: string;
};

type AthleteRow = AthleteRecord & { passwordHash: string };

const JSON_PATH = path.join(process.cwd(), "data", "athletes.json");

let schemaReady = false;

const STORAGE_NOT_CONFIGURED =
  "Registration storage is not configured. On Vercel, connect Neon/Postgres and set DATABASE_URL (or use the Vercel Neon integration), then redeploy.";

async function ensureSchema(sql: ReturnType<typeof neon>): Promise<void> {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS athletes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      club TEXT NOT NULL,
      birth_year INTEGER NOT NULL,
      contact TEXT NOT NULL UNIQUE,
      message TEXT,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE athletes ADD COLUMN IF NOT EXISTS position TEXT NOT NULL DEFAULT 'MF'`;
  schemaReady = true;
}

async function withPostgres<T>(
  run: (sql: ReturnType<typeof neon>) => Promise<T>,
  options?: { forSchema?: boolean },
): Promise<T> {
  const dbUrl = options?.forSchema ? getDirectDatabaseUrl() : getDatabaseUrl();
  if (!dbUrl) throw new AthleteAuthError(STORAGE_NOT_CONFIGURED);

  const sql = neon(dbUrl);
  if (!schemaReady) {
    const schemaUrl = getDirectDatabaseUrl() ?? dbUrl;
    const schemaSql = schemaUrl === dbUrl ? sql : neon(schemaUrl);
    await ensureSchema(schemaSql as ReturnType<typeof neon>);
  }
  return run(sql as ReturnType<typeof neon>);
}

function normalizeContact(contact: string): string {
  return contact.trim().toLowerCase();
}

async function readJsonStore(): Promise<AthleteRow[]> {
  try {
    const raw = await fs.readFile(JSON_PATH, "utf8");
    const rows = JSON.parse(raw) as (AthleteRow & { position?: string })[];
    return rows.map((row) => ({
      ...row,
      position: parseAthletePosition(row.position ?? "MF") ?? "MF",
    }));
  } catch {
    return [];
  }
}

async function writeJsonStore(rows: AthleteRow[]): Promise<void> {
  await fs.mkdir(path.dirname(JSON_PATH), { recursive: true });
  await fs.writeFile(JSON_PATH, JSON.stringify(rows, null, 2), "utf8");
}

function rowToPublic(row: AthleteRow): AthleteRecord {
  return {
    id: row.id,
    name: row.name,
    club: row.club,
    birthYear: row.birthYear,
    position: row.position,
    contact: row.contact,
    message: row.message,
    createdAt: row.createdAt,
  };
}

export type RegisterAthleteInput = {
  name: string;
  club: string;
  birthYear: number;
  position: string;
  contact: string;
  message?: string;
  password: string;
};

export class AthleteAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AthleteAuthError";
  }
}

export async function registerAthlete(input: RegisterAthleteInput): Promise<AthleteRecord> {
  const name = input.name.trim();
  const club = input.club.trim();
  const contact = normalizeContact(input.contact);
  const message = input.message?.trim() || null;
  const position = parseAthletePosition(input.position);

  if (!name || !club || !contact) {
    throw new AthleteAuthError("Name, club, and contact are required.");
  }
  if (!position) {
    throw new AthleteAuthError("Select a valid position (CB, FB, MF, AMF, WG, ST).");
  }
  if (
    !Number.isFinite(input.birthYear) ||
    input.birthYear < 1970 ||
    input.birthYear > new Date().getFullYear()
  ) {
    throw new AthleteAuthError("Enter a valid birth year.");
  }
  if (input.password.length < 8) {
    throw new AthleteAuthError("Password must be at least 8 characters.");
  }

  const passwordHash = await hashPassword(input.password);
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  if (getDatabaseUrl()) {
    try {
      await withPostgres(async (sql) => {
        await sql`
          INSERT INTO athletes (id, name, club, birth_year, position, contact, message, password_hash, created_at)
          VALUES (${id}, ${name}, ${club}, ${input.birthYear}, ${position}, ${contact}, ${message}, ${passwordHash}, ${createdAt})
        `;
      });
    } catch (e: unknown) {
      if (e instanceof AthleteAuthError) throw e;
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("unique") || msg.includes("duplicate")) {
        throw new AthleteAuthError("An account with this contact already exists. Sign in instead.");
      }
      console.error("registerAthlete postgres error:", e);
      throw new AthleteAuthError(
        "Could not save your registration to the database. Check DATABASE_URL on Vercel and redeploy.",
      );
    }
    return { id, name, club, birthYear: input.birthYear, position, contact, message, createdAt };
  }

  if (isVercelDeployment()) {
    throw new AthleteAuthError(STORAGE_NOT_CONFIGURED);
  }

  const store = await readJsonStore();
  if (store.some((a) => a.contact === contact)) {
    throw new AthleteAuthError("An account with this contact already exists. Sign in instead.");
  }
  const row: AthleteRow = {
    id,
    name,
    club,
    birthYear: input.birthYear,
    position,
    contact,
    message,
    passwordHash,
    createdAt,
  };
  store.push(row);
  try {
    await writeJsonStore(store);
  } catch (e) {
    console.error("registerAthlete file store error:", e);
    throw new AthleteAuthError(
      "Could not save your registration locally. Configure DATABASE_URL (Neon/Postgres) for production.",
    );
  }
  return rowToPublic(row);
}

export async function authenticateAthlete(
  contact: string,
  password: string,
): Promise<AthleteRecord | null> {
  const normalized = normalizeContact(contact);
  if (getDatabaseUrl()) {
    const rows = (await withPostgres((sql) => sql`
      SELECT id, name, club, birth_year AS "birthYear", position, contact, message,
             password_hash AS "passwordHash", created_at AS "createdAt"
      FROM athletes WHERE contact = ${normalized} LIMIT 1
    `)) as AthleteRow[];
    const row = rows[0];
    if (!row) return null;
    const ok = await verifyPassword(password, row.passwordHash);
    if (!ok) return null;
    row.position = parseAthletePosition(row.position) ?? "MF";
    return rowToPublic(row);
  }

  const store = await readJsonStore();
  const row = store.find((a) => a.contact === normalized);
  if (!row) return null;
  const ok = await verifyPassword(password, row.passwordHash);
  return ok ? rowToPublic(row) : null;
}

export async function listAthletes(): Promise<AthleteRecord[]> {
  if (getDatabaseUrl()) {
    const rows = (await withPostgres((sql) => sql`
      SELECT id, name, club, birth_year AS "birthYear", position, contact, message, created_at AS "createdAt"
      FROM athletes ORDER BY created_at DESC
    `)) as AthleteRecord[];
    return rows.map((row) => ({
      ...row,
      position: parseAthletePosition(row.position) ?? "MF",
    }));
  }
  const store = await readJsonStore();
  return store.map(rowToPublic).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getAthleteById(id: string): Promise<AthleteRecord | null> {
  if (getDatabaseUrl()) {
    const rows = (await withPostgres((sql) => sql`
      SELECT id, name, club, birth_year AS "birthYear", position, contact, message, created_at AS "createdAt"
      FROM athletes WHERE id = ${id} LIMIT 1
    `)) as AthleteRecord[];
    const row = rows[0];
    if (!row) return null;
    return { ...row, position: parseAthletePosition(row.position) ?? "MF" };
  }
  const store = await readJsonStore();
  const row = store.find((a) => a.id === id);
  return row ? rowToPublic(row) : null;
}

export type UpdateAthleteInput = {
  name: string;
  club: string;
  birthYear: number;
  position: string;
  contact: string;
  message?: string;
  password?: string;
};

export async function updateAthlete(id: string, input: UpdateAthleteInput): Promise<AthleteRecord> {
  const existing = await getAthleteById(id);
  if (!existing) {
    throw new AthleteAuthError("Athlete not found.");
  }

  const name = input.name.trim();
  const club = input.club.trim();
  const contact = normalizeContact(input.contact);
  const message = input.message?.trim() || null;
  const position = parseAthletePosition(input.position);

  if (!name || !club || !contact) {
    throw new AthleteAuthError("Name, club, and contact are required.");
  }
  if (!position) {
    throw new AthleteAuthError("Select a valid position (CB, FB, MF, AMF, WG, ST).");
  }
  if (
    !Number.isFinite(input.birthYear) ||
    input.birthYear < 1970 ||
    input.birthYear > new Date().getFullYear()
  ) {
    throw new AthleteAuthError("Enter a valid birth year.");
  }
  if (input.password !== undefined && input.password.length > 0 && input.password.length < 8) {
    throw new AthleteAuthError("Password must be at least 8 characters.");
  }

  const passwordHash =
    input.password && input.password.length >= 8 ? await hashPassword(input.password) : undefined;

  if (getDatabaseUrl()) {
    try {
      if (passwordHash) {
        await withPostgres(async (sql) => {
          await sql`
            UPDATE athletes
            SET name = ${name}, club = ${club}, birth_year = ${input.birthYear}, position = ${position},
                contact = ${contact}, message = ${message}, password_hash = ${passwordHash}
            WHERE id = ${id}
          `;
        });
      } else {
        await withPostgres(async (sql) => {
          await sql`
            UPDATE athletes
            SET name = ${name}, club = ${club}, birth_year = ${input.birthYear}, position = ${position},
                contact = ${contact}, message = ${message}
            WHERE id = ${id}
          `;
        });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("unique") || msg.includes("duplicate")) {
        throw new AthleteAuthError("Another account already uses this contact.");
      }
      throw e;
    }
    const updated = await getAthleteById(id);
    if (!updated) throw new AthleteAuthError("Athlete not found.");
    return updated;
  }

  const store = await readJsonStore();
  const index = store.findIndex((a) => a.id === id);
  if (index < 0) throw new AthleteAuthError("Athlete not found.");

  if (store.some((a) => a.id !== id && a.contact === contact)) {
    throw new AthleteAuthError("Another account already uses this contact.");
  }

  const row = store[index];
  row.name = name;
  row.club = club;
  row.birthYear = input.birthYear;
  row.position = position;
  row.contact = contact;
  row.message = message;
  if (passwordHash) row.passwordHash = passwordHash;
  store[index] = row;
  await writeJsonStore(store);
  return rowToPublic(row);
}

export async function deleteAthlete(id: string): Promise<void> {
  if (getDatabaseUrl()) {
    await withPostgres(async (sql) => {
      await sql`DELETE FROM athletes WHERE id = ${id}`;
    });
    const remaining = await getAthleteById(id);
    if (remaining) throw new AthleteAuthError("Could not delete athlete.");
    return;
  }

  const store = await readJsonStore();
  const next = store.filter((a) => a.id !== id);
  if (next.length === store.length) {
    throw new AthleteAuthError("Athlete not found.");
  }
  await writeJsonStore(next);
}
