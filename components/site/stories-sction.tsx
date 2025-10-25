"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"


export function StoriesSection({stories}: {stories:any}) {
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
          {stories.slice(0,3).map((story:any, index:any) => (
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
                  <Link href={`/stories/${story.id}`} className="group/btn flex gap-2 p-2 justify-center text-center items-center bg-yellow-400 rounded-lg h-auto font-medium text-primary">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
