"use client"

import { useEffect, useState } from "react"

export function AboutHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
      <div className="absolute inset-0 bg-[url('/community-helping-hands.jpg')] bg-cover bg-center opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            About Our Foundation
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto text-balance">
            Transforming lives through faith, compassion, and community action
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
