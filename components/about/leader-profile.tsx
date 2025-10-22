"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"

export function LeaderProfile() {
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
    <section ref={sectionRef} className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Meet Our Founder</h2>
            <p className="text-muted-foreground text-lg">The visionary behind our mission</p>
          </div>

          <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
            <div className="grid md:grid-cols-5 gap-8">
              <div
                className={`md:col-span-2 transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <div className="relative h-full min-h-[400px]">
                  <Image src="/founder.jpg" alt="Founder" fill className="object-cover" />
                </div>
              </div>

              <div
                className={`md:col-span-3 p-8 md:p-12 transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Kwiringira Joel</h3>
                  <p className="text-secondary font-semibold">Founder & Executive Director</p>
                </div>

                <div className="relative mb-6">
                  <Quote className="w-10 h-10 text-accent absolute -top-2 -left-2 opacity-50" />
                  <p className="text-muted-foreground italic pl-8 text-lg leading-relaxed">
                    "Every person we serve reminds me why this work matters. It's not just about providing
                    resources—it's about restoring hope, dignity, and the belief that a better future is possible."
                  </p>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Mr. Kwiringira Joel brings over 10 years of experience in community development and faith-based
                    outreach. His passion for serving others was ignited during her early work as a missionary, where
                    he witnessed firsthand the transformative power of compassionate action.
                  </p>
                  <p>
                    With a doctorate in Social Work and a Master of Divinity, Kwiringira Joel expertise with
                    deep spiritual conviction. Under his leadership, Faith Christian School Foundation has grown from a
                    small local initiative to a recognized force for positive change.
                  </p>
                  <p>
                    Kwiringira Joel's vision continues to guide our organization as we expand our programs and deepen our impact
                    in communities across the region.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
