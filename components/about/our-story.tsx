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
                Faith Christian School Ministries began not in a boardroom but outside the treeshade, but in the heart of faithful families in year 2016. Kwiringira Joel and a group of parents and church leaders envisioned a school where academic excellence and biblical truth would be inseparable. <br />

Driven by the mission to train up a child in the way he should go (Proverbs 22:6), we started with humble beginnings—wooden classrooms from nursery to class 5. Through decades of praying and God’s unwavering provision, the vision has flourished. <br />

We want to begin building a 3-story classroom block consisting of 15 classrooms and dormitories. What began as a single classroom has grown into a vibrant ministry serving students from preschool through 12th grade. Each new building stands as a statement to God’s faithfulness. Our history is the foundation upon which we stand. But our mission remains the same—to partner with families to educate and inspire the next generation of Christian leaders. We are honored to carry this legacy of faith forward.
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
