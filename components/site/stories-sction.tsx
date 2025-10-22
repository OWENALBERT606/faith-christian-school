"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const stories = [
  {
    id: 1,
    title: "Empowering Rural Communities",
    excerpt: "How we brought clean water and education to 500 families in remote villages.",
    image: "/malawi_chop.jpg",
    impact: "500 families",
  },
  {
    id: 2,
    title: "Education Changes Lives",
    excerpt: "Meet Sarah, who became the first in her family to attend university through our scholarship program.",
    image: "/071209_africa_hmed_12p.jpg",
    impact: "200 scholarships",
  },
  {
    id: 3,
    title: "Healthcare for All",
    excerpt: "Our mobile clinics have provided essential medical care to thousands in underserved areas.",
    image: "/pexels-denis-ngai-4483669-scaled (1).jpg",
    impact: "5,000 patients",
  },
]

export function StoriesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll("[data-story-card]")
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-4 md:py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Stories of Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real stories from the communities we serve, showcasing the transformative power of collective action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={story.id}
              data-story-card
              className={`transition-all duration-700 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {story.impact}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3 text-balance">{story.title}</h3>
                  <p className="text-muted-foreground mb-4 text-pretty leading-relaxed">{story.excerpt}</p>
                  <Button variant="ghost" className="group/btn p-0 h-auto font-medium text-primary">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
