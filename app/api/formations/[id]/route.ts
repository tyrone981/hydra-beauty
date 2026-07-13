// app/api/Formations/[id]/route.ts
import { connectDB } from "@/lib/mongodb";
import { Formation } from "@/models/Formation";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  
  const deleted = await Formation.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}