
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import EditProductForm from "./edit/EditProductForm";

type RouteParams = {
  id: string;
};

export const runtime = "nodejs";

export default async function EditProductPage(props: { params: Promise<RouteParams> }) {
  await connectDB();

  const { id } = await props.params;

  const doc = await Product.findById(id).lean();

  if (!doc) {
    return <div className="p-8">Product not found</div>;
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
    images: Array.isArray(doc.images) ? doc.images : [],
    badge: doc.badge ?? "",
    inStock: doc.inStock ?? true,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit product</h1>
      <EditProductForm product={product} />
    </main>
  );
}