
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import ProductsSection from "@/app/components/ProductsSection";
import Gallery from "@/app/components/Gallery";
import Abonements from "@/app/components/Abonements";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import { Product } from "@/models/Product";

export const runtime = "nodejs";

export default async function Home() {
  await connectDB();


  const serviceDocs = await Service.find({ available: true })
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

  const services = serviceDocs.map((s: any) => ({
    id: s._id.toString(),
    slug: s.slug ?? "",
    name: s.name ?? "",
    description: s.description ?? "",
    image: s.image ?? "",
  }));


  const productDocs = await Product.find({}).sort({ createdAt: -1 }).limit(8).lean();
  const products = productDocs.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    description: p.description ?? "",
    image: p.image ?? "",
    category: p.category ?? "",
    badge: p.badge ?? "",
    slug: p.slug ?? p._id.toString(),
  }));

  return (
    <main className="bg-dark text-spa overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />

      <Services services={services} />
      <ProductsSection products={products} />
      <Gallery />
      <Abonements />
      <Contact />
      <Footer />
    </main>
  );
}