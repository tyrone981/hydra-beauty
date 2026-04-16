"use client"

import { useCart } from "@/app/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"

export default function Toast() {
  const { toast } = useCart()

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] bg-[#b89a6e] text-[#0d1a1c] px-6 py-3 rounded-full shadow-lg text-sm tracking-wide"
        >
          Produit ajouté au panier
        </motion.div>
      )}
    </AnimatePresence>
  )
}