import { Shield, Lightbulb, HandHeart, Target } from "lucide-react"

export function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold the highest standards of honesty, ethics, and moral character in all we do.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace creative thinking and modern approaches to education while staying true to our values.",
    },
    {
      icon: HandHeart,
      title: "Compassion",
      description: "We foster a caring community where every individual is valued, respected, and supported.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in academics, character development, and spiritual growth.",
    },
  ]

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full mb-6">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Values</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Guided by Faith, Driven by <span className="text-accent">Purpose</span>
          </h2>

          <p className="text-lg text-primary-foreground/90 leading-relaxed">
            Our core values shape everything we do, from classroom instruction to community engagement, ensuring a
            holistic educational experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-300">
                <value.icon className="w-10 h-10 text-accent" />
              </div>

              <h3 className="text-xl font-bold mb-3">{value.title}</h3>

              <p className="text-primary-foreground/80 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
