
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Get in Touch</h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                Have questions or want to get involved? We'd love to hear from you. Reach out and let's make a
                difference together.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 md:px-12 lg:px-24 flex">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input id="subject" placeholder="How can we help you?" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          className="min-h-[150px]"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Email</div>
                        <a
                          href="mailto:faithchristianschool2@gmail.com"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          faithchristianschool12@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Phone</div>
                        <a href="tel:+15551234567" className="text-sm text-muted-foreground hover:text-primary">
                          +256 757549225
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Address</div>
                        <p className="text-sm text-muted-foreground">
                          Mubende Central Region
                          <br />
                          Mubende
                          <br />
                          Uganda
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Office Hours</div>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday
                          <br />
                          9:00 AM - 5:00 PM EST
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle>Other Ways to Help</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <a href="/donate">Make a Donation</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <a href="/events">Attend an Event</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <a href="#">Volunteer With Us</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted px-4 md:px-12 lg:px-24">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                   <div className="text-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510676.1780752579!2d31.00934543462553!3d0.514212066659968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17633094bdc6c1f5%3A0xead4b9b39df2efcc!2sMubende!5e0!3m2!1sen!2sug!4v1761107891861!5m2!1sen!2sug" width="1100" height="800" loading="lazy" className=""></iframe>
              </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
