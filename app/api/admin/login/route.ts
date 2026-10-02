import { NextResponse } from "next/server";
import { getAdminCredentials } from "@/lib/env";
import { createSessionToken, sessionCookieOptions } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const { username, password } = getAdminCredentials();

    if (body.username !== username || body.password !== password) {
      return NextResponse.json({ ok: false, error: "Invalid admin credentials." }, { status: 401 });
    }

    const token = await createSessionToken({ role: "admin" });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Admin sign-in failed." }, { status: 500 });
  }
}
