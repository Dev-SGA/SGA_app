import { NextResponse } from "next/server";
import {
  AthleteAuthError,
  deleteAthlete,
  getAthleteById,
  updateAthlete,
} from "@/lib/athletes";
import { requireAdminSession } from "@/lib/admin-session";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await context.params;
  const athlete = await getAthleteById(id);
  if (!athlete) {
    return NextResponse.json({ ok: false, error: "Athlete not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, athlete });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await context.params;
  try {
    const body = (await request.json()) as {
      name?: string;
      club?: string;
      birthYear?: number;
      position?: string;
      contact?: string;
      message?: string;
      password?: string;
    };
    const athlete = await updateAthlete(id, {
      name: body.name ?? "",
      club: body.club ?? "",
      birthYear: Number(body.birthYear),
      position: body.position ?? "",
      contact: body.contact ?? "",
      message: body.message,
      password: body.password,
    });
    return NextResponse.json({ ok: true, athlete });
  } catch (e) {
    if (e instanceof AthleteAuthError) {
      return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json({ ok: false, error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await context.params;
  try {
    await deleteAthlete(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AthleteAuthError) {
      const status = e.message.includes("not found") ? 404 : 400;
      return NextResponse.json({ ok: false, error: e.message }, { status });
    }
    console.error(e);
    return NextResponse.json({ ok: false, error: "Delete failed." }, { status: 500 });
  }
}
