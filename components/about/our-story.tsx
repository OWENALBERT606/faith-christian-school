"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function OurStory() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-8 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Faith Christian School Foundation was born from a simple yet powerful vision: to create lasting change
                in communities that need it most. What started as a small group of dedicated volunteers has grown into a
                comprehensive organization serving thousands of families each year.
              </p>
              <p>
                Our journey began in 2010 when our founder recognized the urgent need for faith-based community support
                in underserved areas. With nothing but determination and a deep commitment to service, we launched our
                first program providing meals and educational resources to local families.
              </p>
              <p>
                Over the years, we've expanded our reach and impact, developing programs that address healthcare, food
                security, education access, shelter, and family support. Each initiative is rooted in our core belief
                that every person deserves dignity, opportunity, and hope.
              </p>
              <p>
                Today, we're proud to serve as a trusted partner to communities across the region, working alongside
                local leaders, volunteers, and donors who share our vision of a more compassionate and equitable world.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image alt="about-us" src="/african-children-enjoying-life.jpg" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
