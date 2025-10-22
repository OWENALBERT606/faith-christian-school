"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const campaigns = [
  {
    id: 1,
    title: "Build Schools in Rural Areas",
    description: "Help us construct three new schools to provide quality education to 1,000 children.",
    goal: 100000,
    raised: 67500,
    supporters: 342,
    daysLeft: 23,
    image: "/african-children-enjoying-life.jpg",
  },
  {
    id: 2,
    title: "Emergency Relief Fund",
    description: "Provide immediate assistance to families affected by recent natural disasters.",
    goal: 50000,
    raised: 43200,
    supporters: 521,
    daysLeft: 12,
    image: "/closeup-shot-boy-doctor-wearing-sanitary-mask.jpg",
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    description: "Install water purification systems in 20 villages to ensure access to safe drinking water.",
    goal: 75000,
    raised: 28900,
    supporters: 198,
    daysLeft: 45,
    image: "/UN0211928.jpg",
  },
]

export function CampaignsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll("[data-campaign-card]")
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])])
              }, index * 200)
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
    <section ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Active Campaigns</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join our ongoing initiatives and make a direct impact on communities in need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => {
            const percentage = (campaign.raised / campaign.goal) * 100

            return (
              <div
                key={campaign.id}
                data-campaign-card
                className={`transition-all duration-700 ${
                  visibleCards.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {campaign.daysLeft} days left
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3 text-balance">{campaign.title}</h3>
                    <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">{campaign.description}</p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-foreground">
                            ${campaign.raised.toLocaleString()} raised
                          </span>
                          <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{campaign.supporters} supporters</span>
                        <span>{percentage.toFixed(0)}% funded</span>
                      </div>

                      <Button className="w-full">Donate Now</Button>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
