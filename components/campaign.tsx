
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Users, Calendar, Heart, Share2, TrendingUp } from "lucide-react"

const campaignData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Clean Water for Rural Communities",
    category: "Water & Sanitation",
    image: "/clean-water-well-in-rural-village.jpg",
    description: "Providing access to clean drinking water for 50 villages in need.",
    longDescription: `Access to clean water is a fundamental human right, yet millions of people in rural communities still lack this basic necessity. Our Clean Water Campaign aims to change that.

We're working to install water wells, purification systems, and sanitation facilities in 50 villages across the region. Each well serves approximately 500 people, providing them with safe drinking water and reducing waterborne diseases by up to 80%.

Your support will help us purchase equipment, train local maintenance teams, and ensure sustainable water access for generations to come. Together, we can make clean water a reality for thousands of families.`,
    goal: 100000,
    raised: 67500,
    supporters: 1250,
    daysLeft: 45,
    startDate: "January 15, 2025",
    endDate: "April 30, 2025",
    impact: [
      "50 villages will receive clean water access",
      "25,000 people will benefit directly",
      "80% reduction in waterborne diseases expected",
      "15 local technicians trained for maintenance",
      "Sustainable water management systems established",
    ],
    updates: [
      {
        date: "March 1, 2025",
        title: "First 10 Wells Completed!",
        content:
          "We're thrilled to announce that the first 10 water wells have been successfully installed and are now serving 5,000 people.",
      },
      {
        date: "February 15, 2025",
        title: "Community Training Sessions",
        content:
          "Local maintenance teams have completed their training and are ready to ensure long-term sustainability of the water systems.",
      },
    ],
    status: "active",
  },
}

export default function CampaignDetailPage({campaign}: { campaign:any}) {
  const percentage = Math.round((campaign.raised / campaign.goal) * 100)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img src={campaign.image || "/placeholder.svg"} alt={campaign.title} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>

        <div className="container mx-auto py-8 px-4 md:px-12 lg:px-24 -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                <Badge variant="secondary" className="mb-4">
                  {campaign.category.name}
                </Badge>

                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{campaign.title}</h1>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {campaign.longDescription}
                  </p>
                </div>

                {/* Impact */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Expected Impact</h2>
                  <ul className="space-y-3">
                    {campaign.impact.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Updates */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Campaign Updates</h2>
                  <div className="space-y-6">
                    {campaign.updates.map((update: any, index: number) => (
                      <div key={index} className="border-l-4 border-primary pl-4 py-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" />
                          {update.date}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{update.title}</h3>
                        <p className="text-muted-foreground">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Donation Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-primary">${campaign.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">raised</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">of ${campaign.goal.toLocaleString()} goal</div>
                  <Progress value={percentage} className="h-3 mb-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{percentage}% funded</span>
                    <span className="text-muted-foreground">{campaign.daysLeft} days left</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Supporters</span>
                    </div>
                    <span className="font-semibold">{campaign.supporters}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">Recent donations</span>
                    </div>
                    <span className="font-semibold">142</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold">Choose an amount</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[25, 50, 100, 250].map((amount) => (
                      <Button key={amount} variant="outline" className="w-full bg-transparent">
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input type="number" placeholder="Custom amount" className="pl-7" />
                  </div>
                </div>

                <Button className="w-full mb-3 bg-accent hover:bg-accent/90" size="lg">
                  <Heart className="h-4 w-4 mr-2" />
                  Donate Now
                </Button>

                <Button variant="outline" className="w-full mb-6 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Campaign
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  Your donation is tax-deductible and will be used to support this campaign.
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
