// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

type RouteParams = {
  id: string;
};

export async function GET(_req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;

  const product = await Product.findById(id).lean();
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;
  const data = await req.json();

  try {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: NextRequest, props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;

  const deleted = await Product.findByIdAndDelete(id).lean?.();

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}