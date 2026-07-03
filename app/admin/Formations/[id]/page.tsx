import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import EditFormationForm from "./EditFormationForm";

type RouteParams = { id: string };

export const runtime = "nodejs";

export default async function EditFormationPage(props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { id } = await props.params;

  const doc = await Service.findById(id).lean();

  if (!doc) {
    return <div className="p-8">Formation introuvable.</div>;
  }

  const formation = {
    id: doc._id.toString(),
    slug: doc.slug ?? "",
    name: doc.name ?? "",
    description: doc.description ?? "",
    details: doc.details ?? "",
    image: doc.image ?? "",
    duration: doc.duration ?? "",
    price: doc.price ?? null,
    category: doc.category ?? "Formation",
    available: doc.available ?? true,
  };

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Modifier la formation</h1>
      <EditFormationForm formation={formation} />
    </main>
  );
}