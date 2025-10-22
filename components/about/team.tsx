"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"

export function TeamMembers() {
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

  const team = [
    {
      name: "Michael Chen",
      role: "Director of Programs",
      image: "/professional-asian-man-portrait.png",
      bio: "15+ years in nonprofit management",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Outreach Manager",
      image: "/professional-latina-woman-portrait.png",
      bio: "Passionate about community engagement",
    },
    {
      name: "David Thompson",
      role: "Finance Director",
      image: "/professional-man-portrait-glasses.png",
      bio: "Ensuring transparency and accountability",
    },
    {
      name: "Aisha Patel",
      role: "Healthcare Coordinator",
      image: "/professional-indian-woman-portrait.png",
      bio: "Former nurse with a heart for service",
    },
    {
      name: "James Wilson",
      role: "Education Programs Lead",
      image: "/professional-black-man-portrait.png",
      bio: "Dedicated to empowering through education",
    },
    {
      name: "Maria Santos",
      role: "Volunteer Coordinator",
      image: "/professional-woman-portrait-smile.jpg",
      bio: "Building bridges through volunteerism",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the dedicated professionals making our mission a reality
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group border border-border">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-4">
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-secondary transition-colors">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-secondary transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-secondary font-semibold mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
