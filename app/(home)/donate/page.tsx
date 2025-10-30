// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Heart, CreditCard, Smartphone } from "lucide-react"
// import { useState } from "react"

// export default function DonatePage() {
//   const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile-money">("card")

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
//       <div className="w-full max-w-2xl">
//         <Card>
//           <CardHeader className="text-center">
//             <Heart className="h-12 w-12 mx-auto mb-4 text-primary fill-primary" />
//             <CardTitle className="text-3xl">Make a Donation</CardTitle>
//             <CardDescription>Choose your amount and payment method</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-3">
//               <Label>Select Amount</Label>
//               <div className="grid grid-cols-3 gap-3">
//                 {[25, 50, 100, 250, 500, 1000].map((amount) => (
//                   <Button key={amount} variant="outline" className="h-14 text-lg bg-transparent">
//                     ${amount}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="custom-amount">Or Enter Custom Amount</Label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
//                 <Input id="custom-amount" type="number" placeholder="Enter amount" className="pl-8 h-12 text-lg" />
//               </div>
//             </div>

//             <div className="pt-4 border-t">
//               <div className="space-y-4">
//                 <Label className="text-base">Payment Method</Label>
//                 <RadioGroup
//                   value={paymentMethod}
//                   onValueChange={(value) => setPaymentMethod(value as "card" | "mobile-money")}
//                   className="grid grid-cols-2 gap-4"
//                 >
//                   <Label
//                     htmlFor="card-payment"
//                     className={`flex flex-col items-center justify-center gap-2 p-6 border-2 rounded-lg cursor-pointer transition-colors ${
//                       paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
//                     }`}
//                   >
//                     <RadioGroupItem value="card" id="card-payment" className="sr-only" />
//                     <CreditCard className="h-8 w-8" />
//                     <span className="font-medium">Card</span>
//                   </Label>
//                   <Label
//                     htmlFor="mobile-money-payment"
//                     className={`flex flex-col items-center justify-center gap-2 p-6 border-2 rounded-lg cursor-pointer transition-colors ${
//                       paymentMethod === "mobile-money"
//                         ? "border-primary bg-primary/5"
//                         : "border-border hover:border-primary/50"
//                     }`}
//                   >
//                     <RadioGroupItem value="mobile-money" id="mobile-money-payment" className="sr-only" />
//                     <Smartphone className="h-8 w-8" />
//                     <span className="font-medium">Mobile Money</span>
//                   </Label>
//                 </RadioGroup>

//                 {paymentMethod === "card" && (
//                   <div className="space-y-4 pt-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="card-name">Cardholder Name</Label>
//                       <Input id="card-name" placeholder="John Doe" required />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="card-number">Card Number</Label>
//                       <Input id="card-number" placeholder="1234 5678 9012 3456" maxLength={19} required />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="card-expiry">Expiry Date</Label>
//                         <Input id="card-expiry" placeholder="MM/YY" maxLength={5} required />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="card-cvv">CVV</Label>
//                         <Input id="card-cvv" placeholder="123" maxLength={4} type="password" required />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {paymentMethod === "mobile-money" && (
//                   <div className="space-y-4 pt-4">
//                     <div className="space-y-3">
//                       <Label>Select Provider</Label>
//                       <RadioGroup defaultValue="mtn">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="mtn" id="mtn" />
//                           <Label htmlFor="mtn" className="font-normal cursor-pointer">
//                             MTN Mobile Money
//                           </Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="airtel" id="airtel" />
//                           <Label htmlFor="airtel" className="font-normal cursor-pointer">
//                             Airtel Money
//                           </Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="vodafone" id="vodafone" />
//                           <Label htmlFor="vodafone" className="font-normal cursor-pointer">
//                             Vodafone Cash
//                           </Label>
//                         </div>
//                       </RadioGroup>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="mobile-number">Your Mobile Number</Label>
//                       <Input id="mobile-number" type="tel" placeholder="+256 700 000 000" required />
//                     </div>

//                     <Card className="bg-muted border-primary/20">
//                       <CardContent className="pt-6">
//                         <h4 className="font-semibold mb-3 flex items-center gap-2">
//                           <Smartphone className="h-5 w-5 text-primary" />
//                           Send Money To:
//                         </h4>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between items-center p-3 bg-background rounded-lg">
//                             <span className="text-muted-foreground">MTN:</span>
//                             <span className="font-semibold">+256 700 123 456</span>
//                           </div>
//                           <div className="flex justify-between items-center p-3 bg-background rounded-lg">
//                             <span className="text-muted-foreground">Airtel:</span>
//                             <span className="font-semibold">+256 750 123 456</span>
//                           </div>
//                           <div className="flex justify-between items-center p-3 bg-background rounded-lg">
//                             <span className="text-muted-foreground">Vodafone:</span>
//                             <span className="font-semibold">+256 770 123 456</span>
//                           </div>
//                         </div>
//                         <p className="text-xs text-muted-foreground mt-4">
//                           Send your donation to the number above, then enter your mobile number to confirm.
//                         </p>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <Button className="w-full h-12 text-lg" size="lg">
//               <Heart className="h-5 w-5 mr-2" />
//               Complete Donation
//             </Button>

//             <p className="text-xs text-center text-muted-foreground">Your donation is secure and encrypted</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, CreditCard, Smartphone, Building2, Mail, MessageCircle, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function DonatePage() {
  const [paymentMethod, setPaymentMethod] = useState<"mobile-money" | "bank" | "visa">("mobile-money")

  return (
    <div className="min-h-screen p-4 bg-muted/30">
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="mb-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-primary fill-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{"Support Our Mission"}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto text-pretty mb-4">
            {
              "We invite you to join our mission of building a school. Your generosity can make a significant difference in empowering communities, providing essential resources, and restoring hope. Every donation, big or small, contributes to positive change. Together, we can create a brighter future."
            }
          </p>
          <p className="text-base text-foreground font-medium">{"Thank you for considering supporting our cause."}</p>
        </div>

        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              {"What You Receive as a Donor"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {"Once you have given to the organization, you are entitled to receive the following from us:"}
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{"A donation receipt for your records"}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{"Full accountability on how your donation was used"}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{"Thank you letters from the organization"}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{"Photos and videos from the beneficiaries of your giving"}</span>
              </li>
            </ul>
            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-2">{"What We Need From You:"}</p>
              <p className="text-sm text-muted-foreground">
                {
                  "All that is required is information on how you can be reached, preferably through email or WhatsApp, so we can keep you updated on the impact of your donation."
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{"Make a Donation"}</CardTitle>
            <CardDescription>{"Choose your amount and payment method"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* <div className="space-y-3">
              <Label>{"Select Amount (USD)"}</Label>
              <div className="grid grid-cols-3 gap-3">
                {[25, 50, 100, 250, 500, 1000].map((amount) => (
                  <Button key={amount} variant="outline" className="h-14 text-lg bg-transparent">
                    {"$"}
                    {amount}
                  </Button>
                ))}
              </div>
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="custom-amount">{"Enter Custom Amount"}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">{"$"}</span>
                <Input id="custom-amount" type="number" placeholder="Enter amount" className="pl-8 h-12 text-lg" />
              </div>
            </div>

            <div className="pt-4 border-t space-y-4">
              <div>
                <Label className="text-base font-semibold">{"Your Contact Information"}</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {"We'll use this to send you receipts and updates"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="donor-name">{"Full Name"}</Label>
                <Input id="donor-name" placeholder="John Doe" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="donor-email">
                  <Mail className="inline h-4 w-4 mr-1" />
                  {"Email Address"}
                </Label>
                <Input id="donor-email" type="email" placeholder="john@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="donor-whatsapp">
                  <MessageCircle className="inline h-4 w-4 mr-1" />
                  {"WhatsApp Number (Optional)"}
                </Label>
                <Input id="donor-whatsapp" type="tel" placeholder="+256 700 000 000" />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="space-y-4">
                <Label className="text-base">{"Payment Method"}</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as "mobile-money" | "bank" | "visa")}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
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
                    <span className="font-medium">{"Mobile Money"}</span>
                  </Label>
                  <Label
                    htmlFor="bank-payment"
                    className={`flex flex-col items-center justify-center gap-2 p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "bank" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="bank" id="bank-payment" className="sr-only" />
                    <Building2 className="h-8 w-8" />
                    <span className="font-medium">{"Bank Transfer"}</span>
                  </Label>
                  <Label
                    htmlFor="visa-payment"
                    className={`flex flex-col items-center justify-center gap-2 p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "visa" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="visa" id="visa-payment" className="sr-only" />
                    <CreditCard className="h-8 w-8" />
                    <span className="font-medium">{"VISA Card"}</span>
                  </Label>
                </RadioGroup>

                {paymentMethod === "mobile-money" && (
                  <Card className="bg-muted border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-primary" />
                        {"Send Money To:"}
                      </h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-background rounded-lg border">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold">{"MTN Mobile Money"}</span>
                          </div>
                          <div className="text-lg font-bold text-primary">{"0787247484"}</div>
                          <div className="text-sm text-muted-foreground mt-1">{"Name: Kwirijira Joel"}</div>
                        </div>
                        <div className="p-4 bg-background rounded-lg border">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold">{"Airtel Money"}</span>
                          </div>
                          <div className="text-lg font-bold text-primary">{"0703888214"}</div>
                          <div className="text-sm text-muted-foreground mt-1">{"Name: Kwirijira Joel"}</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                        {
                          "Send your donation to one of the numbers above, then fill in your contact information and click Complete Donation to notify us."
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === "bank" && (
                  <Card className="bg-muted border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        {"Bank Transfer Details:"}
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="p-4 bg-background rounded-lg border space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{"Bank Name:"}</span>
                            <span className="font-semibold">{"Equity Bank"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{"Account Name:"}</span>
                            <span className="font-semibold">{"Kwirijira Joel"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{"Account Number:"}</span>
                            <span className="font-semibold text-primary text-base">{"1001103233126"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{"Account Phone:"}</span>
                            <span className="font-semibold">{"0757549225"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{"Branch:"}</span>
                            <span className="font-semibold">{"Mubende"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{"Country:"}</span>
                            <span className="font-semibold">{"Uganda"}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                        {
                          "Transfer your donation to the account above, then fill in your contact information and click Complete Donation to notify us of your transfer."
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === "visa" && (
                  <Card className="bg-muted border-primary/20">
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h4 className="font-semibold mb-2">{"VISA Card Payment"}</h4>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          {
                            "VISA card payment integration is coming soon. Please use Mobile Money or Bank Transfer for now."
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <Button className="w-full h-12 text-lg" size="lg">
              <Heart className="h-5 w-5 mr-2" />
              {"Complete Donation"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              {"Your donation information is secure and will be used only for processing your contribution"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
