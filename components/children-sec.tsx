import React from 'react'
import { ChildCard } from './childCard'
import { SponsorForm } from './sponsor-form'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Handshake, Users } from "lucide-react"
import { PartnerForm } from "@/components/partner-form"
import { VolunteerForm } from "@/components/voliunteer-form"
import { getChildren } from "@/actions/sponsor"



export default function ChildrenSec({children}: {children: any[]}) {
      const [selectedChild, setSelectedChild] = useState<(typeof children)[0] | null>(null)
  return (
    <div>
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
            {children.map((child:any) => (
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
    </div>
  )
}
