"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, CreditCard, Smartphone } from "lucide-react"
import { useState } from "react"

export default function DonatePage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile-money">("card")

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-primary fill-primary" />
            <CardTitle className="text-3xl">Make a Donation</CardTitle>
            <CardDescription>Choose your amount and payment method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Select Amount</Label>
              <div className="grid grid-cols-3 gap-3">
                {[25, 50, 100, 250, 500, 1000].map((amount) => (
                  <Button key={amount} variant="outline" className="h-14 text-lg bg-transparent">
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-amount">Or Enter Custom Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
                <Input id="custom-amount" type="number" placeholder="Enter amount" className="pl-8 h-12 text-lg" />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="space-y-4">
                <Label className="text-base">Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as "card" | "mobile-money")}
                  className="grid grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="card-payment"
                    className={`flex flex-col items-center justify-center gap-2 p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="card" id="card-payment" className="sr-only" />
                    <CreditCard className="h-8 w-8" />
                    <span className="font-medium">Card</span>
                  </Label>
                  <Label
                    htmlFor="mobile-money-payment"
                    className={`flex flex-col items-center justify-center gap-2 p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "mobile-money"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="mobile-money" id="mobile-money-payment" className="sr-only" />
                    <Smartphone className="h-8 w-8" />
                    <span className="font-medium">Mobile Money</span>
                  </Label>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input id="card-name" placeholder="John Doe" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" maxLength={19} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">Expiry Date</Label>
                        <Input id="card-expiry" placeholder="MM/YY" maxLength={5} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV</Label>
                        <Input id="card-cvv" placeholder="123" maxLength={4} type="password" required />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "mobile-money" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <Label>Select Provider</Label>
                      <RadioGroup defaultValue="mtn">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mtn" id="mtn" />
                          <Label htmlFor="mtn" className="font-normal cursor-pointer">
                            MTN Mobile Money
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="airtel" id="airtel" />
                          <Label htmlFor="airtel" className="font-normal cursor-pointer">
                            Airtel Money
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vodafone" id="vodafone" />
                          <Label htmlFor="vodafone" className="font-normal cursor-pointer">
                            Vodafone Cash
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile-number">Your Mobile Number</Label>
                      <Input id="mobile-number" type="tel" placeholder="+256 700 000 000" required />
                    </div>

                    <Card className="bg-muted border-primary/20">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-primary" />
                          Send Money To:
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                            <span className="text-muted-foreground">MTN:</span>
                            <span className="font-semibold">+256 700 123 456</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                            <span className="text-muted-foreground">Airtel:</span>
                            <span className="font-semibold">+256 750 123 456</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                            <span className="text-muted-foreground">Vodafone:</span>
                            <span className="font-semibold">+256 770 123 456</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                          Send your donation to the number above, then enter your mobile number to confirm.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>

            <Button className="w-full h-12 text-lg" size="lg">
              <Heart className="h-5 w-5 mr-2" />
              Complete Donation
            </Button>

            <p className="text-xs text-center text-muted-foreground">Your donation is secure and encrypted</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
