"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0d1a1c] py-32 px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#b89a6e]/10 via-[#0d1a1c] to-[#b89a6e]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="flex flex-col gap-7"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-[#b89a6e]" />
            <span className="text-[#b89a6e] text-xs tracking-[0.35em] uppercase">
              Notre Institut
            </span>
          </div>

          <h2 className="font-cormorant italic text-5xl lg:text-6xl text-[#f0e8dd] leading-tight">
            À Propos <span className="text-[#b89a6e]">de Nous</span>
          </h2>

          <p className="text-[#c8beb4] text-sm lg:text-base leading-relaxed max-w-md">
            Hydra Beauty est un institut de beauté situé à Douala, dédié à l’élégance,
            au soin et au bien-être. Nous offrons une expérience beauté complète dans
            un cadre raffiné et apaisant.
          </p>

          <p className="text-[#c8beb4] text-sm lg:text-base leading-relaxed max-w-md">
            Présents à <span className="text-[#b89a6e]">Akwa</span> et{" "}
            <span className="text-[#b89a6e]">New-Bell</span>, nous vous accueillons
            chaque jour pour révéler votre beauté naturelle.
          </p>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#b89a6e]/15">
            <div>
              <div className="font-cormorant text-4xl text-[#b89a6e]">2</div>
              <div className="text-[#c8beb4] text-[10px] tracking-[0.2em] uppercase mt-1">
                Centres
              </div>
            </div>

            <div>
              <div className="font-cormorant text-4xl text-[#b89a6e]">8+</div>
              <div className="text-[#c8beb4] text-[10px] tracking-[0.2em] uppercase mt-1">
                Services
              </div>
            </div>

            <div>
              <div className="font-cormorant text-4xl text-[#b89a6e]">7j/7</div>
              <div className="text-[#c8beb4] text-[10px] tracking-[0.2em] uppercase mt-1">
                Disponibilité
              </div>
            </div>
          </div>

          <a
            href="#services"
            className="self-start px-8 py-3 border border-[#b89a6e] text-[#f0e8dd] text-xs tracking-[0.25em] uppercase hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
          >
            Découvrir nos soins
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative w-[320px] h-[320px] md:w-[440px] md:h-[440px]">
            <div className="absolute inset-0 rounded-full border border-[#b89a6e]/20" />
            <div className="absolute inset-4 rounded-full border border-[#b89a6e]/10" />

            <div className="w-full h-full rounded-full overflow-hidden border border-[#b89a6e]/20 shadow-[0_0_100px_rgba(184,154,110,0.08)]">
              <Image
                src="/images/pedicure1.jpg"
                alt="Hydra Beauty Institut"
                width={440}
                height={440}
                className="w-full h-full object-cover brightness-[0.9] hover:scale-105 transition duration-700"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-[#0d1a1c]/90 border border-[#b89a6e]/30 backdrop-blur-md px-6 py-4"
            >
              <div className="font-cormorant text-3xl text-[#b89a6e]">
                10.000
              </div>
              <div className="text-[#c8beb4] text-[10px] tracking-[0.2em] uppercase">
                FCFA · Expérience Premium
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}