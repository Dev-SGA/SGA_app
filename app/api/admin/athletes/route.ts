import { NextResponse } from "next/server";
import { listAthletes } from "@/lib/athletes";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const athletes = await listAthletes();
  return NextResponse.json({ ok: true, athletes });
}
