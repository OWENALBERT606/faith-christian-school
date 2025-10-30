"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Handshake, Users } from "lucide-react"
import { SponsorForm } from "@/components/sponsor-form"
import { PartnerForm } from "@/components/partner-form"
import { VolunteerForm } from "@/components/voliunteer-form"
import { ChildCard } from "@/components/childCard"

const children = [
  {
    id: 1,
    name: "Amara Johnson",
    age: 8,
    location: "Kenya",
    image: "/smiling-african-girl-age-8.jpg",
    background:
      "Amara loves reading and dreams of becoming a teacher. She lives with her grandmother in a rural village where access to education is limited. Your sponsorship will provide her with school supplies, uniforms, and nutritious meals.",
  },
  {
    id: 2,
    name: "Carlos Martinez",
    age: 10,
    location: "Guatemala",
    image: "/smiling-latino-boy-age-10.jpg",
    background:
      "Carlos is passionate about soccer and science. He helps his mother sell vegetables at the local market after school. With your support, Carlos can continue his education and pursue his dream of becoming an engineer.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    age: 7,
    location: "India",
    image: "/smiling-indian-girl-age-7.jpg",
    background:
      "Priya is a bright and curious child who loves drawing and painting. She lives in a small community where educational resources are scarce. Your sponsorship will help provide her with art supplies, books, and access to quality education.",
  },
  {
    id: 4,
    name: "Emmanuel Osei",
    age: 9,
    location: "Ghana",
    image: "/smiling-african-boy-age-9.jpg",
    background:
      "Emmanuel enjoys music and wants to learn to play the drums. He walks 5 kilometers to school each day. Your support will help provide him with proper shoes, school materials, and the opportunity to explore his musical talents.",
  },
  {
    id: 5,
    name: "Lucia Santos",
    age: 11,
    location: "Philippines",
    image: "/smiling-filipino-girl-age-11.jpg",
    background:
      "Lucia is a natural leader who helps organize study groups in her community. She dreams of becoming a doctor to help people in her village. Your sponsorship will support her education and healthcare needs.",
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    age: 8,
    location: "Bangladesh",
    image: "/smiling-bangladeshi-boy-age-8.jpg",
    background:
      "Ahmed loves mathematics and solving puzzles. He lives with his family in a densely populated area where opportunities are limited. With your help, Ahmed can access quality education and reach his full potential.",
  },
]

export default function Page() {
  const [selectedChild, setSelectedChild] = useState<(typeof children)[0] | null>(null)
  const [showPartnerForm, setShowPartnerForm] = useState(false)
  const [showVolunteerForm, setShowVolunteerForm] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{"Transform Lives Through Compassion"}</h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto text-pretty">
              {
                "Every child deserves a chance to dream, learn, and thrive. Join us in making a lasting difference in the lives of children around the world."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => setShowPartnerForm(true)} className="text-lg">
                <Handshake className="mr-2 h-5 w-5" />
                {"Partner With Us"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowVolunteerForm(true)}
                className="text-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Users className="mr-2 h-5 w-5" />
                {"Volunteer"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{"5,000+"}</div>
              <div className="text-muted-foreground">{"Children Sponsored"}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{"50+"}</div>
              <div className="text-muted-foreground">{"Countries Reached"}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{"98%"}</div>
              <div className="text-muted-foreground">{"Funds to Programs"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Children Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">{"Sponsor a Child Today"}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {
                "Meet the children waiting for a sponsor. Your monthly support provides education, healthcare, nutrition, and hope for a brighter future."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children.map((child) => (
              <ChildCard key={child.id} child={child} onSponsor={() => setSelectedChild(child)} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{"How Sponsorship Works"}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {"1"}
              </div>
              <h3 className="text-xl font-semibold mb-2">{"Choose a Child"}</h3>
              <p className="text-muted-foreground">
                {"Browse profiles and select a child whose story resonates with you."}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {"2"}
              </div>
              <h3 className="text-xl font-semibold mb-2">{"Make a Commitment"}</h3>
              <p className="text-muted-foreground">
                {"Complete the sponsorship form and set up your monthly contribution."}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {"3"}
              </div>
              <h3 className="text-xl font-semibold mb-2">{"Watch Them Grow"}</h3>
              <p className="text-muted-foreground">
                {"Receive updates, photos, and letters from your sponsored child."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto max-w-4xl text-center">
          <Heart className="w-16 h-16 text-accent-foreground mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent-foreground">
            {"Every Child Deserves a Champion"}
          </h2>
          <p className="text-lg text-accent-foreground/80 mb-8 text-pretty">
            {
              "Your support provides more than just resources—it gives children hope, dignity, and the opportunity to break the cycle of poverty."
            }
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {"Get Started Today"}
          </Button>
        </div>
      </section>

      {/* Forms */}
      <SponsorForm child={selectedChild} open={!!selectedChild} onClose={() => setSelectedChild(null)} />
      <PartnerForm open={showPartnerForm} onClose={() => setShowPartnerForm(false)} />
      <VolunteerForm open={showVolunteerForm} onClose={() => setShowVolunteerForm(false)} />
    </div>
  )
}
