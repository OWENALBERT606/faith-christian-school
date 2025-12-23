
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Input } from "@/components/ui/input"
// import { Users, Calendar, Heart, Share2, TrendingUp } from "lucide-react"

// const campaignData: Record<string, any> = {
//   "1": {
//     id: 1,
//     title: "Clean Water for Rural Communities",
//     category: "Water & Sanitation",
//     image: "/clean-water-well-in-rural-village.jpg",
//     description: "Providing access to clean drinking water for 50 villages in need.",
//     longDescription: `Access to clean water is a fundamental human right, yet millions of people in rural communities still lack this basic necessity. Our Clean Water Campaign aims to change that.

// We're working to install water wells, purification systems, and sanitation facilities in 50 villages across the region. Each well serves approximately 500 people, providing them with safe drinking water and reducing waterborne diseases by up to 80%.

// Your support will help us purchase equipment, train local maintenance teams, and ensure sustainable water access for generations to come. Together, we can make clean water a reality for thousands of families.`,
//     goal: 100000,
//     raised: 67500,
//     supporters: 1250,
//     daysLeft: 45,
//     startDate: "January 15, 2025",
//     endDate: "April 30, 2025",
//     impact: [
//       "50 villages will receive clean water access",
//       "25,000 people will benefit directly",
//       "80% reduction in waterborne diseases expected",
//       "15 local technicians trained for maintenance",
//       "Sustainable water management systems established",
//     ],
//     updates: [
//       {
//         date: "March 1, 2025",
//         title: "First 10 Wells Completed!",
//         content:
//           "We're thrilled to announce that the first 10 water wells have been successfully installed and are now serving 5,000 people.",
//       },
//       {
//         date: "February 15, 2025",
//         title: "Community Training Sessions",
//         content:
//           "Local maintenance teams have completed their training and are ready to ensure long-term sustainability of the water systems.",
//       },
//     ],
//     status: "active",
//   },
// }

// export default function CampaignDetailPage({campaign}: { campaign:any}) {
//   const percentage = Math.round((campaign.raised / campaign.goal) * 100)

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1">
//         {/* Hero Image */}
//         <div className="relative h-[400px] md:h-[500px] overflow-hidden">
//           <img src={campaign.image || "/placeholder.svg"} alt={campaign.title} className="object-cover w-full h-full" />
//           <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
//         </div>

//         <div className="container mx-auto py-8 px-4 md:px-12 lg:px-24 -mt-20 relative z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2">
//               <Card className="p-6 md:p-8">
//                 <Badge variant="secondary" className="mb-4">
//                   {campaign.category.name}
//                 </Badge>

//                 <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{campaign.title}</h1>

//                 <div className="prose prose-lg max-w-none mb-8">
//                   <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
//                     {campaign.longDescription}
//                   </p>
//                 </div>

//                 {/* Impact */}
//                 <div className="mb-8">
//                   <h2 className="text-2xl font-bold mb-4">Expected Impact</h2>
//                   <ul className="space-y-3">
//                     {campaign.impact.map((item: string, index: number) => (
//                       <li key={index} className="flex items-start gap-3">
//                         <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
//                         <span className="text-muted-foreground">{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Updates */}
//                 <div>
//                   <h2 className="text-2xl font-bold mb-4">Campaign Updates</h2>
//                   <div className="space-y-6">
//                     {campaign.updates.map((update: any, index: number) => (
//                       <div key={index} className="border-l-4 border-primary pl-4 py-2">
//                         <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
//                           <Calendar className="h-4 w-4" />
//                           {update.date}
//                         </div>
//                         <h3 className="font-semibold text-lg mb-2">{update.title}</h3>
//                         <p className="text-muted-foreground">{update.content}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* Sidebar - Donation Card */}
//             <div className="lg:col-span-1">
//               <Card className="p-6 sticky top-24">
//                 <div className="mb-6">
//                   <div className="flex items-baseline gap-2 mb-1">
//                     <span className="text-3xl font-bold text-primary">${campaign.raised.toLocaleString()}</span>
//                     <span className="text-muted-foreground">raised</span>
//                   </div>
//                   <div className="text-sm text-muted-foreground mb-4">of ${campaign.goal.toLocaleString()} goal</div>
//                   <Progress value={percentage} className="h-3 mb-2" />
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="font-semibold">{percentage}% funded</span>
//                     <span className="text-muted-foreground">{campaign.daysLeft} days left</span>
//                   </div>
//                 </div>

//                 <div className="space-y-3 mb-6 pb-6 border-b">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Users className="h-4 w-4" />
//                       <span className="text-sm">Supporters</span>
//                     </div>
//                     <span className="font-semibold">{campaign.supporters}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <TrendingUp className="h-4 w-4" />
//                       <span className="text-sm">Recent donations</span>
//                     </div>
//                     <span className="font-semibold">142</span>
//                   </div>
//                 </div>

//                 <div className="space-y-3 mb-6">
//                   <h3 className="font-semibold">Choose an amount</h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     {[25, 50, 100, 250].map((amount) => (
//                       <Button key={amount} variant="outline" className="w-full bg-transparent">
//                         ${amount}
//                       </Button>
//                     ))}
//                   </div>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
//                     <Input type="number" placeholder="Custom amount" className="pl-7" />
//                   </div>
//                 </div>

//                 <Button className="w-full mb-3 bg-accent hover:bg-accent/90" size="lg">
//                   <Heart className="h-4 w-4 mr-2" />
//                   Donate Now
//                 </Button>

//                 <Button variant="outline" className="w-full mb-6 bg-transparent">
//                   <Share2 className="h-4 w-4 mr-2" />
//                   Share Campaign
//                 </Button>

//                 <div className="text-xs text-muted-foreground text-center">
//                   Your donation is tax-deductible and will be used to support this campaign.
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, Calendar, Heart, Share2, TrendingUp, Facebook, Twitter, Linkedin, Mail, Link2, Check } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function CampaignDetailPage({ campaign }: { campaign: any }) {
  const [copied, setCopied] = useState(false)
  const percentage = Math.round((campaign.raised / campaign.goal) * 100)

  const campaignUrl = typeof window !== "undefined" ? window.location.href : ""
  const campaignTitle = encodeURIComponent(campaign.title)
  const campaignDescription = encodeURIComponent(campaign.description || "")

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(campaignUrl)}&text=${campaignTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(campaignUrl)}`,
    whatsapp: `https://wa.me/?text=${campaignTitle}%20${encodeURIComponent(campaignUrl)}`,
    email: `mailto:?subject=${campaignTitle}&body=Support this campaign: ${encodeURIComponent(campaignUrl)}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(campaignUrl)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

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
                  {campaign.category?.name || "Campaign"}
                </Badge>

                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{campaign.title}</h1>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {campaign.longDescription}
                  </p>
                </div>

                {/* Impact */}
                {campaign.impact && campaign.impact.length > 0 && (
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
                )}

                {/* Updates */}
                {campaign.updates && campaign.updates.length > 0 && (
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
                )}
              </Card>
            </div>

            {/* Sidebar - Donation Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-primary">${campaign.raised?.toLocaleString() || 0}</span>
                    <span className="text-muted-foreground">raised</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">of ${campaign.goal?.toLocaleString() || 0} goal</div>
                  <Progress value={percentage || 0} className="h-3 mb-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{percentage || 0}% funded</span>
                    <span className="text-muted-foreground">{campaign.daysLeft || 0} days left</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Supporters</span>
                    </div>
                    <span className="font-semibold">{campaign.supporters || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Campaign Period</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {campaign.startDate} - {campaign.endDate}
                  </div>
                </div>

                <Button asChild className="w-full mb-3 bg-accent hover:bg-accent/90" size="lg">
                  <Link href="/donate">
                    <Heart className="h-4 w-4 mr-2" />
                    Donate Now
                  </Link>
                </Button>

                {/* Share Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full mb-6 bg-transparent">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Campaign
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56">
                    <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
                      <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                      Share on Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
                      <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                      Share on X (Twitter)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
                      <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                      Share on LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
                      <svg className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Share on WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("email")} className="cursor-pointer">
                      <Mail className="h-4 w-4 mr-2 text-gray-600" />
                      Share via Email
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                      {copied ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Link2 className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Link Copied!" : "Copy Link"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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