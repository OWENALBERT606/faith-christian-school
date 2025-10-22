"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar } from "lucide-react"

export function Timeline() {
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

  const milestones = [
    {
      year: "2010",
      title: "Foundation Established",
      description:
        "Faith Christian School Foundation was founded with a mission to serve underserved communities through faith-based programs.",
    },
    {
      year: "2012",
      title: "First Community Center",
      description:
        "Opened our first community center, providing a hub for educational programs and family support services.",
    },
    {
      year: "2015",
      title: "Healthcare Initiative Launch",
      description:
        "Launched our healthcare access program, partnering with local clinics to provide free medical services.",
    },
    {
      year: "2018",
      title: "Reached 10,000 Families",
      description: "Celebrated serving our 10,000th family, marking a significant milestone in our impact.",
    },
    {
      year: "2020",
      title: "Emergency Response Program",
      description: "Rapidly expanded services during the pandemic, providing emergency food and shelter assistance.",
    },
    {
      year: "2023",
      title: "Regional Expansion",
      description: "Expanded operations to serve five additional communities, tripling our reach and impact.",
    },
    {
      year: "2024",
      title: "Today",
      description: "Continuing to grow and serve with over 50 dedicated staff members and 200+ active volunteers.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of growth, impact, and transformation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0 relative z-10 shadow-lg">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1 bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-secondary">{milestone.year}</span>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
