// app/admin/services/page.tsx
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import Link from "next/link";

export const runtime = "nodejs";

export default async function AdminServicesPage() {
  await connectDB();

  const docs = await Service.find({}).sort({ createdAt: -1 }).lean();

  const services = docs.map((s: any) => ({
    id: s._id.toString(),
    slug: s.slug ?? "",
    name: s.name ?? "",
    image: s.image ?? "",
    available: s.available ?? true,
    category: s.category ?? "",
    price: s.price ?? null,
  }));

  return (
    <main className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Services</h1>
            <p className="mt-1 text-sm text-gray-400">
              Gérer les services affichés sur le site.
            </p>
          </div>
          <Link
            href="/admin/services/new"
            className="rounded-lg bg-[#b89a6e] px-4 py-2 text-sm font-medium text-[#0d1a1c] hover:bg-[#d1b489] transition"
          >
            + Nouveau service
          </Link>
        </div>

        {services.length === 0 ? (
          <p className="text-sm text-gray-400">
            Aucun service pour le moment. Créez votre premier service.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col overflow-hidden rounded-xl border border-[#b89a6e]/25 bg-[#111f22]"
              >
                <div className="h-40 w-full overflow-hidden bg-black/20">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                      Pas d&apos;image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#b89a6e]/80">
                    {service.category || "Service"}
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-[#f0e8dd]">
                    {service.name}
                  </h2>
                  {service.price != null && (
                    <p className="mt-1 text-sm text-[#c8beb4]">
                      {service.price.toLocaleString()} FCFA
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    {service.available ? "Disponible" : "Indisponible"}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/admin/services/${service.id}/edit`}
                      className="flex-1 rounded-lg border border-[#b89a6e]/50 px-3 py-2 text-center text-xs text-[#f0e8dd] hover:border-[#b89a6e]"
                    >
                      Modifier
                    </Link>
                    {/* <Link
                      href={`/services/${service.slug}`}
                      className="flex-1 rounded-lg border border-gray-500 px-3 py-2 text-center text-xs text-gray-300 hover:border-[#b89a6e]"
                    >
                      Voir
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}