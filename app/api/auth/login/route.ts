import { NextResponse } from "next/server";
import { authenticateAthlete } from "@/lib/athletes";
import { createSessionToken, sessionCookieOptions } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { contact?: string; password?: string };
    const athlete = await authenticateAthlete(body.contact ?? "", body.password ?? "");
    if (!athlete) {
      return NextResponse.json({ ok: false, error: "Invalid contact or password." }, { status: 401 });
    }

    const token = await createSessionToken({
      role: "athlete",
      athleteId: athlete.id,
      name: athlete.name,
    });

    const response = NextResponse.json({ ok: true, athlete });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Sign-in failed." }, { status: 500 });
  }
}
