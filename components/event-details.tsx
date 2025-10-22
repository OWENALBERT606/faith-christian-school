
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users, Clock, Share2, Heart } from "lucide-react"
import Link from "next/link"


export default function  EventDetailPage({event}:{event:any}) {

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
        </div>

        <div className="container py-6 px-4 md:px-12 lg:px-24 mx-auto -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {event.category.name}
                  </Badge>
                  <Badge className="bg-accent text-accent-foreground text-sm">
                    {event.status === "upcoming" ? "Upcoming" : "Past Event"}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{event.title}</h1>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{event.longDescription}</p>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Event Highlights</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {event.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Schedule */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Event Schedule</h2>
                  <div className="space-y-4">
                    {event.schedule.map((item: any, index: number) => (
                      <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="flex items-center gap-2 text-primary font-semibold min-w-[100px]">
                          <Clock className="h-4 w-4" />
                          {item.time}
                        </div>
                        <div className="text-muted-foreground">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Event Details</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Date & Time</div>
                      <div className="text-sm text-muted-foreground">{event.date}</div>
                      <div className="text-sm text-muted-foreground">{event.time}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-sm text-muted-foreground">{event.location}</div>
                      <div className="text-sm text-muted-foreground">{event.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Expected Attendees</div>
                      <div className="text-sm text-muted-foreground">{event.attendees} people</div>
                    </div>
                  </div>
                </div>

                {event.status === "UPCOMING" && (
                  <>
                    <Button className="w-full mb-3 bg-accent hover:bg-accent/90">Register Now</Button>
                    <Button variant="outline" className="w-full mb-3 bg-transparent">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Event
                    </Button>
                  </>
                )}

                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/events">Back to Events</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
