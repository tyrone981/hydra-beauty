"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const services = [
  { name: "Hammam", image: "/images/flyer-main1.jpg", description: "Purifiez votre corps et votre esprit..." },
  { name: "Gommage", image: "/images/pedicure.jpg", description: "Retrouvez une peau douce..." },
  { name: "Massage", image: "/images/flyer-main2.jpg", description: "Massage relaxant..." },
  { name: "Soins Visage", image: "/images/face-care.jpg", description: "Soins du visage..." },
  { name: "Pédicure", image: "/images/pedicure1.jpg", description: "Soin des pieds..." },
  { name: "Coiffure", image: "/images/hairs.jpg", description: "Coiffure professionnelle..." },
  { name: "Onglerie", image: "/images/pedicure1.jpg", description: "Manucure et nails..." },
  { name: "Coiffure femmes", image: "/images/femmeha1r.jpg", description: "Maquillage et coiffure..." },
]

export default function Services() {
  const [selected, setSelected] = useState<null | (typeof services)[0]>(null)

  return (
    <section id="services" className="relative overflow-hidden bg-[#b89a6e]/10 py-32 px-6">

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">

          <div className="bg-[#111f22] max-w-xl w-full rounded-2xl overflow-hidden border border-[#b89a6e]/30">

            {/* IMAGE FIXED SIZE (NO fill) */}
            <div className="w-full h-[320px]">
              <Image
                src={selected.image}
                alt={selected.name}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5">
              <h2 className="text-[#f0e8dd] text-2xl mb-2">{selected.name}</h2>
              <p className="text-[#c8beb4] text-sm mb-5">{selected.description}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 py-3 border border-[#b89a6e] text-[#b89a6e] rounded-full hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
                >
                  Retour
                </button>

                <a
                  href="https://wa.me/237697839818"
                  target="_blank"
                  className="flex-1 py-3 bg-[#b89a6e] text-[#0d1a1c] rounded-full text-center hover:bg-transparent hover:text-[#b89a6e] border border-[#b89a6e] transition"
                >
                  Réserver
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="border border-[#b89a6e]/15 rounded-2xl overflow-hidden group hover:border-[#b89a6e]"
            >
              {/* CLICK OPENS MODAL */}
              <div
                onClick={() => setSelected(service)}
                className="relative h-56 cursor-pointer"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-5 bg-[#111f22]">
                <h3 className="text-[#f0e8dd] text-xl mb-2">
                  {service.name}
                </h3>

                <a
                  href="https://wa.me/237697839818"
                  target="_blank"
                  className="text-[#b89a6e] text-xs uppercase hover:text-[#f0e8dd] transition"
                >
                  Réserver
                </a>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}