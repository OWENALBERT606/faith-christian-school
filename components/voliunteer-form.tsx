"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface VolunteerFormProps {
  open: boolean
  onClose: () => void
}

export function VolunteerForm({ open, onClose }: VolunteerFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    availability: "",
    interests: [] as string[],
  })

  const interestOptions = [
    "Education & Tutoring",
    "Healthcare Support",
    "Fundraising",
    "Event Planning",
    "Marketing & Communications",
    "Administrative Support",
  ]

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, interests: [...formData.interests, interest] })
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Volunteer form submitted:", formData)
    alert("Thank you for your interest in volunteering! We will contact you soon with opportunities.")
    onClose()
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      skills: "",
      availability: "",
      interests: [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{"Volunteer With Us"}</DialogTitle>
          <DialogDescription>
            {"Become part of us, let us Make a difference in the lives of others. Make a positive change in the lives of others who need most. you are welcome to work with us. fill in the form below to get started. we shall get in touch with you soon."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="volunteerName">{"Full Name"}</Label>
            <Input
              id="volunteerName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="volunteerEmail">{"Email Address"}</Label>
            <Input
              id="volunteerEmail"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="volunteerPhone">{"Phone Number"}</Label>
            <Input
              id="volunteerPhone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{"Your Location"}</Label>
            <Input
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State/Country"
            />
          </div>

          <div className="space-y-2">
            <Label>{"Areas of Interest"}</Label>
            <div className="space-y-3">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center gap-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <Label htmlFor={interest} className="cursor-pointer font-normal">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">{"Relevant Skills & Experience"}</Label>
            <Textarea
              id="skills"
              required
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="Tell us about your skills, experience, and what you can bring to our team..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">{"Availability"}</Label>
            <Textarea
              id="availability"
              required
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              placeholder="When are you available to volunteer? (e.g., weekends, evenings, specific days)"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              {"Cancel"}
            </Button>
            <Button type="submit" className="flex-1">
              {"Submit Volunteer Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
