"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

export default function Services({
  services,
}: {
  services: Service[];
}) {
  const [selected, setSelected] = useState<null | Service>(null);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#b89a6e]/10 py-32 px-6"
    >
      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#b89a6e]/30 bg-[#111f22]">
            <div className="h-[320px] w-full">
              <Image
                src={selected.image}
                alt={selected.name}
                width={800}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="mb-3 font-cormorant text-3xl italic text-[#f0e8dd]">
                {selected.name}
              </h2>

              <p className="mb-6 leading-7 text-[#c8beb4]">
                {selected.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 rounded-full border border-[#b89a6e] py-3 text-[#b89a6e] transition hover:bg-[#b89a6e] hover:text-[#0d1a1c]"
                >
                  Retour
                </button>

                <a
                  href="https://wa.me/237697839818"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-[#b89a6e] bg-[#b89a6e] py-3 text-center text-[#0d1a1c] transition hover:bg-transparent hover:text-[#b89a6e]"
                >
                  Réserver
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#b89a6e]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#b89a6e]">
              Bien-être & Beauté
            </span>
            <span className="h-px w-8 bg-[#b89a6e]" />
          </div>

          <h2 className="font-cormorant text-5xl italic text-[#f0e8dd] lg:text-6xl">
            Nos <span className="text-[#b89a6e]">Services</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#c8beb4] md:text-base">
            Découvrez nos soins et rituels de beauté conçus pour vous offrir
            détente, bien-être et une expérience de luxe signée Hydra Beauty.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#b89a6e]/15 bg-[#111f22]/70 backdrop-blur-sm transition-all duration-500 hover:border-[#b89a6e] hover:shadow-[0_0_30px_rgba(184,154,110,0.15)]"
            >
              {/* Image */}
              <div
                onClick={() => setSelected(service)}
                className="relative h-64 cursor-pointer overflow-hidden"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a1c] via-[#0d1a1c]/30 to-transparent" />

                {/* Badge */}
                <div className="absolute left-4 top-4 rounded-full border border-[#b89a6e]/30 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#b89a6e] backdrop-blur-md">
                  Soin Premium
                </div>

                {/* Title */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-cormorant text-3xl italic text-[#f0e8dd]">
                    {service.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <p className="line-clamp-2 text-sm leading-7 text-[#c8beb4]">
                  {service.description}
                </p>

                <div className="my-5 h-px bg-[#b89a6e]/15" />

                <div className="mt-auto flex gap-3">
                  <button
                    onClick={() => setSelected(service)}
                    className="flex-1 rounded-xl border border-[#b89a6e]/20 py-3 text-xs uppercase tracking-[0.2em] text-[#b89a6e] transition hover:bg-[#b89a6e] hover:text-[#0d1a1c]"
                  >
                    Découvrir
                  </button>

                  <a
                    href="https://wa.me/237697839818"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl bg-[#b89a6e] py-3 text-center text-xs uppercase tracking-[0.2em] text-[#0d1a1c] transition hover:bg-[#c7aa7d]"
                  >
                    Réserver
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}