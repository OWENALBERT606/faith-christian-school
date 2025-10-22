import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Calendar, Users } from "lucide-react"
import ContactPage from "@/components/contact-form"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Let's Build Together</h1>
          <p className="text-xl md:text-2xl mb-8 text-balance opacity-90">
            Your voice matters. Reach out to share ideas, concerns, or join our community initiatives.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      {/* <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Get in Touch</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center hover:bg-muted transition-colors duration-300 border-border">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">Office Location</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  123 Community Center Dr
                  <br />
                  Suite 200
                  <br />
                  Your City, State 12345
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:bg-muted transition-colors duration-300 border-border">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">Phone</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Main: (555) 123-4567
                  <br />
                  Emergency: (555) 987-6543
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:bg-muted transition-colors duration-300 border-border">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">Email</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  contact@example.com
                  <br />
                  press@example.com
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:bg-muted transition-colors duration-300 border-border">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">Office Hours</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Mon-Fri: 9:00 AM - 5:00 PM
                  <br />
                  Sat: 10:00 AM - 2:00 PM
                  <br />
                  Sun: By Appointment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Contact Form & Community Engagement */}
      <section className="py-20 bg-popover">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-1 gap-12">
            {/* Contact Form */}
           <ContactPage/>

            {/* Community Engagement Options */}
            <div className="space-y-8">
              {/* <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" />
                    Schedule a Meeting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Book a one-on-one meeting to discuss community issues, policy concerns, or collaboration
                    opportunities.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Schedule Appointment
                  </Button>
                </CardContent>
              </Card> */}

              {/* <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Join Community Forums
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Participate in our monthly town halls and community forums where we discuss local issues and
                    collaborative solutions.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    View Upcoming Events
                  </Button>
                </CardContent>
              </Card> */}

              <Card className="bg-accent text-accent-foreground border-accent">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Emergency Contact</h3>
                  <p className="text-sm mb-4 opacity-90">
                    For urgent community issues or emergencies that require immediate attention.
                  </p>
                  <Button variant="secondary" className="w-full bg-background text-foreground hover:bg-background/90">
                    Contact Us: kanywanibyaruhanga@gmail.com
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-balance">Your Voice Shapes Our Community</h2>
          <p className="text-xl mb-8 opacity-90 text-balance">
            Every conversation, every idea, and every concern contributes to building a stronger, more connected
            community.
          </p>
          {/* <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Join Our Newsletter
          </Button> */}
        </div>
      </section>
    </div>
  )
}
