
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users, Clock, Share2, Heart } from "lucide-react"
import Link from "next/link"
import EventDetailPage from "@/components/event-details"
import { getEventById } from "@/actions/events"
import { getCampaignById } from "@/actions/campaigns"
import CampaignDetailPage from "@/components/campaign"


export default async function  Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
      const id = (await params).id;
  const campaign = await getCampaignById(id);


  return (
    <div className="min-h-screen flex flex-col">
     <CampaignDetailPage campaign={campaign}/>
    </div>
  )
}
