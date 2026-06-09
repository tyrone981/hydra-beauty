import { connectDB } from "@/lib/mongodb";
import { Formation } from "@/models/Formation"; 
import Link from "next/link";

export const runtime = "nodejs";

export default async function FormationsPage() {
  await connectDB();

  const docs = await Formation.find({ available: true })
    .sort({ createdAt: -1 })
    .lean();

  const formations = docs.map((formation: any) => ({
    id: formation._id.toString(),
    slug: formation.slug ?? "",
    name: formation.name ?? "",
    description: formation.description ?? "",
    image: formation.image ?? "",
    duration: formation.duration ?? "",
    price: formation.price ?? null,
    category: formation.category ?? "",
  }));

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Nos formations</h1>
        <p className="mt-2 text-gray-500">
          Développez vos compétences grâce à nos programmes d'apprentissage professionnels.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {formations.map((formation) => (
          <Link
            key={formation.id}
            href={`/formations/${formation.slug}`}
            className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="h-56 w-full overflow-hidden">
              <img
                src={formation.image}
                alt={formation.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              {formation.category && (
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                  {formation.category}
                </p>
              )}
              <h2 className="text-lg font-semibold">{formation.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                {formation.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span>{formation.duration || "Durée sur demande"}</span>
                <span className="font-semibold">
                  {formation.price != null ? `${formation.price} FCFA` : "Prix sur demande"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}