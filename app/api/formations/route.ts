import { connectDB } from "@/lib/mongodb";
import { Formation } from "@/models/Formation";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();
  const formations = await Formation.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(formations);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  
  const formationData = {
    ...body,
    title: body.title || body.name,
  };
  delete formationData.name;
  
  const formation = await Formation.create(formationData);
  return NextResponse.json(formation, { status: 201 });
}