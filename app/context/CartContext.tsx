"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toast: boolean
  generateWhatsAppMessage: () => string
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hydra-cart")
      if (saved) setItems(JSON.parse(saved))
    } catch {
      console.log("Cart load error")
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("hydra-cart", JSON.stringify(items))
    }
  }, [items, hydrated])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })

    setIsOpen(true)

    setToast(true)
    setTimeout(() => setToast(false), 1200)
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity } : i
      )
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)

  const totalPrice = items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  )

  const generateWhatsAppMessage = () => {
    const phone = "237697839818"

    let message = "🧴 *Hydra Beauty Order*%0A%0A"

    items.forEach((item) => {
      message += `🛍️ ${item.name} x${item.quantity}%0A`
      message += `💰 ${item.price * item.quantity} FCFA%0A%0A`
    })

    message += "━━━━━━━━━━━━%0A"
    message += `💎 *TOTAL: ${totalPrice} FCFA*%0A%0A`
    message += "📍 Hydra Beauty"

    return `https://wa.me/${phone}?text=${message}`
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        toast,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}