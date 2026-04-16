"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { products } from "@/app/data/products"
import { useCart } from "@/app/context/CartContext"
import Link from "next/link"

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { addToCart } = useCart()

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] flex items-center justify-center">
        Product not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        <div className="relative h-[500px] rounded-xl overflow-hidden border border-[#b89a6e]/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-[#b89a6e] uppercase tracking-[0.25em] text-xs">
            {product.category}
          </p>

          <h1 className="text-4xl font-cormorant italic mt-2">
            {product.name}
          </h1>

          <p className="text-[#f0e8dd]/70 mt-4 leading-7">
            {product.details}
          </p>

          <p className="text-[#b89a6e] text-2xl mt-6">
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
            className="mt-8 w-full py-3 bg-[#b89a6e] text-[#0d1a1c] uppercase tracking-[0.2em]"
          >
            Add to Cart
          </button>

          <Link
            href="/products"
            className="block mt-4 text-center text-sm text-[#b89a6e]"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}