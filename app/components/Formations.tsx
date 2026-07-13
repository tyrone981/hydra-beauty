"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

type Formation = {
  id: string;
  slug: string;
  title: string;
  description: string;
  details?: string;
  image?: string;
  duration?: string;
  price?: number | null;
  category?: string;
};

export default function Formations({
  formations,
}: {
  formations: Formation[];
}) {
  const router = useRouter();

  if (!formations || formations.length === 0) {
    return null;
  }

  const handleInscription = (
    e: React.MouseEvent,
    slug: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/formations/${slug}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#b89a6e]/10 py-32 px-6">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b89a6e]/10 via-[#0d1a1c] to-[#b89a6e]/10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#b89a6e]" />
            <span className="text-[#b89a6e] text-xs tracking-[0.3em] uppercase">
              Formations & Packs
            </span>
            <span className="w-8 h-px bg-[#b89a6e]" />
          </div>

          <h2 className="font-cormorant italic text-5xl lg:text-6xl text-[#f0e8dd]">
            Nos <span className="text-[#b89a6e]">Formations</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {formations.map((formation, i) => {
            const featured = i === 1;
            const modules =
              formation.details
                ?.split(",")
                .map((item) => item.trim())
                .filter(Boolean) || [];

            return (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                onClick={() =>
                  router.push(`/formations/${formation.slug}`)
                }
                className={`relative flex h-full flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                  featured
                    ? "bg-[#b89a6e] text-[#0d1a1c] border-[#b89a6e]"
                    : "bg-[#111f22]/70 text-[#f0e8dd] border-[#b89a6e]/15 hover:border-[#b89a6e]"
                } hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]`}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 bg-[#0d1a1c] text-[#b89a6e] text-[10px] px-4 py-1 uppercase border border-[#b89a6e]/40 rounded-full whitespace-nowrap">
                    Le Plus Populaire
                  </div>
                )}

                {formation.image && (
                  <div className="relative h-56 overflow-hidden border-b border-[#b89a6e]/15">
                    <Image
                      src={formation.image}
                      alt={formation.title}
                      fill
                      sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-8">
                  {formation.category && (
                    <p
                      className={`text-xs tracking-[0.2em] uppercase mb-3 ${
                        featured
                          ? "text-[#0d1a1c]/80"
                          : "text-[#b89a6e]"
                      }`}
                    >
                      {formation.category}
                    </p>
                  )}

                  <h3
                    className={`font-cormorant italic text-3xl leading-tight mb-4 ${
                      featured
                        ? "text-[#0d1a1c]"
                        : "text-[#f0e8dd]"
                    }`}
                  >
                    {formation.title}
                  </h3>

                  <p
                    className={`text-sm leading-7 mb-6 ${
                      featured
                        ? "text-[#0d1a1c]/80"
                        : "text-[#c8beb4]"
                    }`}
                  >
                    {formation.description}
                  </p>

                  {modules.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {modules.map((module, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs border transition-all ${
                            featured
                              ? "border-[#0d1a1c]/20 bg-[#0d1a1c]/10 text-[#0d1a1c]"
                              : "border-[#b89a6e]/20 bg-[#b89a6e]/5 text-[#c8beb4]"
                          }`}
                        >
                          ✦ {module}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    className={`w-full h-px mb-6 ${
                      featured
                        ? "bg-[#0d1a1c]/20"
                        : "bg-[#b89a6e]/20"
                    }`}
                  />

                  <div className="mt-auto">
                    <p
                      className={`text-[11px] uppercase tracking-[0.25em] mb-2 ${
                        featured
                          ? "text-[#0d1a1c]/70"
                          : "text-[#b89a6e]"
                      }`}
                    >
                      Investissement
                    </p>

                    <div className="flex items-end gap-1 mb-2">
                      <span
                        className={`font-cormorant text-4xl ${
                          featured
                            ? "text-[#0d1a1c]"
                            : "text-[#f0e8dd]"
                        }`}
                      >
                        {formation.price
                          ? formation.price.toLocaleString()
                          : "Prix"}
                      </span>

                      <span
                        className={`text-xs mb-1 ${
                          featured
                            ? "text-[#0d1a1c]/70"
                            : "text-[#c8beb4]"
                        }`}
                      >
                        {formation.price
                          ? "FCFA"
                          : "Sur demande"}
                      </span>
                    </div>

                    <p
                      className={`text-xs mb-8 ${
                        featured
                          ? "text-[#0d1a1c]/70"
                          : "text-[#c8beb4]"
                      }`}
                    >
                      {formation.duration ||
                        "Durée flexible"}
                    </p>

                    <button
                      onClick={(e) =>
                        handleInscription(
                          e,
                          formation.slug
                        )
                      }
                      className={`w-full py-3 rounded-xl text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
                        featured
                          ? "bg-[#0d1a1c] text-[#b89a6e] border-[#0d1a1c] hover:bg-transparent hover:text-[#0d1a1c]"
                          : "border-[#b89a6e]/30 text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c]"
                      }`}
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {formations.length > 4 && (
          <div className="flex justify-center mt-12">
            <Link
              href="/formations"
              className="px-8 py-3 rounded-full border border-[#b89a6e] text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] text-sm tracking-[0.25em] uppercase transition-all duration-300"
            >
              Voir Toutes Les Formations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}