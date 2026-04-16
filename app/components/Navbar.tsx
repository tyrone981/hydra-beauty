"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import CartButton from "./CartButton"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0d1a1c]/95 backdrop-blur-md"
            : "bg-gradient-to-b from-[#0d1a1c]/90 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 grid grid-cols-3 items-center">

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#f0e8dd]/80 hover:text-[#b89a6e] text-xs lg:text-sm tracking-[0.18em] uppercase font-light transition-colors relative group"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#b89a6e] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex justify-start md:justify-center">
            <a href="#" className="flex flex-col items-center gap-1">
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border border-[#b89a6e]/30">
                <Image src="/images/logo.jpg" alt="Hydra Beauty" fill className="object-cover" />
              </div>
              <span className="text-[#f0e8dd] text-[0.55rem] tracking-[0.3em] uppercase font-light hidden lg:block">
                Hydra Beauty
              </span>
            </a>
          </div>

          <div className="flex items-center justify-end gap-3 md:gap-8">

            <CartButton />

            <a
              href="#abonements"
              className="hidden md:block text-[#f0e8dd]/80 hover:text-[#b89a6e] text-xs uppercase tracking-[0.18em] font-light transition-colors relative group"
            >
              Abonements
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#b89a6e] group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="#contact"
              className="hidden md:block text-[#f0e8dd]/80 hover:text-[#b89a6e] text-xs uppercase tracking-[0.18em] font-light transition-colors relative group"
            >
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#b89a6e] group-hover:w-full transition-all duration-300" />
            </a>

            <a
              href="https://wa.me/237697839818"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block px-4 py-2 border border-[#b89a6e] text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] text-xs tracking-[0.18em] uppercase font-light transition-all duration-300"
            >
              Book
            </a>

            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`block w-6 h-px bg-[#f0e8dd] transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-px bg-[#f0e8dd] transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-px bg-[#f0e8dd] transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>

          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0d1a1c]/98 backdrop-blur-md flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[#b89a6e]/30 mb-4">
              <Image src="/images/logo.jpg" alt="Hydra Beauty" fill className="object-cover" />
            </div>

            {[
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Abonements", href: "#abonements" },
              { label: "Contact", href: "#contact" },
            ].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-cormorant italic text-4xl text-[#f0e8dd] hover:text-[#b89a6e] transition"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="https://wa.me/237697839818"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 px-10 py-3 border border-[#b89a6e] text-[#b89a6e] text-sm uppercase tracking-[0.25em] font-light hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}