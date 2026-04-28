"use client"

import Image from "next/image"
import Link from "next/link"

export default function ServiceDetails({
  params,
}: {
  params: { slug: string }
}) {
  const name = decodeURIComponent(params.slug)

  const imageMap: Record<string, string> = {
    Hammam: "/images/flyer-main1.jpg",
    Gommage: "/images/pedicure.jpg",
    Massage: "/images/flyer-main2.jpg",
    "Soins Visage": "/images/face-care.jpg",
    Pédicure: "/images/pedicure1.jpg",
    Coiffure: "/images/hairs.jpg",
    Onglerie: "/images/pedicure1.jpg",
    "Coiffure femmes": "/images/femmeha1r.jpg",
  }

  return (
    <section className="min-h-screen bg-[#0d1a1c] px-4 py-12 md:px-8">
      <div className="max-w-4xl mx-auto">

    
        <div className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-[#b89a6e]/20">
          <Image
            src={imageMap[name]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
          />
        </div>

       
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/#services"
            className="flex-1 text-center py-4 rounded-full border border-[#b89a6e] text-[#b89a6e]"
          >
            Retour
          </Link>

          <a
            href="https://wa.me/237697839818"
            target="_blank"
            className="flex-1 text-center py-4 rounded-full bg-[#b89a6e] text-[#0d1a1c]"
          >
            Réserver
          </a>
        </div>

      </div>
    </section>
  )
}