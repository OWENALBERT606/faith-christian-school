
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp } from "lucide-react"
import Link from "next/link"

const campaigns = [
  {
    id: 1,
    title: "Clean Water for Rural Communities",
    category: "Water & Sanitation",
    image: "/clean-water-well-in-rural-village.jpg",
    description: "Providing access to clean drinking water for 50 villages in need.",
    goal: 100000,
    raised: 67500,
    supporters: 1250,
    daysLeft: 45,
    status: "active",
  },
  {
    id: 2,
    title: "Education for Every Child",
    category: "Education",
    image: "/classroom-learning.png",
    description: "Building schools and providing educational resources for underprivileged children.",
    goal: 150000,
    raised: 128000,
    supporters: 2100,
    daysLeft: 30,
    status: "active",
  },
  {
    id: 3,
    title: "Emergency Relief Fund",
    category: "Disaster Relief",
    image: "/disaster-relief-volunteers-helping.jpg",
    description: "Rapid response fund for communities affected by natural disasters.",
    goal: 200000,
    raised: 185000,
    supporters: 3400,
    daysLeft: 15,
    status: "active",
  },
  {
    id: 4,
    title: "Healthcare Access Initiative",
    category: "Healthcare",
    image: "/mobile-health-clinic-in-community.jpg",
    description: "Mobile health clinics bringing medical care to remote areas.",
    goal: 80000,
    raised: 92000,
    supporters: 1680,
    daysLeft: 0,
    status: "completed",
  },
  {
    id: 5,
    title: "Women Empowerment Program",
    category: "Empowerment",
    image: "/women-learning-vocational-skills.jpg",
    description: "Skills training and microfinance support for women entrepreneurs.",
    goal: 75000,
    raised: 45000,
    supporters: 890,
    daysLeft: 60,
    status: "active",
  },
  {
    id: 6,
    title: "Reforestation Project",
    category: "Environment",
    image: "/volunteers-planting-trees-forest.jpg",
    description: "Planting 100,000 trees to combat climate change and restore ecosystems.",
    goal: 50000,
    raised: 38500,
    supporters: 1520,
    daysLeft: 40,
    status: "active",
  },
]

export default function CampaignsPage() {
  const activeCampaigns = campaigns.filter((c) => c.status === "active")
  const completedCampaigns = campaigns.filter((c) => c.status === "completed")

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Campaigns</h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                Support our ongoing initiatives to create lasting change. Every contribution brings us closer to our
                goals.
              </p>
            </div>
          </div>
        </section>

        {/* Active Campaigns */}
        <section className="py-16 px-4 md:px-12 lg:px-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Active Campaigns</h2>
              <Badge variant="secondary" className="text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                {activeCampaigns.length} Active
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCampaigns.map((campaign) => {
                const percentage = Math.round((campaign.raised / campaign.goal) * 100)

                return (
                  <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {campaign.category}
                      </Badge>
                      <CardTitle className="text-xl">{campaign.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span className="font-semibold text-primary">${campaign.raised.toLocaleString()}</span>
                          <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <span>{percentage}% funded</span>
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="h-4 w-4" />
                        <span>{campaign.supporters} supporters</span>
                      </div>

                      <Button asChild className="w-full bg-accent hover:bg-accent/90">
                        <Link href={`/campaigns/${campaign.id}`}>Support Campaign</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Completed Campaigns */}
        <section className="py-16 bg-muted px-4 md:px-12 lg:px-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Completed Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCampaigns.map((campaign) => {
                const percentage = Math.round((campaign.raised / campaign.goal) * 100)

                return (
                  <Card key={campaign.id} className="overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        className="object-cover w-full h-full opacity-80"
                      />
                      <Badge className="absolute top-4 right-4 bg-primary">✓ Completed</Badge>
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {campaign.category}
                      </Badge>
                      <CardTitle className="text-xl">{campaign.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span className="font-semibold text-primary">${campaign.raised.toLocaleString()}</span>
                          <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-2">{percentage}% funded • Goal exceeded!</div>
                      </div>

                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href={`/campaigns/${campaign.id}`}>View Impact</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
