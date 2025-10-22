
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Shield, TrendingUp, Users } from "lucide-react"

export default function DonatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="h-16 w-16 mx-auto mb-6 fill-primary-foreground" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Make a Difference Today</h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                Your generosity transforms lives. Every donation brings hope, opportunity, and lasting change to
                communities in need.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">50,000+</div>
                  <div className="text-sm text-muted-foreground">Lives Impacted</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">95%</div>
                  <div className="text-sm text-muted-foreground">Goes to Programs</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Tax Deductible</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Your Donation</CardTitle>
                      <CardDescription>Choose your donation amount and frequency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Donation Type */}
                      <div className="space-y-3">
                        <Label>Donation Frequency</Label>
                        <RadioGroup defaultValue="one-time">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="one-time" id="one-time" />
                            <Label htmlFor="one-time" className="font-normal cursor-pointer">
                              One-time donation
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="monthly" id="monthly" />
                            <Label htmlFor="monthly" className="font-normal cursor-pointer">
                              Monthly donation (Become a sustainer)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Amount Selection */}
                      <div className="space-y-3">
                        <Label>Select Amount</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[25, 50, 100, 250, 500, 1000].map((amount) => (
                            <Button key={amount} variant="outline" className="h-16 text-lg bg-transparent">
                              ${amount}
                            </Button>
                          ))}
                          <Button variant="outline" className="h-16 text-lg col-span-2 bg-transparent">
                            Custom
                          </Button>
                        </div>
                      </div>

                      {/* Custom Amount */}
                      <div className="space-y-2">
                        <Label htmlFor="custom-amount">Custom Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                            $
                          </span>
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="Enter amount"
                            className="pl-8 h-12 text-lg"
                          />
                        </div>
                      </div>

                      {/* Designation */}
                      <div className="space-y-3">
                        <Label>Where should your donation go?</Label>
                        <RadioGroup defaultValue="greatest-need">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="greatest-need" id="greatest-need" />
                            <Label htmlFor="greatest-need" className="font-normal cursor-pointer">
                              Where it's needed most
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="education" id="education" />
                            <Label htmlFor="education" className="font-normal cursor-pointer">
                              Education Programs
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="healthcare" id="healthcare" />
                            <Label htmlFor="healthcare" className="font-normal cursor-pointer">
                              Healthcare Initiatives
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="water" id="water" />
                            <Label htmlFor="water" className="font-normal cursor-pointer">
                              Clean Water Projects
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Donor Information */}
                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="donor-first-name">First Name *</Label>
                              <Input id="donor-first-name" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="donor-last-name">Last Name *</Label>
                              <Input id="donor-last-name" required />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="donor-email">Email *</Label>
                            <Input id="donor-email" type="email" required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="donor-phone">Phone Number</Label>
                            <Input id="donor-phone" type="tel" />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="anonymous" />
                            <Label htmlFor="anonymous" className="font-normal cursor-pointer">
                              Make this donation anonymous
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="newsletter" defaultChecked />
                            <Label htmlFor="newsletter" className="font-normal cursor-pointer">
                              Send me updates about the impact of my donation
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-accent hover:bg-accent/90" size="lg">
                        <Heart className="h-5 w-5 mr-2" />
                        Complete Donation
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Your donation is secure and tax-deductible. You will receive a receipt via email.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-muted">
                    <CardHeader>
                      <CardTitle className="text-lg">Your Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 font-bold">
                          $25
                        </div>
                        <p className="text-muted-foreground">Provides school supplies for 5 children</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 font-bold">
                          $50
                        </div>
                        <p className="text-muted-foreground">Supplies clean water for a family for 6 months</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 font-bold">
                          $100
                        </div>
                        <p className="text-muted-foreground">Funds a health screening for 20 people</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 font-bold">
                          $250
                        </div>
                        <p className="text-muted-foreground">Supports vocational training for 2 adults</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Other Ways to Give</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Corporate Matching
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Planned Giving
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Stock Donations
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Donor-Advised Fund
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6">
                      <Shield className="h-10 w-10 mb-3" />
                      <h3 className="font-semibold mb-2">Secure & Trusted</h3>
                      <p className="text-sm opacity-90">
                        Your donation is encrypted and secure. We never share your information.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
