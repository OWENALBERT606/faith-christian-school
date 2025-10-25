
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

const stories = [
  {
    id: 1,
    title: "From Struggle to Success: Maria's Journey",
    category: "Education",
    author: "Maria Rodriguez",
    authorImage: "/smiling-woman-portrait.png",
    date: "March 5, 2025",
    readTime: "5 min read",
    image: "/young-woman-graduating-university.jpg",
    excerpt: "How a scholarship program changed my life and opened doors I never thought possible.",
    likes: 342,
    comments: 28,
    featured: true,
  },
  {
    id: 2,
    title: "A Village Transformed by Clean Water",
    category: "Water & Sanitation",
    author: "John Kamau",
    authorImage: "/smiling-man-portrait.png",
    date: "February 28, 2025",
    readTime: "4 min read",
    image: "/african-village-with-water-well.jpg",
    excerpt: "Our community's story of how access to clean water brought health, hope, and prosperity.",
    likes: 289,
    comments: 19,
    featured: true,
  },
  {
    id: 3,
    title: "Rebuilding After the Storm",
    category: "Disaster Relief",
    author: "Sarah Chen",
    authorImage: "/asian-woman-portrait.png",
    date: "February 20, 2025",
    readTime: "6 min read",
    image: "/community-rebuilding.png",
    excerpt: "How emergency relief efforts helped our family and community recover from devastating floods.",
    likes: 456,
    comments: 34,
    featured: false,
  },
  {
    id: 4,
    title: "My Small Business Dream Came True",
    category: "Empowerment",
    author: "Amina Hassan",
    authorImage: "/woman-entrepreneur-portrait.png",
    date: "February 15, 2025",
    readTime: "5 min read",
    image: "/woman-small-business-owner-shop.jpg",
    excerpt: "With microfinance support and training, I turned my passion into a thriving business.",
    likes: 378,
    comments: 42,
    featured: false,
  },
  {
    id: 5,
    title: "Healthcare Came to Our Doorstep",
    category: "Healthcare",
    author: "Raj Patel",
    authorImage: "/elderly-man-joy.png",
    date: "February 10, 2025",
    readTime: "4 min read",
    image: "/mobile-health-clinic-rural-area.jpg",
    excerpt: "The mobile clinic brought life-saving medical care to our remote village.",
    likes: 267,
    comments: 15,
    featured: false,
  },
  {
    id: 6,
    title: "Teaching the Next Generation",
    category: "Education",
    author: "David Okonkwo",
    authorImage: "/teacher-portrait.png",
    date: "February 5, 2025",
    readTime: "5 min read",
    image: "/teacher-with-students-classroom.jpg",
    excerpt: "As a volunteer teacher, I witnessed the power of education to transform young lives.",
    likes: 412,
    comments: 31,
    featured: false,
  },
]

export default function StoriesPage() {
  const featuredStories = stories.filter((s) => s.featured)
  const regularStories = stories.filter((s) => !s.featured)

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Stories of Impact</h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                Real stories from real people whose lives have been touched by our work. These are the faces behind the
                change we create together.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={story.authorImage || "/placeholder.svg"} alt={story.author} />
                        <AvatarFallback>
                          {story.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-sm">{story.author}</div>
                        <div className="text-xs text-muted-foreground">
                          {story.date} • {story.readTime}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {story.category}
                    </Badge>
                    <CardTitle className="text-2xl">{story.title}</CardTitle>
                    <CardDescription className="text-base">{story.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{story.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{story.comments}</span>
                        </div>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/stories/${story.id}`}>Read Full Story</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Stories */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={story.authorImage || "/placeholder.svg"} alt={story.author} />
                        <AvatarFallback>
                          {story.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-xs">{story.author}</div>
                        <div className="text-xs text-muted-foreground">{story.date}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">
                      {story.category}
                    </Badge>
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{story.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{story.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{story.comments}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{story.readTime}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={`/stories/${story.id}`}>Read Story</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
