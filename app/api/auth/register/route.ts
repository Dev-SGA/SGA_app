import { NextResponse } from "next/server";
import { AthleteAuthError, registerAthlete } from "@/lib/athletes";
import { createSessionToken, sessionCookieOptions } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      club?: string;
      birthYear?: number;
      contact?: string;
      message?: string;
      password?: string;
    };

    const athlete = await registerAthlete({
      name: body.name ?? "",
      club: body.club ?? "",
      birthYear: Number(body.birthYear),
      contact: body.contact ?? "",
      message: body.message,
      password: body.password ?? "",
    });

    const token = await createSessionToken({
      role: "athlete",
      athleteId: athlete.id,
      name: athlete.name,
    });

    const response = NextResponse.json({ ok: true, athlete });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (e) {
    if (e instanceof AthleteAuthError) {
      const status = e.message.includes("not configured") ? 503 : 400;
      return NextResponse.json({ ok: false, error: e.message }, { status });
    }
    console.error(e);
    return NextResponse.json({ ok: false, error: "Registration failed." }, { status: 500 });
  }
}
