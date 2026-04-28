"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { products, categories } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"
import Navbar from "@/app/components/Navbar"
import CartDrawer from "@/app/components/CartDrawer"
import Galaxy from "@/app/components/Galaxy"

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [selected, setSelected] = useState("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selected === "all" || p.category === selected
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQuery
    })
  }, [selected, query])

  return (
    <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] relative overflow-hidden">

      <Navbar />
      <CartDrawer />

      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={0.8}
          glowIntensity={0.25}
          saturation={0.4}
          hueShift={35}
          twinkleIntensity={0.3}
          rotationSpeed={0.06}
          repulsionStrength={2}
          starSpeed={0.4}
          speed={0.8}
          transparent
        />
        <div className="absolute inset-0 bg-[#0d1a1c]/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-px bg-[#b89a6e]" />
            <span className="text-[#b89a6e] text-xs tracking-[0.3em] uppercase font-light">Boutique</span>
            <span className="block w-8 h-px bg-[#b89a6e]" />
          </div>
          <div className="relative inline-block">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-cormorant italic text-[5rem] text-white/[0.03] leading-none pointer-events-none select-none whitespace-nowrap">Produits</span>
            <h1 className="font-cormorant italic text-5xl lg:text-6xl text-[#f0e8dd]">Nos <span className="text-[#b89a6e]">Produits</span></h1>
          </div>
          <p className="text-[#c8beb4] text-sm font-light mt-4 max-w-md mx-auto leading-relaxed">
            Des produits de beauté soigneusement sélectionnés pour sublimer votre beauté naturelle.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b89a6e]/60" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#111f22]/60 backdrop-blur-sm border border-[#b89a6e]/20 rounded-full text-[#f0e8dd] text-sm font-light pl-11 pr-4 py-3 focus:border-[#b89a6e] focus:outline-none transition-colors placeholder:text-[#c8beb4]/30"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelected(cat.value)}
                className={`px-5 py-3 rounded-full border text-xs uppercase tracking-[0.18em] font-light transition-all duration-300 ${
                  selected === cat.value
                    ? "bg-[#b89a6e] text-[#0d1a1c] border-[#b89a6e]"
                    : "border-[#b89a6e]/25 text-[#f0e8dd]/70 hover:border-[#b89a6e] hover:text-[#f0e8dd] backdrop-blur-sm"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        <p className="text-[#c8beb4]/40 text-xs tracking-wide mb-6 font-light">
          {filtered.length} produit{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group border border-[#b89a6e]/15 rounded-2xl hover:border-[#b89a6e]/50 transition-all duration-500 overflow-hidden bg-[#111f22]/40 backdrop-blur-sm hover:bg-[#111f22]/70 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(184,154,110,0.12)]"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                    className="object-cover brightness-75 group-hover:scale-110 group-hover:brightness-90 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a1c] via-transparent to-transparent" />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#b89a6e] text-[#0d1a1c] text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1 font-medium rounded-full">
                      {product.badge}
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-5">
                <p className="text-[#b89a6e] text-[0.6rem] tracking-[0.2em] uppercase font-light mb-1">{product.category}</p>
                <h3 className="font-cormorant italic text-xl text-[#f0e8dd] mb-1">{product.name}</h3>
                <p className="text-[#c8beb4] text-xs font-light leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-cormorant text-xl text-[#b89a6e]">{product.price.toLocaleString()} <span className="text-xs">FCFA</span></span>
                  <button
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="px-4 py-2 rounded-full border border-[#b89a6e]/40 text-[#b89a6e] text-xs tracking-[0.15em] uppercase font-light hover:bg-[#b89a6e] hover:text-[#0d1a1c] hover:border-[#b89a6e] transition-all duration-300"
                  >
                    + Panier
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#c8beb4]/50 font-light text-sm">Aucun produit trouvé pour "{query}"</p>
            <button onClick={() => { setQuery(""); setSelected("all") }} className="mt-4 text-[#b89a6e] text-xs tracking-widest uppercase hover:underline font-light">
              Réinitialiser
            </button>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#b89a6e]/60 text-xs tracking-[0.2em] uppercase hover:text-[#b89a6e] transition-colors font-light">
            ← Retour à l'accueil
          </Link>
        </div>

      </div>
    </div>
  )
}