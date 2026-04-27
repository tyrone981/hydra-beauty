"use client"

import { useEffect, useState } from "react"

const words = [
  { text: "Hydra", color: "#f0e8dd" },
  { text: "Beauty", color: "#b89a6e" },
]

export default function TrueFocus() {
  const [focusIndex, setFocusIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <h1 className="flex items-center gap-3 flex-nowrap">
      {words.map((word, i) => (
        <span
          key={word.text}
          className="relative font-cormorant italic leading-none transition-all duration-700 inline-flex items-center justify-center px-3 py-1"
          style={{
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            color: word.color,
            filter: focusIndex === i ? "blur(0px)" : "blur(2.5px)",
            opacity: focusIndex === i ? 1 : 0.3,
            textShadow: focusIndex === i
              ? `0 0 25px rgba(184,154,110,0.6), 0 0 50px rgba(184,154,110,0.2)`
              : "none",
            transition: "all 0.7s ease",
          }}
        >
          {focusIndex === i && (
            <>
             
              <span className="absolute top-0 left-0 w-3 h-3 pointer-events-none" style={{ borderTop: "1.5px solid #b89a6e", borderLeft: "1.5px solid #b89a6e" }} />
             
              <span className="absolute top-0 right-0 w-3 h-3 pointer-events-none" style={{ borderTop: "1.5px solid #b89a6e", borderRight: "1.5px solid #b89a6e" }} />
             
              <span className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none" style={{ borderBottom: "1.5px solid #b89a6e", borderLeft: "1.5px solid #b89a6e" }} />
            
              <span className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none" style={{ borderBottom: "1.5px solid #b89a6e", borderRight: "1.5px solid #b89a6e" }} />
             
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full pointer-events-none" style={{ background: "#b89a6e", boxShadow: "0 0 6px rgba(184,154,110,0.8)" }} />
            </>
          )}
          {word.text}
        </span>
      ))}
    </h1>
  )
}