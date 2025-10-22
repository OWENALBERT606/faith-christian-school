export function StatsSection() {
  const stats = [
    { number: "10K+", label: "Lives Impacted" },
    { number: "50+", label: "Community Programs" },
    { number: "25+", label: "Years of Service" },
    { number: "500+", label: "Volunteers" },
  ]

  return (
    <section className="py-4 sm:py-4 md:py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-2">{stat.number}</div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
