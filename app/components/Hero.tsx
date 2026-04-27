"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import TrueFocus from "./TrueFocus"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1a1c]">
      <Image
        src="/images/flyer-main1.jpg"
        alt="Hydra Beauty"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30 scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a1c] via-[#0d1a1c]/80 to-[#0d1a1c]/40" />

      <div className="absolute top-0 left-0 w-72 h-72 opacity-10 pointer-events-none">
        <svg viewBox="0 0 300 400" fill="none">
          <path
            d="M80 380 C60 280, 20 200, 10 100 C30 140, 60 180, 100 220 C80 150, 40 80, 60 20 C90 80, 110 160, 130 240 C150 180, 140 100, 160 40 C180 120, 170 200, 180 280"
            stroke="#b89a6e"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 300 400" fill="none">
          <path
            d="M80 380 C60 280, 20 200, 10 100 C30 140, 60 180, 100 220 C80 150, 40 80, 60 20 C90 80, 110 160, 130 240 C150 180, 140 100, 160 40 C180 120, 170 200, 180 280"
            stroke="#b89a6e"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-28">
        <div className="flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#b89a6e]" />
            <span className="text-[#b89a6e] text-xs tracking-[0.3em] uppercase">
              Akwa · New-Bell · Douala
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <span className="absolute -top-6 -left-2 text-[6rem] text-white/[0.03] font-cormorant italic">
              Hydra
            </span>

            <TrueFocus
              sentence="Hydra Beauty"
              manualMode={false}
              blurAmount={8}
              borderColor="#b89a6e"
              glowColor="rgba(184, 154, 110, 0.55)"
              animationDuration={0.7}
              pauseBetweenAnimations={5}
            />

            <p className="font-cormorant italic text-2xl lg:text-3xl text-[#c8beb4] mt-3">
              Institut de beauté
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1 }}
            className="text-[#c8beb4] text-sm lg:text-base leading-relaxed max-w-md"
          >
            Hammam, gommage, massage, soins visage, pédicure et coiffure.
            Une expérience de beauté complète au cœur de Douala.
            Offre spéciale : 3 prestations à 10.000 FCFA.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex gap-8 pt-2"
          >
            <div>
              <div className="text-3xl text-[#b89a6e] font-cormorant">3</div>
              <div className="text-[10px] tracking-[0.2em] text-[#c8beb4] uppercase">
                Prestations
              </div>
            </div>

            <div className="w-px bg-[#b89a6e]/20" />

            <div>
              <div className="text-3xl text-[#b89a6e] font-cormorant">10K</div>
              <div className="text-[10px] tracking-[0.2em] text-[#c8beb4] uppercase">
                FCFA
              </div>
            </div>

            <div className="w-px bg-[#b89a6e]/20" />

            <div>
              <div className="text-3xl text-[#b89a6e] font-cormorant">2</div>
              <div className="text-[10px] tracking-[0.2em] text-[#c8beb4] uppercase">
                Salons
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px]">
            <div className="absolute inset-0 rounded-full border border-[#b89a6e]/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full border border-[#b89a6e]/10" />

            <div className="w-full h-full rounded-full overflow-hidden border border-[#b89a6e]/30 shadow-[0_0_80px_rgba(184,154,110,0.12)]">
              <Image
                src="/images/flyer-main.jpg"
                alt="Hydra Beauty"
                width={500}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}