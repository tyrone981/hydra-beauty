// app/products/page.tsx
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import Galaxy from "@/app/components/Galaxy";
import ProductsPageClient from "./ProductsPageClient";

export const runtime = "nodejs";

export default async function ProductsPage() {
  await connectDB();
  const docs = await Product.find({}).sort({ createdAt: -1 }).lean();

  const products = docs.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    description: p.description ?? "",
    image: p.image ?? "",
    category: p.category ?? "",
    badge: p.badge ?? "",
    slug: p.slug ?? p._id.toString(),
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
          density={0.8}
          glowIntensity={0.25}
          saturation={0.4}
          hueShift={35}
          twinkleIntensity={0.3}
          rotationSpeed={0.06}
          repulsionStrength={2}
          starSpeed={0.4}
          speed={0.8}
          transparent
        />
        <div className="absolute inset-0 bg-[#0d1a1c]/75" />
      </div>

      <ProductsPageClient initialProducts={products} />
    </div>
  );
}