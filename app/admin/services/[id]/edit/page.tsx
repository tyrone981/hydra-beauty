
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import EditServiceForm from "./EditServiceForm";




type RouteParams = { id: string };

export const runtime = "nodejs";

export default async function EditServicePage(props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;

  const doc = await Service.findById(id).lean();

  if (!doc) {
    return <div className="p-8">Service not found.</div>;
  }

  const service = {
    id: doc._id.toString(),
    slug: doc.slug ?? "",
    name: doc.name ?? "",
    description: doc.description ?? "",
    details: doc.details ?? "",
    image: doc.image ?? "",
    duration: doc.duration ?? "",
    price: doc.price ?? null,
    category: doc.category ?? "",
    available: doc.available ?? true,
  };

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Edit service</h1>
      <EditServiceForm service={service} />
    </main>
  );
}