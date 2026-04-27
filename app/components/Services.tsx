"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const services = [
  {
    name: "Hammam",
    image: "/images/flyer-main1.jpg",
    description:
      "Purifiez votre corps et votre esprit avec notre rituel hammam traditionnel. Une expérience de détente profonde et authentique.",
  },
  {
    name: "Gommage",
    image: "/images/pedicure.jpg",
    description:
      "Retrouvez une peau douce et lumineuse grâce à notre gommage corporel aux ingrédients naturels soigneusement sélectionnés.",
  },
  {
    name: "Massage",
    image: "/images/flyer-main2.jpg",
    description:
      "Laissez nos expertes vous offrir un massage relaxant qui soulage les tensions et revitalise votre corps en profondeur.",
  },
  {
    name: "Soins Visage",
    image: "/images/face-care.jpg",
    description:
      "Des soins du visage personnalisés pour révéler l'éclat naturel de votre peau avec des produits de haute qualité.",
  },
  {
    name: "Pédicure",
    image: "/images/pedicure1.jpg",
    description:
      "Offrez à vos pieds le soin qu'ils méritent avec notre pédicure complète, pour des pieds doux et des ongles parfaits.",
  },
  {
    name: "Coiffure",
    image: "/images/hairs.jpg",
    description:
      "Tresses, pose de perruque, coiffure de mariée et bien plus. Notre équipe réalise la coiffure de vos rêves.",
  },
  {
    name: "Onglerie",
    image: "/images/pedicure1.jpg",
    description:
      "Manucure, nail art, pose de faux ongles. Des mains sublimes et soignées pour toutes les occasions.",
  },
  {
    name: "Coiffure femmes",
    image: "/images/femmeha1r.jpg",
    description:
      "Maquillage professionnel pour vos événements spéciaux. Mariages, soirées, shootings photos — vous serez parfaite.",
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#b89a6e]/10 py-32 px-6"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/femmeha1r.jpg"
          alt="Services background"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.12] saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#b89a6e]/15 via-[#0d1a1c]/60 to-[#b89a6e]/10" />
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
            <span className="text-[#b89a6e] text-xs tracking-[0.3em] uppercase font-light">
              Ce Que Nous Offrons
            </span>
            <span className="w-8 h-px bg-[#b89a6e]" />
          </div>

          <h2 className="font-cormorant italic text-5xl lg:text-6xl text-[#f0e8dd]">
            Nos <span className="text-[#b89a6e]">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden border border-[#b89a6e]/15 hover:border-[#b89a6e] transition-all duration-500 rounded-xl flex flex-col"
            >
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                  className="object-cover brightness-75 group-hover:scale-110 group-hover:brightness-90 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a1c] via-[#0d1a1c]/30 to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <h3 className="font-cormorant italic text-2xl text-[#f0e8dd] group-hover:text-[#b89a6e] transition">
                    {service.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 bg-[#111f22] group-hover:bg-[#162628] transition-all duration-500 flex flex-col flex-1">
                <p className="text-[#c8beb4] text-xs font-light leading-relaxed mb-5 min-h-[72px] group-hover:text-[#e8ddd0] transition">
                  {service.description}
                </p>

                <a
                  href="https://wa.me/237697839818"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b89a6e] text-xs tracking-[0.15em] uppercase font-light flex items-center gap-2 group-hover:text-[#f0e8dd] transition"
                >
                  Réserver
                  <span className="w-4 h-px bg-[#b89a6e] group-hover:w-8 transition-all duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-[#b89a6e]/20 bg-[#111f22] text-center rounded-xl">
          <p className="font-cormorant italic text-2xl lg:text-3xl text-[#f0e8dd] mb-2">
            Un rapport qualité prix{" "}
            <span className="text-[#b89a6e]">inégalé dans la beauté</span>
          </p>

          <p className="text-[#c8beb4] text-sm font-light mb-6">
            Des services royaux — à des prix imbattables
          </p>

          <a
            href="https://wa.me/237697839818"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-3 bg-[#b89a6e] text-[#0d1a1c] text-xs tracking-[0.2em] uppercase font-medium hover:bg-transparent hover:text-[#b89a6e] border border-[#b89a6e] transition-all duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}