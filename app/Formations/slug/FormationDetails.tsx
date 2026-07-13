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
    title: doc.title ?? "",
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
    title: item.title ?? "",  // Changed from 'name' to 'title'
    image: item.image ?? "",
    price: item.price ?? null,
  }));

  return (
    <main className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          {formation.image && (
            <div>
              <img
                src={formation.image}
                alt={formation.title}  // Changed from formation.name
                className="h-[420px] w-full rounded-2xl object-cover"
              />
            </div>
          )}

          <div>
            {formation.category && (
              <p className="mb-2 text-sm uppercase tracking-wide text-[#b89a6e]">
                {formation.category}
              </p>
            )}
            <h1 className="text-3xl font-bold">{formation.title}</h1>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-400">
              <span className="rounded-full border border-[#b89a6e]/25 px-3 py-1">
                {formation.duration || "Durée sur demande"}
              </span>
              <span className="rounded-full border border-[#b89a6e]/25 px-3 py-1 font-semibold text-[#b89a6e]">
                {formation.price != null ? `${formation.price.toLocaleString()} FCFA` : "Prix sur demande"}
              </span>
            </div>

            <p className="mt-6 text-gray-300">{formation.description}</p>

            {formation.details && (
              <div className="mt-6 rounded-xl border border-[#b89a6e]/25 p-4 bg-[#111f22]">
                <h2 className="mb-3 text-lg font-semibold">Programme & Détails</h2>
                <ul className="space-y-2 text-gray-300">
                  {formation.details.split(',').map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="text-[#b89a6e]">✦</span>
                      {item.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/237697839818?text=${encodeURIComponent(
                  `Bonjour, je souhaite m'inscrire à la formation : ${formation.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[#b89a6e] px-6 py-3 text-sm font-medium text-[#0d1a1c] hover:bg-[#d1b489] transition"
              >
                S'inscrire via WhatsApp
              </a>
              <Link
                href="/formations"
                className="rounded-lg border border-[#b89a6e]/30 px-6 py-3 text-sm text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
              >
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
                  className="overflow-hidden rounded-xl border border-[#b89a6e]/25 bg-[#111f22] transition hover:border-[#b89a6e]"
                >
                  {item.image && (
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-[#f0e8dd]">{item.title}</h3>
                    {item.price != null && (
                      <p className="mt-1 text-sm text-[#b89a6e]">
                        {item.price.toLocaleString()} FCFA
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}