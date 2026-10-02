import { NextResponse } from "next/server";
import { listAthletes } from "@/lib/athletes";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const athletes = await listAthletes();
  return NextResponse.json({ ok: true, athletes });
}
