"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { products, categories } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [selected, setSelected] = useState("all")

  const filtered =
    selected === "all"
      ? products
      : products.filter((p) => p.category === selected)

  return (
    <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-cormorant italic mb-10">
          Products
        </h1>

        <div className="flex gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelected(cat.value)}
              className={`px-4 py-2 border text-sm uppercase tracking-[0.2em] transition ${
                selected === cat.value
                  ? "bg-[#b89a6e] text-[#0d1a1c]"
                  : "border-[#b89a6e]/30 text-[#f0e8dd] hover:border-[#b89a6e]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="border border-[#b89a6e]/10 rounded-xl overflow-hidden hover:border-[#b89a6e]/40 transition"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </Link>

              <div className="p-4">
                <h3 className="text-lg font-cormorant italic">
                  {product.name}
                </h3>

                <p className="text-sm text-[#f0e8dd]/60 mt-1">
                  {product.price.toLocaleString()} FCFA
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="mt-4 w-full py-2 border border-[#b89a6e] text-[#b89a6e] uppercase text-xs tracking-[0.2em] hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}