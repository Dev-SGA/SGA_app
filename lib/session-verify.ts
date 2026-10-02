import { jwtVerify } from "jose";

type SessionRole = "athlete" | "admin";

type SessionPayload = {
  role: SessionRole;
  athleteId?: string;
  name?: string;
  position?: string;
};

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  const value = secret && secret.length >= 16 ? secret : "dev-session-secret-change-me";
  return new TextEncoder().encode(value);
}

/** Edge-safe session verification for middleware. */
export async function verifySessionTokenEdge(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    const role = payload.role as SessionRole | undefined;
    if (role !== "athlete" && role !== "admin") return null;
    return {
      role,
      athleteId: typeof payload.athleteId === "string" ? payload.athleteId : undefined,
      name: typeof payload.name === "string" ? payload.name : undefined,
      position: typeof payload.position === "string" ? payload.position : undefined,
    };
  } catch {
    return null;
  }
}
