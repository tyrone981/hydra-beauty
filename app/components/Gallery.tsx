"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

import CircularGallery from "@/app/components/CircularGallery"

const hydraItems = [
  { image: "/images/flyer-main1.jpg", text: "Massage" },
  { image: "/images/face-care.jpg", text: "Soins Visage" },
  { image: "/images/pedicure1.jpg", text: "Pédicure" },
  { image: "/images/hairs.jpg", text: "Coiffure" },
  { image: "/images/demgn0ma.jpg", text: "Gommage" },
  { image: "/images/femmeha1r.jpg", text: "Coiffure Femme" },
  { image: "/images/hightaper.jpg", text: "Coiffure Homme" },
  { image: "/images/flyer-main2.jpg", text: "Hammam" },
]

const images = [
  { src: "/images/flyer-main1.jpg", label: "Massage" },
  { src: "/images/face-care.jpg", label: "Soins Visage" },
  { src: "/images/pedicure1.jpg", label: "Pédicure" },
  { src: "/images/hairs.jpg", label: "Coiffure" },
  { src: "/images/demgn0ma.jpg", label: "Gommage" },
  { src: "/images/femmeha1r.jpg", label: "Coiffure Femme" },
  { src: "/images/hightaper.jpg", label: "Coiffure Homme" },
  { src: "/images/flyer-main2.jpg", label: "Hammam" },
]

export default function Gallery() {
  const stripRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <section
        id="gallery"
        className="relative overflow-hidden bg-[#b89a6e]/10 py-32 md:hidden"
      >

        <div className="max-w-7xl mx-auto px-6 mb-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#b89a6e]" />
              <span className="text-[#b89a6e] text-xs tracking-[0.3em] uppercase">
                Galerie
              </span>
              <span className="w-8 h-px bg-[#b89a6e]" />
            </div>

            <h2 className="font-cormorant italic text-5xl lg:text-6xl text-[#f0e8dd]">
              Notre <span className="text-[#b89a6e]">Galerie</span>
            </h2>

            <p className="text-[#c8beb4] text-sm lg:text-base mt-6 max-w-xl mx-auto">
              Découvrez nos réalisations et notre savoir-faire esthétique.
            </p>
          </motion.div>
        </div>

        <div
          ref={stripRef}
          className="flex gap-5 overflow-x-auto px-6 pb-4 scroll-smooth snap-x snap-mandatory relative z-10"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="relative flex-shrink-0 w-[280px] h-[380px] overflow-hidden border border-[#b89a6e]/15 snap-center group rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.label}
                width={280}
                height={380}
                sizes="280px"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a1c]/85 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-cormorant italic text-xl text-[#f0e8dd]">
                  {img.label}
                </h3>

                <div className="w-0 group-hover:w-full h-px bg-[#b89a6e] transition-all duration-500 mt-2" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10 px-6 relative z-10">
          <button
            onClick={() =>
              stripRef.current?.scrollBy({ left: -600, behavior: "smooth" })
            }
            className="w-10 h-10 border border-[#b89a6e]/30 text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
          >
            ←
          </button>

          <button
            onClick={() =>
              stripRef.current?.scrollBy({ left: 600, behavior: "smooth" })
            }
            className="w-10 h-10 border border-[#b89a6e]/30 text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
          >
            →
          </button>
        </div>
      </section>

      <section
        id="gallery-desktop"
        className="relative hidden md:block bg-[#0d1a1c] py-32 overflow-hidden"
      >
        
        
      
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#b89a6e]" />
              <span className="text-[#b89a6e] text-xs tracking-[0.3em] uppercase">
                Galerie
              </span>
              <span className="w-8 h-px bg-[#b89a6e]" />
            </div>

            <h2 className="font-cormorant italic text-5xl lg:text-6xl text-[#f0e8dd]">
              Notre <span className="text-[#b89a6e]">Galerie</span>
            </h2>

            <p className="text-[#c8beb4] text-sm lg:text-base mt-6 max-w-xl mx-auto">
              Découvrez nos réalisations et notre savoir-faire esthétique.
            </p>
          </div>

          <CircularGallery items={hydraItems} />
        </div>
      </section>
    </>
  )
}