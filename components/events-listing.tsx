

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { getEvents } from "@/actions/events";

export default async function EventsListing({events}:{events:any}) {


  const upcomingEvents = events.filter((e:any) => e.status === "UPCOMING");
  const pastEvents = events.filter(
    (e:any) => e.status === "COMPLETED" || e.status === "CANCELLED"
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Join Our Events
              </h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                Be part of meaningful change. Attend our events and connect with a
                community dedicated to making a difference.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-8 px-4 md:px-12 lg:px-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>

            {upcomingEvents.length === 0 ? (
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>No active events</CardTitle>
                  <CardDescription>
                    There are no upcoming events right now. Please check back soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <Link href="/events">Refresh</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event:any) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="secondary">{event.category?.name ?? "—"}</Badge>
                        <Badge className="bg-accent text-accent-foreground">Upcoming</Badge>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
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
                      <Button asChild className="mt-4 w-full">
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Past Events */}
        <section className="bg-muted py-16 px-4 md:px-12 lg:px-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>

            {pastEvents.length === 0 ? (
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>No past events</CardTitle>
                  <CardDescription>
                    Once events are completed, you’ll see their recaps here.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event:any) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover opacity-80"
                      />
                    </div>
                    <CardHeader>
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="secondary">{event.category?.name ?? "—"}</Badge>
                        <Badge variant="outline">Past</Badge>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
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
                      <Button asChild variant="outline" className="mt-4 w-full bg-transparent">
                        <Link href={`/events/${event.id}`}>View Recap</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
