
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users, Clock, Share2, Heart } from "lucide-react"
import Link from "next/link"
import EventDetailPage from "@/components/event-details"
import { getEventById } from "@/actions/events"


export default async function  Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
      const id = (await params).id;
  const event = await getEventById(id);
  console.log("Event fetched:", event);

  return (
    <div className="min-h-screen flex flex-col">
     <EventDetailPage event={event}/>
    </div>
  )
}
