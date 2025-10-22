"use client"

import { useEffect, useRef, useState } from "react"
import { Users, Heart, Building, Award } from "lucide-react"

export function ImpactStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ families: 0, volunteers: 0, programs: 0, years: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  const finalCounts = {
    families: 25000,
    volunteers: 200,
    programs: 15,
    years: 14,
  }

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

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounts({
        families: Math.floor(finalCounts.families * progress),
        volunteers: Math.floor(finalCounts.volunteers * progress),
        programs: Math.floor(finalCounts.programs * progress),
        years: Math.floor(finalCounts.years * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCounts(finalCounts)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible])

  const stats = [
    {
      icon: Users,
      value: counts.families.toLocaleString(),
      label: "Families Served",
      suffix: "+",
    },
    {
      icon: Heart,
      value: counts.volunteers.toLocaleString(),
      label: "Active Volunteers",
      suffix: "+",
    },
    {
      icon: Building,
      value: counts.programs.toLocaleString(),
      label: "Programs Running",
      suffix: "",
    },
    {
      icon: Award,
      value: counts.years.toLocaleString(),
      label: "Years of Service",
      suffix: "",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Impact by the Numbers</h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Real results from our commitment to serving communities
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-colors border border-white/20">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div> 
      </div>
    </section>
  )
}
