"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X, Plus, Minus, ArrowLeft } from "lucide-react"
import { useCart } from "@/app/context/CartContext"

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[60]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0d1a1c] z-[70] border-l border-[#b89a6e]/20 flex flex-col"
          >
            {/* Header — always visible, above scroll */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-[#b89a6e]/15 bg-[#0d1a1c]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-[#b89a6e] hover:text-[#d4b896] transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs tracking-[0.2em] uppercase font-light">Retour</span>
                </button>
              </div>

              <div className="text-center">
                <p className="text-[#b89a6e] text-xs tracking-[0.25em] uppercase">Hydra Beauty</p>
                <h2 className="text-[#f0e8dd] text-xl font-cormorant italic">Panier ({totalItems})</h2>
              </div>

              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition p-1">
                <X className="w-5 h-5 text-[#f0e8dd]" />
              </button>
            </div>

            {/* Scrollable items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-20">
                  <div className="w-16 h-px bg-[#b89a6e]/30" />
                  <p className="text-[#f0e8dd]/50 text-sm font-light tracking-wide">
                    Votre panier est vide
                  </p>
                  <div className="w-16 h-px bg-[#b89a6e]/30" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-8 py-3 border border-[#b89a6e] text-[#b89a6e] text-xs tracking-[0.2em] uppercase font-light hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continuer mes achats
                  </button>
                </div>
              )}

              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-[#b89a6e]/10 pb-5">
                  <div className="relative w-20 h-20 rounded-sm overflow-hidden shrink-0 border border-[#b89a6e]/15">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#f0e8dd] text-base font-cormorant italic truncate">{item.name}</h3>
                    <p className="text-[#b89a6e] text-sm mt-1 font-light">{item.price.toLocaleString()} FCFA</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 border border-[#b89a6e]/30 flex items-center justify-center hover:border-[#b89a6e] hover:bg-[#b89a6e]/10 transition"
                        >
                          <Minus className="w-3 h-3 text-[#f0e8dd]" />
                        </button>
                        <span className="text-[#f0e8dd] min-w-[20px] text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-[#b89a6e]/30 flex items-center justify-center hover:border-[#b89a6e] hover:bg-[#b89a6e]/10 transition"
                        >
                          <Plus className="w-3 h-3 text-[#f0e8dd]" />
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-red-400/70 text-xs hover:text-red-400 transition font-light tracking-wide">
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer — always visible, below scroll */}
            <div className="flex-shrink-0 border-t border-[#b89a6e]/15 px-6 py-5 space-y-4 bg-[#0d1a1c]">
              <div className="flex items-center justify-between">
                <span className="text-[#f0e8dd]/60 text-sm font-light">Total</span>
                <span className="text-[#b89a6e] text-xl font-cormorant italic">{totalPrice.toLocaleString()} FCFA</span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3 bg-[#b89a6e] text-[#0d1a1c] uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#d4b896] transition-colors"
              >
                Commander
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 text-[#b89a6e]/70 text-xs tracking-[0.15em] uppercase font-light hover:text-[#b89a6e] transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Continuer mes achats
              </button>
            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}