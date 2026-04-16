"use client"

import { motion } from "framer-motion"

const packs = [
  {
    name: "Pack Cosmétiques",
    price: "50.000",
    features: ["Composition du gommage corporel", "Épilation"],
    featured: false,
  },
  {
    name: "Pack de Soins",
    price: "50.000",
    features: ["Étude de la peau", "Massage", "Soin du visage"],
    featured: true,
  },
  {
    name: "Pack Soins",
    price: "50.000",
    features: ["Manucure", "Pédicure", "Gommage"],
    featured: false,
  },
  {
    name: "Pack Coiffure",
    price: "100.000",
    features: ["Onglerie et make-up", "Tresses et pose perruque", "Coiffure de mariée"],
    featured: false,
  },
]

export default function Abonements() {
  return (
    <section id="abonements" className="relative overflow-hidden bg-[#b89a6e]/10 py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#b89a6e]/15 via-[#0d1a1c]/70 to-[#b89a6e]/10 pointer-events-none" />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {packs.map((pack, i) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`
                relative flex flex-col p-8 rounded-xl cursor-pointer
                transition-all duration-300 border
                hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]
                group

                ${
                  pack.featured
                    ? "bg-[#b89a6e] text-[#0d1a1c] border-[#b89a6e]"
                    : "bg-[#111f22]/70 text-[#f0e8dd] border-[#b89a6e]/15 hover:border-[#b89a6e]"
                }
              `}
            >
              {pack.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0d1a1c] text-[#b89a6e] text-[10px] px-4 py-1 uppercase border border-[#b89a6e]/40">
                  Le Plus Populaire
                </div>
              )}

              <p className={`
                text-xs tracking-[0.2em] uppercase mb-3
                ${pack.featured ? "text-[#0d1a1c]/80" : "text-[#b89a6e]"}
              `}>
                {pack.name}
              </p>

              <div className="flex items-end gap-1 mb-6">
                <span className={`
                  text-4xl
                  ${pack.featured ? "text-[#0d1a1c]" : "text-[#f0e8dd]"}
                `}>
                  {pack.price}
                </span>

                <span className={`
                  text-xs mb-1
                  ${pack.featured ? "text-[#0d1a1c]/70" : "text-[#c8beb4]"}
                `}>
                  FCFA
                </span>
              </div>

              <div className={`
                w-8 h-px mb-6
                ${pack.featured ? "bg-[#0d1a1c]/30" : "bg-[#b89a6e]/30"}
              `} />

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {pack.features.map((feature) => (
                  <li
                    key={feature}
                    className={`
                      flex items-start gap-3 text-sm
                      ${pack.featured ? "text-[#0d1a1c]/80" : "text-[#c8beb4]"}
                    `}
                  >
                    <span className={pack.featured ? "text-[#0d1a1c]" : "text-[#b89a6e]"}>
                      ✦
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/237697839818"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  text-center py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-300
                  ${
                    pack.featured
                      ? "bg-[#0d1a1c] text-[#b89a6e] border-[#0d1a1c] hover:bg-transparent hover:text-[#0d1a1c] hover:border-[#0d1a1c]"
                      : "border-[#b89a6e]/30 text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c]"
                  }
                `}
              >
                S'inscrire
              </a>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}