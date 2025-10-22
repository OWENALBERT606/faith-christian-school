
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: 1,
    title: "Community Health Fair",
    date: "March 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Central Park Community Center",
    attendees: 250,
    category: "Health",
    image: "/community-health-fair-volunteers.jpg",
    description: "Free health screenings, wellness workshops, and medical consultations for the community.",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Annual Charity Gala",
    date: "April 22, 2025",
    time: "6:00 PM - 11:00 PM",
    location: "Grand Ballroom Hotel",
    attendees: 500,
    category: "Fundraiser",
    image: "/elegant-charity-gala-event.jpg",
    description: "An evening of inspiration, entertainment, and fundraising to support our mission.",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Youth Education Workshop",
    date: "May 8, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Hope Foundation Center",
    attendees: 100,
    category: "Education",
    image: "/children-learning-workshop.jpg",
    description: "Interactive learning sessions focused on STEM education for underprivileged youth.",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Environmental Cleanup Drive",
    date: "February 28, 2025",
    time: "8:00 AM - 12:00 PM",
    location: "Riverside Park",
    attendees: 180,
    category: "Environment",
    image: "/volunteers-cleaning-park-environment.jpg",
    description: "Join us in making our community cleaner and greener.",
    status: "past",
  },
  {
    id: 5,
    title: "Food Distribution Program",
    date: "March 30, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "Multiple Locations",
    attendees: 300,
    category: "Relief",
    image: "/food-distribution-volunteers-helping.jpg",
    description: "Monthly food distribution to families in need across the city.",
    status: "upcoming",
  },
  {
    id: 6,
    title: "Skills Training Workshop",
    date: "April 10, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Training Center",
    attendees: 75,
    category: "Education",
    image: "/vocational-training-workshop.jpg",
    description: "Vocational training and skill development for employment opportunities.",
    status: "upcoming",
  },
]

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.status === "upcoming")
  const pastEvents = events.filter((e) => e.status === "past")

  return (
    <div className="min-h-screen  flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Join Our Events</h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                Be part of meaningful change. Attend our events and connect with a community dedicated to making a
                difference.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-8 px-4 md:px-12 lg:px-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{event.category}</Badge>
                      <Badge className="bg-accent text-accent-foreground">Upcoming</Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attendees expected</span>
                    </div>
                    <Button asChild className="w-full mt-4">
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="object-cover w-full h-full opacity-80"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{event.category}</Badge>
                      <Badge variant="outline">Past</Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                      <Link href={`/events/${event.id}`}>View Recap</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
