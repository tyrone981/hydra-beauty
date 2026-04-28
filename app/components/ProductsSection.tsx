"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { products } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"

export default function ProductsSection() {
  const { addToCart } = useCart()
  const featured = products.slice(0, 4)

  return (
    <section id="products" className="relative overflow-hidden py-24 px-4 md:px-8 lg:px-12 bg-[#0d1a1c]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b89a6e]/10 via-[#0d1a1c] to-[#b89a6e]/10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-[#b89a6e] text-xs tracking-[0.35em] uppercase mb-3">
            Boutique Hydra
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-[#f0e8dd] italic">
            Nos Produits
          </h2>
          <div className="w-24 h-px bg-[#b89a6e] mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[#132426]/80 border border-[#b89a6e]/15 rounded-2xl overflow-hidden group hover:border-[#b89a6e]/40 hover:shadow-[0_8px_40px_rgba(184,154,110,0.1)] transition-all duration-500 backdrop-blur-sm"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-72 overflow-hidden rounded-t-2xl border-b border-[#b89a6e]/15">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[0.25em] uppercase bg-[#b89a6e] text-[#0d1a1c] rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-5">
                <p className="text-[#b89a6e] text-[10px] uppercase tracking-[0.25em] mb-2">
                  {product.category}
                </p>

                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-[#f0e8dd] text-xl font-cormorant italic hover:text-[#b89a6e] transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-[#f0e8dd]/60 text-sm leading-6 mt-2 h-12 overflow-hidden">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <span className="text-[#b89a6e] text-lg font-medium">
                    {product.price.toLocaleString()} FCFA
                  </span>

                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      })
                    }
                    className="px-4 py-2 rounded-full border border-[#b89a6e] text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] text-xs uppercase tracking-[0.18em] transition-all duration-300 active:scale-95"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="px-8 py-3 rounded-full border border-[#b89a6e] text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] text-sm tracking-[0.25em] uppercase transition-all duration-300"
          >
            Voir Tous Les Produits
          </Link>
        </div>
      </div>
    </section>
  )
}