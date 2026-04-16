"use client"

import { useState } from "react"
import { useCart } from "@/app/context/CartContext"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  })

  const phoneNumber = "237697839818"

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const generateMessage = () => {
    const lines: string[] = []

    lines.push("Bonjour Hydra Beauty")
    lines.push("")
    lines.push("Nouvelle commande")
    lines.push("")
    lines.push(`Nom: ${form.name}`)
    lines.push(`Téléphone: ${form.phone}`)
    lines.push(`Adresse: ${form.address}`)

    if (form.note) {
      lines.push(`Note: ${form.note}`)
    }

    lines.push("")
    lines.push("Produits")

    items.forEach((item, i) => {
      lines.push(`${i + 1}. ${item.name}`)
      lines.push(`Prix: ${item.price.toLocaleString()} FCFA`)
      lines.push(`Quantité: ${item.quantity}`)
      lines.push(`Image: ${item.image}`)
      lines.push("")
    })

    lines.push(`Total: ${totalPrice.toLocaleString()} FCFA`)

    return encodeURIComponent(lines.join("\n"))
  }

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) return

    const url = `https://wa.me/${phoneNumber}?text=${generateMessage()}`
    window.open(url, "_blank")
    clearCart()
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] flex items-center justify-center">
        <p>Votre panier est vide</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-cormorant italic mb-10">Finaliser La Commande</h1>

        <div className="space-y-4 mb-10">
          <input
            name="name"
            placeholder="Nom complet"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-[#b89a6e]/30 text-[#f0e8dd] outline-none"
          />

          <input
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-[#b89a6e]/30 text-[#f0e8dd] outline-none"
          />

          <input
            name="address"
            placeholder="Adresse de livraison"
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-[#b89a6e]/30 text-[#f0e8dd] outline-none"
          />

          <textarea
            name="note"
            placeholder="Note (optionnel)"
            value={form.note}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-[#b89a6e]/30 text-[#f0e8dd] outline-none"
          />
        </div>

        <div className="space-y-3 mb-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-[#b89a6e]/10 pb-2"
            >
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-[#b89a6e]">
                  {item.quantity} x {item.price.toLocaleString()}
                </p>
              </div>

              <p className="text-[#b89a6e]">
                {(item.price * item.quantity).toLocaleString()} FCFA
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between mb-8">
          <span>Total</span>
          <span className="text-[#b89a6e] text-xl">
            {totalPrice.toLocaleString()} FCFA
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#25D366] text-white uppercase tracking-[0.2em] text-sm"
        >
          Commander sur WhatsApp
        </button>
      </div>
    </div>
  )
}