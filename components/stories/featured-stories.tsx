"use client"

import { Quote } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const featuredStories = [
  {
    id: 1,
    slug: "maria-journey-to-education",
    title: "Maria's Journey to Education",
    category: "Education",
    excerpt:
      "From struggling to read to becoming a teacher, Maria's story shows the transformative power of education and support.",
    image: "/maria-teacher-classroom-students.jpg",
    author: "Maria Santos",
    date: "March 10, 2025",
    featured: true,
  },
  {
    id: 2,
    slug: "john-family-new-beginning",
    title: "A Family's New Beginning",
    category: "Shelter",
    excerpt:
      "After losing everything, John and his family found hope and a fresh start through our housing assistance program.",
    image: "/family-new-home-happy.jpg",
    author: "John Williams",
    date: "March 5, 2025",
    featured: true,
  },
]

export function FeaturedStories() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These powerful stories showcase the real impact of your support and generosity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredStories.map((story, index) => (
            <Card
              key={story.id}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold text-sm">
                  Featured
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {story.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{story.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Quote className="w-4 h-4 text-secondary" />
                  <span>{story.author}</span>
                  <span>•</span>
                  <span>{story.date}</span>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{story.excerpt}</p>

                <Link href={`/stories/${story.slug}`}>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Read Full Story
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
