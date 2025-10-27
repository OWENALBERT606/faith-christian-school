import { Heart, Users, Target, HandHeart } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Serving communities with love and dedication",
    },
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Focused on creating sustainable, lasting impact",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building strong relationships and empowering families",
    },
    {
      icon: HandHeart,
      title: "Faith-Based Values",
      description: "Guided by Christian principles in all we do",
    },
  ]

  return (
    <section id="about" className="py-4 sm:py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/close-up-team-hand-shake.jpg"
                alt="Faith Christian School Foundation community impact"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
          </div>

          <div>
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Empowering Communities Through <span className="text-secondary">Faith & Action</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Is Centered Around Children <br />

Their development comes first in every aspect of our work. All the choices we make are motivated by the desire to raise them to be self-confident, reliable, respectable individuals. We believe a good development has its foundation in Christian values. We do not separate children from our work but involve them where we see the opportunity for them to develop or express themselves.

Actions can result in families or society treating a child or an adult as a nobody. Some feel then nobody is worthy of any effort, money, or problems.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
