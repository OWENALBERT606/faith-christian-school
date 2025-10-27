import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="admissions" className="py-4 sm:py-4 lg:py-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vIf0uiftYC8v3B5MyvUCDVhpR3Vdgd.png"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Join Us in Making a <span className="text-secondary">Difference</span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            Your support can transform lives. Whether through donations, volunteering, or spreading the word, every
            action counts in building stronger communities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-secondary flex justify-center items-center text-center hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-8 py-2 rounded-lg group"
            >
              Donate Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-6 bg-transparent"
            >
              Become a Volunteer
            </Button>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-card rounded-xl border-2 border-border">
              <div className="text-2xl font-bold text-secondary mb-2">Step 1</div>
              <div className="font-semibold text-foreground mb-1">Choose Your Cause</div>
              <div className="text-sm text-muted-foreground">Select a program to support</div>
            </div>
            <div className="p-6 bg-card rounded-xl border-2 border-border">
              <div className="text-2xl font-bold text-secondary mb-2">Step 2</div>
              <div className="font-semibold text-foreground mb-1">Take Action</div>
              <div className="text-sm text-muted-foreground">Donate, volunteer, or partner</div>
            </div>
            <div className="p-6 bg-card rounded-xl border-2 border-border">
              <div className="text-2xl font-bold text-secondary mb-2">Step 3</div>
              <div className="font-semibold text-foreground mb-1">See the Impact</div>
              <div className="text-sm text-muted-foreground">Track your contribution</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
