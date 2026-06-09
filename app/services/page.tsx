
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import Link from "next/link";

export const runtime = "nodejs";

export default async function ServicesPage() {
  await connectDB();

  const docs = await Service.find({ available: true })
    .sort({ createdAt: -1 })
    .lean();

  const services = docs.map((service: any) => ({
    id: service._id.toString(),
    slug: service.slug ?? "",
    name: service.name ?? "",
    description: service.description ?? "",
    image: service.image ?? "",
    duration: service.duration ?? "",
    price: service.price ?? null,
    category: service.category ?? "",
  }));

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Nos services</h1>
        <p className="mt-2 text-gray-500">
          Découvrez nos soins, traitements et prestations beauté.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="h-56 w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              {service.category && (
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                  {service.category}
                </p>
              )}
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                {service.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span>{service.duration || "Durée sur demande"}</span>
                <span className="font-semibold">
                  {service.price != null ? `${service.price} FCFA` : "Prix sur demande"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}