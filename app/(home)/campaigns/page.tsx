
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import CampaignListing from "@/components/campaign-listing"
import { getCampaigns } from "@/actions/campaigns"



export default async function Page() {
    const campaigns = (await getCampaigns()) ?? [];

  

  return (
    <div className="min-h-screen flex flex-col">
      <CampaignListing campaigns={campaigns}/>
    </div>
  )
}
