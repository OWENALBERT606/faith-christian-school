"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar } from "lucide-react"
import Image from "next/image"

interface Child {
  id: number
  name: string
  age: number
  location: string
  image: string
  background: string
}

interface ChildCardProps {
  child: Child
  onSponsor: () => void
}

export function ChildCard({ child, onSponsor }: ChildCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 w-full">
        <Image src={child.image || "/placeholder.svg"} alt={child.name} fill className="object-cover" />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold mb-2">{child.name}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{child.age} years old</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{child.location}</span>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{child.background}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onSponsor} className="w-full" size="lg">
          {"Sponsor "}
          {child.name}
        </Button>
      </CardFooter>
    </Card>
  )
}
