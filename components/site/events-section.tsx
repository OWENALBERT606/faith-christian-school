"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Annual Charity Gala",
    description: "Join us for an evening of inspiration, entertainment, and fundraising for our education programs.",
    date: "March 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Grand Ballroom, City Center",
    attendees: 250,
    image: "/pexels-denis-ngai-4483669-scaled (1).jpg",
    category: "Fundraiser",
  },
  {
    id: 2,
    title: "Community Volunteer Day",
    description: "Help us build a playground for children in the Riverside neighborhood.",
    date: "March 22, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Riverside Community Park",
    attendees: 85,
    image: "/close-up-community-concept-with-hands.jpg",
    category: "Volunteer",
  },
  {
    id: 3,
    title: "Health & Wellness Workshop",
    description: "Free health screenings and wellness education for underserved communities.",
    date: "April 5, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Community Health Center",
    attendees: 120,
    image: "/closeup-shot-boy-doctor-wearing-sanitary-mask.jpg",
    category: "Workshop",
  },
  {
    id: 4,
    title: "Youth Leadership Summit",
    description: "Empowering the next generation of leaders through mentorship and skill-building activities.",
    date: "April 18, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Innovation Hub",
    attendees: 150,
    category: "Education",
    image: "/close-up-women-holding-each-other.jpg",

  },
]

export function EventsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll("[data-event-card]")
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
    <section ref={sectionRef} className="py-4 md:py-8 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Connect with our community and participate in events that create lasting change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              data-event-card
              className={`transition-all duration-700 ${
                visibleCards.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                <div className="md:flex">
                  <div className="relative overflow-hidden md:w-2/5">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3 text-balance">{event.title}</h3>
                    <p className="text-muted-foreground mb-4 text-pretty leading-relaxed flex-grow">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>

                    <Button className="w-full">Register Now</Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
