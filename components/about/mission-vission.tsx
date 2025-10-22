"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Eye, Heart } from "lucide-react"

export function MissionVision() {
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

  const items = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower underserved communities through faith-based programs that provide essential resources, education, and support, enabling individuals and families to break the cycle of poverty and build sustainable futures.",
      color: "text-primary",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "A world where every person has access to the resources, opportunities, and support they need to thrive, regardless of their circumstances. We envision communities united in faith and compassion, working together to create lasting change.",
      color: "text-secondary",
    },
    {
      icon: Heart,
      title: "Our Purpose",
      description:
        "To serve as a beacon of hope and transformation, demonstrating God's love through practical action. We exist to bridge gaps, restore dignity, and create pathways to prosperity for those who need it most.",
      color: "text-accent",
    },
  ]

  return (
    <section ref={sectionRef} className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full border border-border">
                <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 ${item.color}`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
