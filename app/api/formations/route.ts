import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Formation } from "@/models/Formation";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();
  const formations = await Formation.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(formations);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const formation = await Formation.create(body);
  return NextResponse.json(formation, { status: 201 });
}
