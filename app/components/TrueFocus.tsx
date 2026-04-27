"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

type FocusRect = {
  x: number
  y: number
  width: number
  height: number
}

type TrueFocusProps = {
  sentence: string
}

export default function TrueFocus({ sentence }: TrueFocusProps) {
  const words = sentence.split(" ")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const containerRef = useRef<HTMLDivElement | null>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    setCurrentIndex(0)
  }, [sentence])

  useEffect(() => {
    if (words.length <= 1) return

    const timeout = setTimeout(() => {
      setCurrentIndex(1)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [words.length])

  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return

    const parentRect = containerRef.current.getBoundingClientRect()
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect()

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    })
  }, [currentIndex, words.length])

  const handleMouseEnter = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-flex flex-wrap gap-2"
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            className="font-cormorant italic text-5xl md:text-6xl lg:text-7xl leading-tight"
            style={{
              color: isActive ? "#f0e8dd" : "#c8beb4",
              filter: isActive ? "blur(0px)" : "blur(8px)",
              transition: "filter 0.7s ease, color 0.7s ease",
            }}
          >
            {word}
          </span>
        )
      })}

      {words.length > 0 && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
          }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="absolute inset-[-6px] rounded-lg"
            style={{
              boxShadow: "0 0 32px rgba(184, 154, 110, 0.55)",
              opacity: 0.55,
            }}
          />
          <span
            className="absolute w-4 h-4 border-[2px] rounded-[2px]"
            style={{
              top: "-6px",
              left: "-6px",
              borderColor: "#b89a6e",
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
            }}
          />
          <span
            className="absolute w-4 h-4 border-[2px] rounded-[2px]"
            style={{
              top: "-6px",
              right: "-6px",
              borderColor: "#b89a6e",
              borderLeftColor: "transparent",
              borderBottomColor: "transparent",
            }}
          />
          <span
            className="absolute w-4 h-4 border-[2px] rounded-[2px]"
            style={{
              bottom: "-6px",
              left: "-6px",
              borderColor: "#b89a6e",
              borderRightColor: "transparent",
              borderTopColor: "transparent",
            }}
          />
          <span
            className="absolute w-4 h-4 border-[2px] rounded-[2px]"
            style={{
              bottom: "-6px",
              right: "-6px",
              borderColor: "#b89a6e",
              borderLeftColor: "transparent",
              borderTopColor: "transparent",
            }}
          />
        </motion.div>
      )}
    </div>
  )
}