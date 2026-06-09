import { connectDB } from "@/lib/mongodb";
import { Formation } from "@/models/Formation";
import { notFound } from "next/navigation";
import Link from "next/link";

export const runtime = "nodejs";

type RouteParams = { slug: string };

export default async function FormationDetailPage(props: { params: Promise<RouteParams> }) {
  await connectDB();
  const { slug } = await props.params;

  const doc = await Formation.findOne({ slug }).lean();
  if (!doc) return notFound();

  const formation = {
    id: doc._id.toString(),
    slug: doc.slug ?? "",
    name: doc.name ?? "",
    description: doc.description ?? "",
    details: doc.details ?? "",
    image: doc.image ?? "",
    duration: doc.duration ?? "",
    price: doc.price ?? null,
    category: doc.category ?? "",
  };

  const relatedDocs = await Formation.find({
    _id: { $ne: doc._id },
    available: true,
    ...(doc.category ? { category: doc.category } : {}),
  })
    .limit(3)
    .lean();

  const related = relatedDocs.map((item: any) => ({
    id: item._id.toString(),
    slug: item.slug ?? "",
    name: item.name ?? "",
    image: item.image ?? "",
    price: item.price ?? null,
  }));

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={formation.image}
            alt={formation.name}
            className="h-[420px] w-full rounded-2xl object-cover"
          />
        </div>

        <div>
          {formation.category && (
            <p className="mb-2 text-sm uppercase tracking-wide text-gray-500">
              {formation.category}
            </p>
          )}
          <h1 className="text-3xl font-bold">{formation.name}</h1>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="rounded-full border px-3 py-1">
              {formation.duration || "Durée sur demande"}
            </span>
            <span className="rounded-full border px-3 py-1">
              {formation.price != null ? `${formation.price} FCFA` : "Prix sur demande"}
            </span>
          </div>

          <p className="mt-6 text-gray-700">{formation.description}</p>

          {formation.details && (
            <div className="mt-6 rounded-xl border p-4">
              <h2 className="mb-2 text-lg font-semibold">Programme & Détails</h2>
              <p className="text-gray-700 whitespace-pre-line">{formation.details}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/237697839818?text=${encodeURIComponent(
                `Bonjour, je souhaite m'inscrire à la formation : ${formation.name}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800"
            >
              S'inscrire via WhatsApp
            </a>
            <Link href="/formations" className="rounded-lg border px-5 py-3 transition hover:bg-gray-50">
              Retour aux formations
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-semibold">Formations similaires</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/formations/${item.slug}`}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.price != null && (
                    <p className="mt-1 text-sm text-gray-600">
                      {item.price.toLocaleString()} FCFA
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}