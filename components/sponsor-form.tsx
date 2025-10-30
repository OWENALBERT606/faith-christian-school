// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"

// interface Child {
//   id: number
//   name: string
//   age: number
//   location: string
// }

// interface SponsorFormProps {
//   child: Child | null
//   open: boolean
//   onClose: () => void
// }

// export function SponsorForm({ child, open, onClose }: SponsorFormProps) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     monthlyAmount: "50",
//     agreeToTerms: false,
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("Sponsorship form submitted:", { ...formData, childId: child?.id })
//     alert(`Thank you for sponsoring ${child?.name}! We'll be in touch soon.`)
//     onClose()
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       address: "",
//       monthlyAmount: "50",
//       agreeToTerms: false,
//     })
//   }

//   if (!child) return null

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-2xl">
//             {"Sponsor "}
//             {child.name}
//           </DialogTitle>
//           <DialogDescription>
//             {"Complete this form to begin your sponsorship journey with "}
//             {child.name}
//             {", a "}
//             {child.age}
//             {" year old from "}
//             {child.location}
//             {"."}
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//           <div className="space-y-2">
//             <Label htmlFor="fullName">{"Full Name"}</Label>
//             <Input
//               id="fullName"
//               required
//               value={formData.fullName}
//               onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//               placeholder="John Doe"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">{"Email Address"}</Label>
//             <Input
//               id="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               placeholder="john@example.com"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone">{"Phone Number"}</Label>
//             <Input
//               id="phone"
//               type="tel"
//               required
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               placeholder="+1 (555) 000-0000"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="address">{"Mailing Address"}</Label>
//             <Input
//               id="address"
//               required
//               value={formData.address}
//               onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//               placeholder="123 Main St, City, State, ZIP"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="monthlyAmount">{"Monthly Contribution (USD)"}</Label>
//             <Input
//               id="monthlyAmount"
//               type="number"
//               min="25"
//               required
//               value={formData.monthlyAmount}
//               onChange={(e) => setFormData({ ...formData, monthlyAmount: e.target.value })}
//             />
//             <p className="text-sm text-muted-foreground">{"Minimum $25/month. Suggested: $50/month"}</p>
//           </div>

//           <div className="flex items-start gap-2">
//             <Checkbox
//               id="terms"
//               checked={formData.agreeToTerms}
//               onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
//             />
//             <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
//               {
//                 "I acknowledge that I am committing to sponsor this child and understand that my monthly contribution will support their education, healthcare, and well-being. I agree to the terms and conditions of the sponsorship program."
//               }
//             </Label>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
//               {"Cancel"}
//             </Button>
//             <Button type="submit" disabled={!formData.agreeToTerms} className="flex-1">
//               {"Complete Sponsorship"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }


// components/sponsor-form.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

interface Child {
  id: string | number; // accept either (we'll stringify)
  name: string;
  age: number;
  location: string;
}

interface SponsorFormProps {
  child: Child | null;
  open: boolean;
  onClose: () => void;
}

export function SponsorForm({ child, open, onClose }: SponsorFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    monthlyAmount: "50",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);

  if (!child) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.agreeToTerms) return;

    try {
      setLoading(true);
      const res = await fetch("/api/sponsorships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          address: formData.address.trim() || undefined,
          monthlyAmount: Number(formData.monthlyAmount) || 50,
          childId: String(child?.id),
        }),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Failed to create sponsorship");
      }

      toast.success(`Thank you for sponsoring ${child?.name}!`);
      onClose();
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        monthlyAmount: "50",
        agreeToTerms: false,
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Sponsor {child.name}
          </DialogTitle>
          <DialogDescription>
            Complete this form to begin your sponsorship journey with {child.name}, a {child.age} year old from {child.location}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Mailing Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyAmount">Monthly Contribution (USD)</Label>
            <Input
              id="monthlyAmount"
              type="number"
              min="25"
              required
              value={formData.monthlyAmount}
              onChange={(e) => setFormData({ ...formData, monthlyAmount: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">Minimum $25/month. Suggested: $50/month</p>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(c) => setFormData({ ...formData, agreeToTerms: Boolean(c) })}
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              I acknowledge that I am committing to sponsor this child and understand that my monthly contribution will support their education, healthcare, and well-being. I agree to the terms and conditions of the sponsorship program.
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.agreeToTerms || loading} className="flex-1">
              {loading ? "Processing..." : "Complete Sponsorship"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
