

// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Calendar, MapPin, Users, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Mail, Link2, Check, Loader2 } from "lucide-react"
// import Link from "next/link"
// import toast from "react-hot-toast"

// interface EventRegistrationData {
//   fullName: string
//   email: string
//   phone: string
//   numberOfGuests: number
//   specialRequirements: string
// }

// export default function EventDetailPage({ event }: { event: any }) {
//   const [isRegistering, setIsRegistering] = useState(false)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [copied, setCopied] = useState(false)
//   const [formData, setFormData] = useState<EventRegistrationData>({
//     fullName: "",
//     email: "",
//     phone: "",
//     numberOfGuests: 1,
//     specialRequirements: "",
//   })

//   const eventUrl = typeof window !== "undefined" ? window.location.href : ""
//   const eventTitle = encodeURIComponent(event.title)
//   const eventDescription = encodeURIComponent(event.description || "")

//   const shareLinks = {
//     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
//     twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${eventTitle}`,
//     linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
//     whatsapp: `https://wa.me/?text=${eventTitle}%20${encodeURIComponent(eventUrl)}`,
//     email: `mailto:?subject=${eventTitle}&body=Check out this event: ${encodeURIComponent(eventUrl)}`,
//   }

//   const handleShare = (platform: keyof typeof shareLinks) => {
//     window.open(shareLinks[platform], "_blank", "width=600,height=400")
//   }

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(eventUrl)
//       setCopied(true)
//       toast.success("Link copied to clipboard!")
//       setTimeout(() => setCopied(false), 2000)
//     } catch (err) {
//       toast.error("Failed to copy link")
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "numberOfGuests" ? parseInt(value) || 1 : value,
//     }))
//   }

//   const handleRegistration = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsRegistering(true)

//     try {
//       const response = await fetch("/api/event-registrations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           eventId: event.id,
//           ...formData,
//         }),
//       })

//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message || "Registration failed")
//       }

//       toast.success("Successfully registered for the event!")
//       setIsDialogOpen(false)
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         numberOfGuests: 1,
//         specialRequirements: "",
//       })
//     } catch (error: any) {
//       toast.error(error.message || "Failed to register. Please try again.")
//     } finally {
//       setIsRegistering(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1">
//         {/* Hero Image */}
//         <div className="relative h-[400px] md:h-[500px] overflow-hidden">
//           <img src={event.image || "/placeholder.svg"} alt={event.title} className="object-cover w-full h-full" />
//           <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
//         </div>

//         <div className="container py-6 px-4 md:px-12 lg:px-24 mx-auto -mt-20 relative z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2">
//               <Card className="p-6 md:p-8">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Badge variant="secondary" className="text-sm">
//                     {event.category.name}
//                   </Badge>
//                   <Badge className="bg-accent text-accent-foreground text-sm">
//                     {event.status === "UPCOMING" ? "Upcoming" : event.status === "ONGOING" ? "Ongoing" : "Past Event"}
//                   </Badge>
//                 </div>

//                 <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{event.title}</h1>

//                 <div className="prose prose-lg max-w-none mb-8">
//                   <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{event.longDescription}</p>
//                 </div>

//                 {/* Highlights */}
//                 {event.highlights && event.highlights.length > 0 && (
//                   <div className="mb-8">
//                     <h2 className="text-2xl font-bold mb-4">Event Highlights</h2>
//                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       {event.highlights.map((highlight: string, index: number) => (
//                         <li key={index} className="flex items-start gap-2">
//                           <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
//                           <span className="text-muted-foreground">{highlight}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Schedule */}
//                 {event.schedule && event.schedule.length > 0 && (
//                   <div>
//                     <h2 className="text-2xl font-bold mb-4">Event Schedule</h2>
//                     <div className="space-y-4">
//                       {event.schedule.map((item: any, index: number) => (
//                         <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
//                           <div className="flex items-center gap-2 text-primary font-semibold min-w-[100px]">
//                             <Clock className="h-4 w-4" />
//                             {item.time}
//                           </div>
//                           <div className="text-muted-foreground">{item.activity}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </Card>
//             </div>

//             {/* Sidebar */}
//             <div className="lg:col-span-1">
//               <Card className="p-6 sticky top-24">
//                 <h3 className="text-xl font-bold mb-6">Event Details</h3>

//                 <div className="space-y-4 mb-6">
//                   <div className="flex items-start gap-3">
//                     <Calendar className="h-5 w-5 text-primary mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Date & Time</div>
//                       <div className="text-sm text-muted-foreground">{event.date}</div>
//                       <div className="text-sm text-muted-foreground">{event.time}</div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <MapPin className="h-5 w-5 text-primary mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Location</div>
//                       <div className="text-sm text-muted-foreground">{event.location}</div>
//                       <div className="text-sm text-muted-foreground">{event.address}</div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <Users className="h-5 w-5 text-primary mt-0.5" />
//                     <div>
//                       <div className="font-semibold">Expected Attendees</div>
//                       <div className="text-sm text-muted-foreground">{event.attendees} people</div>
//                     </div>
//                   </div>
//                 </div>

//                 {(event.status === "UPCOMING" || event.status === "ONGOING") && (
//                   <>
//                     {/* Registration Dialog */}
//                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button className="w-full mb-3 bg-accent hover:bg-accent/90">Register Now</Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>Register for Event</DialogTitle>
//                           <DialogDescription>
//                             Fill in your details to register for "{event.title}"
//                           </DialogDescription>
//                         </DialogHeader>
//                         <form onSubmit={handleRegistration} className="space-y-4 mt-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="fullName">Full Name *</Label>
//                             <Input
//                               id="fullName"
//                               name="fullName"
//                               placeholder="John Doe"
//                               value={formData.fullName}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="email">Email *</Label>
//                             <Input
//                               id="email"
//                               name="email"
//                               type="email"
//                               placeholder="john@example.com"
//                               value={formData.email}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="phone">Phone Number *</Label>
//                             <Input
//                               id="phone"
//                               name="phone"
//                               type="tel"
//                               placeholder="+256 700 000 000"
//                               value={formData.phone}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="numberOfGuests">Number of Guests</Label>
//                             <Input
//                               id="numberOfGuests"
//                               name="numberOfGuests"
//                               type="number"
//                               min="1"
//                               max="10"
//                               value={formData.numberOfGuests}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="specialRequirements">Special Requirements</Label>
//                             <Textarea
//                               id="specialRequirements"
//                               name="specialRequirements"
//                               placeholder="Any dietary restrictions, accessibility needs, etc."
//                               value={formData.specialRequirements}
//                               onChange={handleInputChange}
//                               rows={3}
//                             />
//                           </div>
//                           <Button type="submit" className="w-full" disabled={isRegistering}>
//                             {isRegistering ? (
//                               <>
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Registering...
//                               </>
//                             ) : (
//                               "Complete Registration"
//                             )}
//                           </Button>
//                         </form>
//                       </DialogContent>
//                     </Dialog>

//                     {/* Share Dropdown */}
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="outline" className="w-full mb-3 bg-transparent">
//                           <Share2 className="h-4 w-4 mr-2" />
//                           Share Event
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="center" className="w-56">
//                         <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
//                           <Facebook className="h-4 w-4 mr-2 text-blue-600" />
//                           Share on Facebook
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
//                           <Twitter className="h-4 w-4 mr-2 text-sky-500" />
//                           Share on X (Twitter)
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
//                           <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
//                           Share on LinkedIn
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
//                           <svg className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                           </svg>
//                           Share on WhatsApp
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleShare("email")} className="cursor-pointer">
//                           <Mail className="h-4 w-4 mr-2 text-gray-600" />
//                           Share via Email
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
//                           {copied ? (
//                             <Check className="h-4 w-4 mr-2 text-green-500" />
//                           ) : (
//                             <Link2 className="h-4 w-4 mr-2" />
//                           )}
//                           {copied ? "Link Copied!" : "Copy Link"}
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </>
//                 )}

//                 <Button asChild variant="outline" className="w-full bg-transparent">
//                   <Link href="/events">Back to Events</Link>
//                 </Button>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }





"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Users, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Mail, Link2, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { createEventRegistration } from "@/actions/eventregistration"

interface EventRegistrationData {
  fullName: string
  email: string
  phone: string
  numberOfGuests: number
  specialRequirements: string
}

export default function EventDetailPage({ event }: { event: any }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState<EventRegistrationData>({
    fullName: "",
    email: "",
    phone: "",
    numberOfGuests: 1,
    specialRequirements: "",
  })

  const eventUrl = typeof window !== "undefined" ? window.location.href : ""
  const eventTitle = encodeURIComponent(event.title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${eventTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
    whatsapp: `https://wa.me/?text=${eventTitle}%20${encodeURIComponent(eventUrl)}`,
    email: `mailto:?subject=${eventTitle}&body=Check out this event: ${encodeURIComponent(eventUrl)}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfGuests" ? parseInt(value) || 1 : value,
    }))
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)

    try {
      const result = await createEventRegistration({
        eventId: event.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        numberOfGuests: formData.numberOfGuests,
        specialRequirements: formData.specialRequirements || undefined,
      })

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success("Successfully registered for the event!")
      setIsDialogOpen(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        numberOfGuests: 1,
        specialRequirements: "",
      })
    } catch (error: any) {
      toast.error(error.message || "Failed to register. Please try again.")
    } finally {
      setIsRegistering(false)
    }
  }

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
                    {event.status === "UPCOMING" ? "Upcoming" : event.status === "ONGOING" ? "Ongoing" : "Past Event"}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{event.title}</h1>

                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{event.longDescription}</p>
                </div>

                {/* Highlights */}
                {event.highlights && event.highlights.length > 0 && (
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
                )}

                {/* Schedule */}
                {event.schedule && event.schedule.length > 0 && (
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
                )}
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

                {(event.status === "UPCOMING" || event.status === "ONGOING") && (
                  <>
                    {/* Registration Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full mb-3 bg-accent hover:bg-accent/90">Register Now</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Register for Event</DialogTitle>
                          <DialogDescription>
                            Fill in your details to register for &quot;{event.title}&quot;
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleRegistration} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              placeholder="John Doe"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="+256 700 000 000"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="numberOfGuests">Number of Guests</Label>
                            <Input
                              id="numberOfGuests"
                              name="numberOfGuests"
                              type="number"
                              min="1"
                              max="10"
                              value={formData.numberOfGuests}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="specialRequirements">Special Requirements</Label>
                            <Textarea
                              id="specialRequirements"
                              name="specialRequirements"
                              placeholder="Any dietary restrictions, accessibility needs, etc."
                              value={formData.specialRequirements}
                              onChange={handleInputChange}
                              rows={3}
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={isRegistering}>
                            {isRegistering ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Registering...
                              </>
                            ) : (
                              "Complete Registration"
                            )}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>

                    {/* Share Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full mb-3 bg-transparent">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share Event
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-56">
                        <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
                          <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                          Share on Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
                          <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                          Share on X (Twitter)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
                          <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                          Share on LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
                          <svg className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Share on WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare("email")} className="cursor-pointer">
                          <Mail className="h-4 w-4 mr-2 text-gray-600" />
                          Share via Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                          {copied ? (
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                          ) : (
                            <Link2 className="h-4 w-4 mr-2" />
                          )}
                          {copied ? "Link Copied!" : "Copy Link"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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