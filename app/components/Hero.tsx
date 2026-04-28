"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import TrueFocus from "./TrueFocus"
import { useEffect, useState } from "react"

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [phase, setPhase] = useState<"show" | "hover" | "rest">("show")

useEffect(() => {
  const cycle = () => {
    setPhase("show")

    const t1 = setTimeout(() => setPhase("hover"), 10000)
    const t2 = setTimeout(() => setPhase("rest"), 20000)
    const t3 = setTimeout(() => cycle(), 30000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }

  cycle()
}, [])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1a1c]">

     <Image
  src="/images/flyer-main1.jpg"
  alt="Hydra Beauty"
  width={500}
  height={500}
  priority
  className="object-cover opacity-30 scale-105 w-full h-full"
/>
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a1c] via-[#0d1a1c]/80 to-[#0d1a1c]/40" />

     
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-transform duration-300"
        style={{
          background: "radial-gradient(circle, rgba(184,154,110,0.35), transparent 70%)",
          transform: `translate(${mouse.x * 100}%, ${mouse.y * 100}%)`,
        }}
      />

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
            className="relative flex flex-col gap-2"
          >
            <span className="absolute -top-6 -left-2 text-[6rem] text-white/[0.03] font-cormorant italic leading-none pointer-events-none select-none">
              Hydra
            </span>

            <TrueFocus />

            
            <p className="font-cormorant italic text-2xl lg:text-3xl text-[#f3e7da] mt-2 tracking-wide drop-shadow-sm">
              Institut de beauté
            </p>
          </motion.div>
      <motion.p
  initial={{ opacity: 0, x: -30 }}
  animate={
    phase === "show"
      ? { opacity: 1, x: 0 }
      : phase === "hover"
      ? { opacity: 1, x: 0, y: -3 }
      : { opacity: 0.15, x: 0 }
  }
  transition={{ duration: 0.8 }}
  className="text-white text-sm lg:text-base leading-relaxed max-w-md"
>
  Hammam, gommage, massage, soins visage, pédicure et coiffure.{" "}
  Une expérience de beauté complète au cœur de Douala.{" "}
  Offre spéciale :{" "}
  <span className="text-[#b89a6e] font-semibold">
    3 prestations à 10.000 FCFA
  </span>.
</motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href="#services"
              className="px-8 py-3 border border-[#b89a6e]/40 text-[#f0e8dd] text-xs tracking-[0.2em] uppercase font-light hover:bg-[#b89a6e] hover:text-[#0d1a1c] hover:shadow-[0_0_25px_rgba(184,154,110,0.3)] transition-all duration-300"
            >
              Nos Services
            </a>

            <a
              href="https://wa.me/237697839818"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#b89a6e] text-[#0d1a1c] text-xs tracking-[0.2em] uppercase font-light hover:bg-transparent hover:text-[#b89a6e] border border-[#b89a6e] hover:shadow-[0_0_25px_rgba(184,154,110,0.4)] transition-all duration-300"
            >
              Réserver
            </a>
          </motion.div>

        </div>

        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px] rounded-full">

           
            <div className="absolute inset-0 rounded-full border border-[#b89a6e]/15 shadow-[0_0_50px_rgba(184,154,110,0.08)] animate-pulse" />
            <div className="absolute inset-4 rounded-full border border-[#b89a6e]/10 transition-all duration-500" />

            <div className="w-full h-full rounded-full overflow-hidden border border-[#b89a6e]/25 shadow-[0_0_60px_rgba(184,154,110,0.12)] hover:shadow-[0_0_90px_rgba(184,154,110,0.25)] transition-all duration-500">

              <Image
                src="/images/flyer-main1.jpg"
                alt="Hydra Beauty"
                width={500}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />

            </div>
          </div>
        </motion.div>

      </div>

      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[#f0e8dd] text-[0.6rem] tracking-[0.2em] uppercase">
          Défiler
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#b89a6e] to-transparent animate-pulse" />
      </div>

    </section>
  )
}