
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const services = await Service.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();

    const service = await Service.create({
      slug: body.slug,
      name: body.name,
      description: body.description,
      details: body.details || "",
      image: body.image,
      duration: body.duration || "",
      price: body.price === "" || body.price == null ? null : Number(body.price),
      category: body.category || "",
      available: Boolean(body.available),
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create service" },
      { status: 400 }
    );
  }
}