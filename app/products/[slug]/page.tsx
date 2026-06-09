
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import Galaxy from "@/app/components/Galaxy";
import ProductDetailClient from "./ProductDetailClient";

export const runtime = "nodejs";

type RouteParams = {
  slug: string;
};

export default async function ProductDetailPage(props: { params: Promise<RouteParams> }) {
  await connectDB();

  const { slug } = await props.params;

  const doc = await Product.findOne({ slug }).lean();
  if (!doc) {
    return notFound();
  }

  
  const product = {
    id: doc._id.toString(),
    slug: doc.slug ?? "",
    name: doc.name ?? "",
    category: doc.category ?? "",
    price: Number(doc.price ?? 0),
    description: doc.description ?? "",
    details: doc.details ?? "",
    image: doc.image ?? "",
    images: Array.isArray((doc as any).images) ? (doc as any).images : [],
    badge: doc.badge ?? "",
    inStock: doc.inStock ?? true,
  };

  const relatedDocs = await Product.find({
    _id: { $ne: doc._id },
    category: doc.category,
  })
    .limit(3)
    .lean();

  const related = relatedDocs.map((p: any) => ({
    id: p._id.toString(),
    slug: p.slug ?? "",
    name: p.name ?? "",
    category: p.category ?? "",
    price: Number(p.price ?? 0),
    description: p.description ?? "",
    details: p.details ?? "",
    image: p.image ?? "",
    images: Array.isArray(p.images) ? p.images : [],
    badge: p.badge ?? "",
    inStock: p.inStock ?? true,
  }));

  return (
    <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] relative overflow-hidden">
      <Navbar />
      <CartDrawer />

      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={0.6}
          glowIntensity={0.2}
          saturation={0.4}
          hueShift={35}
          twinkleIntensity={0.25}
          rotationSpeed={0.04}
          repulsionStrength={1.5}
          starSpeed={0.3}
          speed={0.6}
          transparent
        />
        <div className="absolute inset-0 bg-[#0d1a1c]/80" />
      </div>

      <ProductDetailClient product={product} related={related} />
    </div>
  );
}