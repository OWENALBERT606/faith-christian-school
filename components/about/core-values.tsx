"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Users, Shield, Lightbulb, HandHeart, Sparkles } from "lucide-react"

export function CoreValues() {
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

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We lead with empathy and understanding, treating every person with dignity and respect.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We operate with transparency and accountability, ensuring trust in everything we do.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of collective action and building strong, supportive networks.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously seek creative solutions to address evolving community needs.",
    },
    {
      icon: HandHeart,
      title: "Service",
      description: "We are committed to selfless giving and making a tangible difference in people's lives.",
    },
    {
      icon: Sparkles,
      title: "Excellence",
      description: "We strive for the highest standards in our programs, partnerships, and impact.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            These principles guide our work and define who we are as an organization
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full border border-border group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
