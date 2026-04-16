"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FaInstagramSquare, FaFacebookSquare, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa"
import { AiFillTikTok } from "react-icons/ai"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#b89a6e] py-16 px-6">

      <div className="absolute inset-0 bg-gradient-to-br from-[#d4b896] via-[#b89a6e] to-[#8a6e48]" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#0d1a1c]/20">
                <Image src="/images/logo.jpg" alt="Hydra Beauty" fill className="object-cover" />
              </div>

              <div>
                <p className="text-[#0d1a1c] text-sm tracking-[0.2em] uppercase">
                  Hydra Beauty
                </p>
                <p className="text-[#0d1a1c]/70 text-xs">
                  Institut de beauté
                </p>
              </div>
            </div>

            <p className="text-[#0d1a1c]/80 text-sm">
              Institut de beauté à Douala spécialisé dans les soins et le bien-être.
            </p>

            <div className="flex gap-3 mt-5">

              <a
                href="tel:697839818"
                className="w-9 h-9 border border-[#0d1a1c]/20 flex items-center justify-center text-[#0d1a1c] hover:bg-[#0d1a1c] hover:text-[#b89a6e] transition"
              >
                <FaPhoneAlt />
              </a>

              <a
                href="https://www.instagram.com"
                className="w-9 h-9 border border-[#0d1a1c]/20 flex items-center justify-center text-[#0d1a1c] hover:bg-[#0d1a1c] hover:text-[#b89a6e] transition"
              >
                <FaInstagramSquare />
              </a>

              <a
                href="https://www.facebook.com/share/1GKjia6cnf/"
                className="w-9 h-9 border border-[#0d1a1c]/20 flex items-center justify-center text-[#0d1a1c] hover:bg-[#0d1a1c] hover:text-[#b89a6e] transition"
              >
                <FaFacebookSquare />
              </a>

              <a
                href="https://www.tiktok.com/@hydrabeautycmr?_r=1&_t=ZS-95X6uwGCXLE"
                className="w-9 h-9 border border-[#0d1a1c]/20 flex items-center justify-center text-[#0d1a1c] hover:bg-[#0d1a1c] hover:text-[#b89a6e] transition"
              >
                <AiFillTikTok />
              </a>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#0d1a1c] text-xs uppercase tracking-[0.2em] mb-6">
              Navigation
            </h4>

            <ul className="space-y-3 text-sm text-[#0d1a1c]/80">
              {[
                { label: "À Propos", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Galerie", href: "#gallery" },
                { label: "Formations", href: "#abonements" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#0d1a1c] transition flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-[#0d1a1c] group-hover:w-4 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#0d1a1c] text-xs uppercase tracking-[0.2em] mb-6">
              Services
            </h4>

            <ul className="space-y-3 text-sm text-[#0d1a1c]/80">
              {["Hammam", "Gommage", "Massage", "Soins Visage", "Pédicure", "Coiffure"].map(
                (service) => (
                  <li key={service}>{service}</li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[#0d1a1c] text-xs uppercase tracking-[0.2em] mb-6">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-[#0d1a1c]/80">

              <div className="flex gap-2">
                <FaMapMarkerAlt />
                <p>Akwa & New-Bell, Douala</p>
              </div>

              <div className="flex gap-2">
                <FaPhoneAlt />
                <p>6 97 83 98 18</p>
              </div>

              <div className="flex gap-2">
                <FaClock />
                <p>7j/7 · 08h — 20h</p>
              </div>

            </div>

          </motion.div>

        </div>

        <div className="border-t border-[#0d1a1c]/20 pt-6 flex justify-between text-xs text-[#0d1a1c]/70">
          <p>© 2026 Hydra Beauty</p>
          <p>Douala, Cameroun</p>
        </div>

      </div>
    </footer>
  )
}