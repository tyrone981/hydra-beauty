// app/api/services/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";

type RouteParams = { id: string };

export const runtime = "nodejs";

export async function GET(_req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;

  const service = await Service.findById(id).lean();
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PATCH(req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;
  const body = await req.json();

  try {
    const service = await Service.findByIdAndUpdate(
      id,
      {
        slug: body.slug,
        name: body.name,
        description: body.description,
        details: body.details || "",
        image: body.image,
        duration: body.duration || "",
        price: body.price === "" || body.price == null ? null : Number(body.price),
        category: body.category || "",
        available: Boolean(body.available),
      },
      { new: true, runValidators: true }
    ).lean();

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update service" },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;

  const deleted = await Service.findByIdAndDelete(id).lean?.();
  if (!deleted) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}