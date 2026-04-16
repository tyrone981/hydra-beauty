"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/app/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"

export default function CartButton() {
  const { totalItems, setIsOpen } = useCart()

  return (
    <button onClick={() => setIsOpen(true)} className="relative">
      <ShoppingBag className="w-5 h-5 text-[#f0e8dd]" />

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute -top-2 -right-2 bg-[#b89a6e] text-[#0d1a1c] text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}