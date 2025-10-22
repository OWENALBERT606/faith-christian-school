// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, ChevronRight, Star } from "lucide-react"
// import Image from "next/image"

// const slides = [
//   {
//     title: "Transforming Lives Through Faith",
//     subtitle: "Making a Difference Together",
//     description: "Join us in our mission to empower communities and create lasting change",
//     image: "/african-children-enjoying-life.jpg",
//   },
//   {
//     title: "Building Hope, Creating Impact",
//     subtitle: "Community Empowerment",
//     description: "Supporting families and communities with compassion and dedication",
//     image: "/african-kids-enjoying-life.jpg",
//   },
//   {
//     title: "Strive for Excellence",
//     subtitle: "Faith in Action",
//     description: "Bringing positive change through faith-based initiatives and programs",
//     image: "/happy-students-learning-with-teacher-in-bright-cla.jpg",
//   },
// ]

// export function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length)
//     }, 5000)
//     return () => clearInterval(timer)
//   }, [])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
//   }

//   return (
//     <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentSlide ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/40 to-primary/10 z-10" />
//           <Image
//             src={slide.image || "/placeholder.svg"}
//             alt={slide.title}
//             fill
//             className="object-cover"
//             priority={index === 0}
//           />
//         </div>
//       ))}

//       <div className="relative z-20 h-full flex items-center">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-3xl">
//             <div className="flex items-center gap-2 mb-6 opacity-0 animate-fade-in">
//               <Star className="w-5 h-5 text-accent fill-accent" />
//               <span className="text-accent font-semibold text-sm uppercase tracking-wider">Strive for Excellence</span>
//             </div>

//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 opacity-0 animate-fade-in-up animation-delay-200 leading-tight">
//               {slides[currentSlide].title}
//             </h1>

//             <p className="text-xl sm:text-2xl md:text-3xl text-secondary font-semibold mb-6 opacity-0 animate-fade-in-up animation-delay-400">
//               {slides[currentSlide].subtitle}
//             </p>

//             <p className="text-lg sm:text-xl text-white/90 mb-8 opacity-0 animate-fade-in-up animation-delay-600 leading-relaxed">
//               {slides[currentSlide].description}
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animation-delay-600">
//               <Button
//                 size="lg"
//                 className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6"
//               >
//                 Donate Now
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 bg-transparent"
//               >
//                 Get Involved
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-6 h-6 text-white" />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="w-6 h-6 text-white" />
//       </button>

//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-2 rounded-full transition-all ${
//               index === currentSlide ? "w-8 bg-accent" : "w-2 bg-white/50"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }




"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Slide = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt?: string;
};

const slides: Slide[] = [
  {
    title: "Transforming Lives Through Faith",
    subtitle: "Making a Difference Together",
    description:
      "Join us in our mission to empower communities and create lasting change.",
    image: "/african-children-enjoying-life.jpg",
    alt: "Children smiling outdoors",
  },
  {
    title: "Building Hope, Creating Impact",
    subtitle: "Community Empowerment",
    description:
      "Supporting families and communities with compassion and dedication.",
    image: "/african-kids-enjoying-life.jpg",
    alt: "Kids playing outside",
  },
  {
    title: "Strive for Excellence",
    subtitle: "Faith in Action",
    description:
      "Bringing positive change through faith-based initiatives and programs.",
    image: "/close-up-community-concept-with-hands.jpg",
    alt: "Happy students learning with a teacher",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(
      () => setCurrent((i) => (i + 1) % slides.length),
      5000
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const goto = (i: number) => setCurrent((i + slides.length) % slides.length);
  const next = () => goto(current + 1);
  const prev = () => goto(current - 1);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== current}
        >
          {/* Orange gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-orange-900/90 via-orange-600/40 to-orange-300/10" />
          <Image
            src={s.image || "/placeholder.svg"}
            alt={s.alt ?? s.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Text content */}
      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Re-mount on slide change to restart CSS animations */}
          <div key={current} className="max-w-3xl">
            <div className="mb-6 flex items-center gap-2 animate-fade-in">
              <Star className="h-5 w-5 text-orange-400 fill-orange-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-orange-200">
                {slides[current].subtitle}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up delay-200">
              {slides[current].title}
            </h1>

            <p className="mb-8 max-w-2xl text-lg text-white/90 sm:text-xl animate-fade-in-up delay-400">
              {slides[current].description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-600">
              <Button
                size="lg"
                className="bg-orange-600 px-8 py-6 text-lg font-semibold text-white hover:bg-orange-700"
              >
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white hover:bg-white hover:text-orange-700"
              >
                Get Involved
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition hover:bg-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition hover:bg-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goto(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-orange-500" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
