"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X, Plus, Minus } from "lucide-react"
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
    toast,
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
            className="fixed inset-0 bg-black/60 z-50"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0d1a1c] z-50 border-l border-[#b89a6e]/20 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#b89a6e]/15">
              <div>
                <p className="text-[#b89a6e] text-xs tracking-[0.25em] uppercase">
                  Hydra Beauty
                </p>
                <h2 className="text-[#f0e8dd] text-2xl font-cormorant italic">
                  Panier ({totalItems})
                </h2>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 transition"
              >
                <X className="w-6 h-6 text-[#f0e8dd]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-[#f0e8dd]/70 mb-4">
                    Votre panier est vide
                  </p>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 border border-[#b89a6e] text-[#b89a6e]"
                  >
                    Continuer
                  </button>
                </div>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-[#b89a6e]/10 pb-5"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[#f0e8dd] text-lg">
                      {item.name}
                    </h3>

                    <p className="text-[#b89a6e] text-sm mt-1">
                      {item.price.toLocaleString()} FCFA
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-[#b89a6e]/30 flex items-center justify-center hover:border-[#b89a6e] transition"
                        >
                          <Minus className="w-4 h-4 text-[#f0e8dd]" />
                        </button>

                        <span className="text-[#f0e8dd] min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-[#b89a6e]/30 flex items-center justify-center hover:border-[#b89a6e] transition"
                        >
                          <Plus className="w-4 h-4 text-[#f0e8dd]" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 text-sm hover:opacity-70 transition"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#b89a6e]/15 px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#f0e8dd]/70">Total</span>
                <span className="text-[#b89a6e] text-xl">
                  {totalPrice.toLocaleString()} FCFA
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-3 bg-[#b89a6e] text-[#0d1a1c] uppercase tracking-[0.2em] text-sm hover:opacity-90 transition"
              >
                Commander
              </Link>
            </div>
          </motion.aside>

         
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0d1a1c] border border-[#b89a6e] text-[#f0e8dd] px-6 py-3 text-sm z-[999]"
              >
                Ajouté au panier
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}