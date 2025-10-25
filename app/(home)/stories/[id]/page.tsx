
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Calendar } from "lucide-react"
import Link from "next/link"
import { getStoryById } from "@/actions/stories"
import StoryDetailPage from "@/components/story-detail-page"



export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const story = await getStoryById(id);

  return (
   <div className="">
      <StoryDetailPage story={story}/>
   </div>
  )
}
