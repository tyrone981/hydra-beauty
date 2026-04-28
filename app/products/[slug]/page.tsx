"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingBag, Check } from "lucide-react"
import { useState } from "react"
import { products } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"
import Navbar from "@/app/components/Navbar"
import CartDrawer from "@/app/components/CartDrawer"
import Galaxy from "@/app/components/Galaxy"

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.slug === slug)
  const related = products.filter((p) => p.category === product?.category && p.slug !== slug).slice(0, 3)

  const handleAddToCart = () => {
    if (!product) return
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] flex flex-col items-center justify-center gap-4">
        <p className="font-cormorant italic text-2xl">Produit introuvable</p>
        <Link href="/products" className="text-[#b89a6e] text-xs tracking-widest uppercase hover:underline">← Retour</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] relative overflow-hidden">

      <Navbar />
      <CartDrawer />

      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={0.6}
          glowIntensity={0.2}
          saturation={0.4}
          hueShift={35}
          twinkleIntensity={0.25}
          rotationSpeed={0.04}
          repulsionStrength={1.5}
          starSpeed={0.3}
          speed={0.6}
          transparent
        />
        <div className="absolute inset-0 bg-[#0d1a1c]/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <Link href="/products" className="inline-flex items-center gap-2 text-[#b89a6e]/70 text-xs tracking-[0.2em] uppercase font-light hover:text-[#b89a6e] transition-colors group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Retour aux produits
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mb-24">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="relative h-[500px] overflow-hidden rounded-2xl border border-[#b89a6e]/20 shadow-[0_0_60px_rgba(184,154,110,0.08)]">
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#b89a6e] text-[#0d1a1c] text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1.5 font-medium rounded-full">
                  {product.badge}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-xl border border-[#b89a6e]/20 overflow-hidden cursor-pointer hover:border-[#b89a6e] transition">
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="80px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col justify-center gap-6">
            <div>
              <p className="text-[#b89a6e] text-xs tracking-[0.3em] uppercase font-light mb-2">{product.category}</p>
              <h1 className="font-cormorant italic text-4xl lg:text-5xl text-[#f0e8dd] leading-tight">{product.name}</h1>
            </div>

            <p className="text-[#c8beb4] text-sm font-light leading-relaxed">{product.details}</p>

            <div className="py-5 border-y border-[#b89a6e]/15">
              <span className="font-cormorant text-4xl text-[#b89a6e] font-light">{product.price.toLocaleString()}</span>
              <span className="text-[#c8beb4] text-sm font-light ml-2">FCFA</span>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 border ${
                  added
                    ? "bg-green-800/30 border-green-600/50 text-green-400"
                    : "bg-[#b89a6e] border-[#b89a6e] text-[#0d1a1c] hover:bg-transparent hover:text-[#b89a6e]"
                }`}
              >
                {added ? <><Check className="w-4 h-4" /> Ajouté au panier</> : <><ShoppingBag className="w-4 h-4" /> Ajouter au panier</>}
              </button>

              <a href="https://wa.me/237697839818" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl flex items-center justify-center gap-2 border border-[#b89a6e]/30 text-[#b89a6e] text-xs tracking-[0.2em] uppercase font-light hover:border-[#b89a6e] hover:bg-[#b89a6e]/5 transition-all duration-300">
                Commander via WhatsApp
              </a>
            </div>

            <p className="text-[#c8beb4]/40 text-xs font-light">
              {product.inStock ? "✦ En stock — livraison disponible à Douala" : "Rupture de stock"}
            </p>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-8 h-px bg-[#b89a6e]" />
              <h2 className="font-cormorant italic text-2xl text-[#f0e8dd]">Produits similaires</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} className="group border border-[#b89a6e]/15 rounded-2xl hover:border-[#b89a6e]/40 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                  <Link href={`/products/${p.slug}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover brightness-75 group-hover:scale-110 group-hover:brightness-90 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a1c] via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <h3 className="font-cormorant italic text-lg text-[#f0e8dd]">{p.name}</h3>
                        <p className="text-[#b89a6e] text-sm font-light">{p.price.toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}