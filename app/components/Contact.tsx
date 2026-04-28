"use client"

import { motion } from "framer-motion"
import { useState } from "react"


export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const buildWhatsAppMessage = () => {
    const lines: string[] = []
    lines.push("Hydra Beauty - Nouvelle demande")
    lines.push("")
    if (formData.name) lines.push(`Nom: ${formData.name}`)
    if (formData.phone) lines.push(`Téléphone: ${formData.phone}`)
    if (formData.email) lines.push(`Email: ${formData.email}`)
    if (formData.service) lines.push(`Service: ${formData.service}`)
    if (formData.message) lines.push(`Message: ${formData.message}`)
    lines.push("")
    lines.push("Merci de me recontacter rapidement.")
    return encodeURIComponent(lines.join("\n"))
  }

  const whatsappLink = `https://wa.me/237697839818?text=${buildWhatsAppMessage()}`

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0d1a1c] py-32 px-6">
     
      <div className="absolute inset-0 bg-gradient-to-br from-[#b89a6e]/8 via-[#0d1a1c] to-[#b89a6e]/5 pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#b89a6e]" />
            <span className="text-[#b89a6e] text-xs tracking-[0.3em] uppercase">Contact</span>
            <span className="w-8 h-px bg-[#b89a6e]" />
          </div>

          <h2 className="font-cormorant italic text-5xl lg:text-6xl text-[#f0e8dd]">
            Nous <span className="text-[#b89a6e]">Contacter</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="space-y-4">
            {[
              { title: "Localisation", lines: ["Akwa & New-Bell, Douala"] },
              { title: "Téléphone", lines: ["6 97 83 98 18 / 6 75 01 46 18"] },
              { title: "Horaires", lines: ["7 jours / 7", "08h00 - 20h00"] },
              { title: "Offre", lines: ["3 Prestations - 10.000 FCFA"] },
            ].map((card) => (
              <div key={card.title} className="p-4 rounded-xl border border-[#b89a6e]/15 bg-[#111f22]/50">
                <p className="text-[#b89a6e] text-xs uppercase tracking-[0.15em] mb-2">{card.title}</p>
                {card.lines.map((l) => <p key={l} className="text-[#c8beb4] text-sm">{l}</p>)}
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <div className="space-y-4">
              {[
                { label: "Nom", name: "name" },
                { label: "Téléphone", name: "phone" },
                { label: "Email", name: "email" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-[#b89a6e] text-xs uppercase tracking-[0.18em]">{field.label}</label>
                  <input
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="bg-[#111f22]/80 border border-[#b89a6e]/20 rounded-xl text-[#f0e8dd] px-4 py-3 focus:border-[#b89a6e] focus:outline-none transition-colors placeholder:text-[#c8beb4]/30"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="text-[#b89a6e] text-xs uppercase tracking-[0.18em]">Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="bg-[#111f22]/80 border border-[#b89a6e]/20 rounded-xl text-[#f0e8dd] px-4 py-3 focus:border-[#b89a6e] focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Choisir</option>
                  <option value="Massage">Massage</option>
                  <option value="Visage">Soins Visage</option>
                  <option value="Coiffure">Coiffure</option>
                  <option value="Formation">Formation</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#b89a6e] text-xs uppercase tracking-[0.18em]">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-[#111f22]/80 border border-[#b89a6e]/20 rounded-xl text-[#f0e8dd] px-4 py-3 focus:border-[#b89a6e] focus:outline-none transition-colors resize-none"
                />
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-4 rounded-xl bg-[#b89a6e] text-[#0d1a1c] uppercase tracking-[0.2em] text-sm font-medium hover:bg-transparent hover:text-[#b89a6e] border border-[#b89a6e] transition-all duration-300"
              >
                Envoyer via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}