"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Beneficiary",
      image: "/african-man-7398921_960_720.jpg",
      content:
        "Faith Christian School Foundation helped my family during our most difficult time. Their compassion and support gave us hope and a path forward.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Volunteer",
      image: "/african-man-7398921_960_720.jpg",
      content:
        "Being part of this organization has been incredibly rewarding. Seeing the direct impact we make in people's lives is truly inspiring.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Donor",
      image: "/african-man-7398921_960_720.jpg",
      content:
        "I'm proud to support an organization that truly lives its values. Every donation makes a real difference in our community.",
      rating: 5,
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = Math.ceil(testimonials.length / 2)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalSlides])

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % totalSlides)
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Stories of <span className="text-secondary">Hope & Impact</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 bg-background border-2 border-secondary/20 rounded-full p-2 sm:p-3 hover:bg-secondary hover:border-secondary transition-all duration-300 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 bg-background border-2 border-secondary/20 rounded-full p-2 sm:p-3 hover:bg-secondary hover:border-secondary transition-all duration-300 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial, index) => (
                      <Card key={index} className="shadow-xl">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col items-center mb-6">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="rounded-full object-cover border-4 border-secondary/20"
                              />
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg text-foreground">{testimonial.name}</div>
                              <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                            </div>
                          </div>

                          <div className="flex gap-1 mb-4 justify-center">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                            ))}
                          </div>

                          <p className="text-muted-foreground text-center text-base leading-relaxed italic">
                            "{testimonial.content}"
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-secondary w-8" : "bg-secondary/30 hover:bg-secondary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
