import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Formation } from "@/models/Formation";

type RouteParams = { id: string };

export const runtime = "nodejs";

export async function GET(_req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;
  const formation = await Formation.findById(id).lean();
  if (!formation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(formation);
}

export async function PATCH(req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;
  const data = await req.json();

  try {
    const formation = await Formation.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!formation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(formation);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update formation" },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;

  const deleted = await Formation.findByIdAndDelete(id).lean?.();
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
