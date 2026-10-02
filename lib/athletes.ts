import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";
import { promises as fs } from "fs";
import path from "path";
import { getDatabaseUrl } from "@/lib/env";
import { hashPassword, verifyPassword } from "@/lib/password";

export type AthleteRecord = {
  id: string;
  name: string;
  club: string;
  birthYear: number;
  contact: string;
  message: string | null;
  createdAt: string;
};

type AthleteRow = AthleteRecord & { passwordHash: string };

const JSON_PATH = path.join(process.cwd(), "data", "athletes.json");

let schemaReady = false;

async function withPostgres<T>(
  run: (sql: ReturnType<typeof neon>) => Promise<T>, // neon() client
): Promise<T> {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) throw new Error("DATABASE_URL is not configured.");
  const sql = neon(dbUrl);
  if (!schemaReady) {
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
    schemaReady = true;
  }
  return run(sql as ReturnType<typeof neon>);
}

function normalizeContact(contact: string): string {
  return contact.trim().toLowerCase();
}

async function readJsonStore(): Promise<AthleteRow[]> {
  try {
    const raw = await fs.readFile(JSON_PATH, "utf8");
    return JSON.parse(raw) as AthleteRow[];
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
    contact: row.contact,
    message: row.message,
    createdAt: row.createdAt,
  };
}

export type RegisterAthleteInput = {
  name: string;
  club: string;
  birthYear: number;
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

  if (!name || !club || !contact) {
    throw new AthleteAuthError("Name, club, and contact are required.");
  }
  if (input.birthYear < 1970 || input.birthYear > new Date().getFullYear()) {
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
          INSERT INTO athletes (id, name, club, birth_year, contact, message, password_hash, created_at)
          VALUES (${id}, ${name}, ${club}, ${input.birthYear}, ${contact}, ${message}, ${passwordHash}, ${createdAt})
        `;
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("unique") || msg.includes("duplicate")) {
        throw new AthleteAuthError("An account with this contact already exists. Sign in instead.");
      }
      throw e;
    }
    return { id, name, club, birthYear: input.birthYear, contact, message, createdAt };
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
    contact,
    message,
    passwordHash,
    createdAt,
  };
  store.push(row);
  await writeJsonStore(store);
  return rowToPublic(row);
}

export async function authenticateAthlete(
  contact: string,
  password: string,
): Promise<AthleteRecord | null> {
  const normalized = normalizeContact(contact);
  if (getDatabaseUrl()) {
    const rows = (await withPostgres((sql) => sql`
      SELECT id, name, club, birth_year AS "birthYear", contact, message,
             password_hash AS "passwordHash", created_at AS "createdAt"
      FROM athletes WHERE contact = ${normalized} LIMIT 1
    `)) as AthleteRow[];
    const row = rows[0];
    if (!row) return null;
    const ok = await verifyPassword(password, row.passwordHash);
    return ok ? rowToPublic(row) : null;
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
      SELECT id, name, club, birth_year AS "birthYear", contact, message, created_at AS "createdAt"
      FROM athletes ORDER BY created_at DESC
    `)) as AthleteRecord[];
    return rows;
  }
  const store = await readJsonStore();
  return store.map(rowToPublic).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getAthleteById(id: string): Promise<AthleteRecord | null> {
  if (getDatabaseUrl()) {
    const rows = (await withPostgres((sql) => sql`
      SELECT id, name, club, birth_year AS "birthYear", contact, message, created_at AS "createdAt"
      FROM athletes WHERE id = ${id} LIMIT 1
    `)) as AthleteRecord[];
    return rows[0] ?? null;
  }
  const store = await readJsonStore();
  const row = store.find((a) => a.id === id);
  return row ? rowToPublic(row) : null;
}
