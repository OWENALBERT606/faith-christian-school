
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Calendar } from "lucide-react"
import Link from "next/link"

export default async function StoryDetailPage({story}:{story:any}) {
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img src="/close-up-team-hand-shake.jpg" alt={story.title} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>

        <div className="container py-8 mx-auto px-4 -mt-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-10">
              <Badge variant="secondary" className="mb-4">
                {story.category.name}
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance">{story.title}</h1>

              {/* Author Info */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={story.authorImage || "/placeholder.svg"} alt={story.author} />
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{story.author}</div>
                  <div className="text-sm text-muted-foreground">{story.authorBio}</div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {story.date}
                    </div>
                    <span>•</span>
                    <span>{story.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="prose prose-lg max-w-none mb-8">
                {story.content.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b">
                {story.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    {story.likes} Likes
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {story.comments} Comments
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* CTA */}
              <Card className="bg-muted p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Inspired by this story?</h3>
                <p className="text-muted-foreground mb-4">
                  Help us create more success stories like Maria's by supporting our programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="bg-accent hover:bg-accent/90">
                    <Link href="/donate">Make a Donation</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/stories">Read More Stories</Link>
                  </Button>
                </div>
              </Card>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
