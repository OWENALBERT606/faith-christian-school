"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PartnerFormProps {
  open: boolean
  onClose: () => void
}

export function PartnerForm({ open, onClose }: PartnerFormProps) {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Partnership form submitted:", formData)
    alert("Thank you for your interest in partnering with us! Our team will contact you soon.")
    onClose()
    setFormData({
      organizationName: "",
      contactName: "",
      email: "",
      phone: "",
      partnershipType: "",
      message: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{"Partner With Us"}</DialogTitle>
          <DialogDescription>
            {
              "We are seeking partnerships with like minded Churches, Individuals and organisations to amplify our impact and serve our community together , to better meet the needs of our community. Interested in partnering with us? we are looking for collaborators to help us launch a new program of building a school , build a well, support a local school ministry and more. Fill out the form below to get started."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="organizationName">{"Organization Name"}</Label>
            <Input
              id="organizationName"
              required
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              placeholder="Your Organization"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactName">{"Contact Person Name"}</Label>
            <Input
              id="contactName"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="Jane Smith"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnerEmail">{"Email Address"}</Label>
            <Input
              id="partnerEmail"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jane@organization.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnerPhone">{"Phone Number"}</Label>
            <Input
              id="partnerPhone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnershipType">{"Partnership Type"}</Label>
            <Select
              value={formData.partnershipType}
              onValueChange={(value) => setFormData({ ...formData, partnershipType: value })}
            >
              <SelectTrigger id="partnershipType">
                <SelectValue placeholder="Select partnership type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporate">{"Corporate Sponsorship"}</SelectItem>
                <SelectItem value="foundation">{"Foundation Grant"}</SelectItem>
                <SelectItem value="community">{"Community Organization"}</SelectItem>
                <SelectItem value="educational">{"Educational Institution"}</SelectItem>
                <SelectItem value="other">{"Other"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnerMessage">{"Tell Us About Your Interest"}</Label>
            <Textarea
              id="partnerMessage"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please describe how you'd like to partner with us and what you hope to achieve..."
              rows={5}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              {"Cancel"}
            </Button>
            <Button type="submit" className="flex-1">
              {"Submit Partnership Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
