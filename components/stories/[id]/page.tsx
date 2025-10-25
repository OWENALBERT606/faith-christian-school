
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Calendar } from "lucide-react"
import Link from "next/link"

const storyData: Record<string, any> = {
  "1": {
    id: 1,
    title: "From Struggle to Success: Maria's Journey",
    category: "Education",
    author: "Maria Rodriguez",
    authorImage: "/smiling-woman-portrait.png",
    authorBio: "University graduate and community advocate passionate about education access for all.",
    date: "March 5, 2025",
    readTime: "5 min read",
    image: "/young-woman-graduating-university.jpg",
    content: `Growing up in a small rural town, I never imagined I would one day walk across a university stage to receive my diploma. My family struggled financially, and higher education seemed like an impossible dream.

Everything changed when I learned about the Hope Foundation's scholarship program. Not only did they provide financial support, but they also offered mentorship, tutoring, and career guidance. The program believed in me when I barely believed in myself.

The journey wasn't easy. There were nights I studied until dawn, moments of doubt, and times when I wanted to give up. But the support system around me—my mentors, fellow scholars, and the foundation staff—kept me going.

Today, I'm not just a university graduate. I'm a teacher in my hometown, working to inspire the next generation of students. I want every child to know that their dreams are valid, no matter where they come from or what obstacles they face.

The scholarship didn't just change my life—it changed my family's trajectory and gave me the tools to uplift my entire community. Education is truly the key to breaking the cycle of poverty, and I'm living proof of that.

To everyone who supported the education program: thank you. You didn't just invest in my education; you invested in the future of countless children who will benefit from having a teacher who understands their struggles and believes in their potential.`,
    likes: 342,
    comments: 28,
    tags: ["Education", "Scholarship", "Success Story", "Community Impact"],
  },
}

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const story = storyData[params.id] || storyData["1"]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img src={story.image || "/placeholder.svg"} alt={story.title} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-10">
              <Badge variant="secondary" className="mb-4">
                {story.category}
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance">{story.title}</h1>

              {/* Author Info */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={story.authorImage || "/placeholder.svg"} alt={story.author} />
                  <AvatarFallback>
                    {story.author
                      .split(" ")
                      .map((n:any) => n[0])
                      .join("")}
                  </AvatarFallback>
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
