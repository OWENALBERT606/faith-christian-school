


"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

type Slide = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt?: string;
};



export function HeroSection({banners}:{banners?:any}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(
      () => setCurrent((i) => (i + 1) % banners.length),
      5000
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const goto = (i: number) => setCurrent((i + banners.length) % banners.length);
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
      {banners?.map((s:any, i:any) => (
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
            src={s.imageUrl || "/placeholder.svg"}
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
                {banners[current].subtitle}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up delay-200">
              {banners[current].title}
            </h1>

            <p className="mb-8 max-w-2xl text-lg text-white/90 sm:text-xl animate-fade-in-up delay-400">
              {banners[current].description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-600">
             <Link href="/donate">
              <Button
                size="lg"
                className="bg-orange-600 px-8 py-6 text-lg font-semibold text-white hover:bg-orange-700"
              >
                Donate Now
              </Button>
             
             </Link>
             <Link href="/involve">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent px-8 py-6 text-lg font-semibold text-white hover:bg-white hover:text-orange-900 border-2 border-white"
              >
                Get Involved
              </Button>
             </Link>
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
        {banners?.map((_:any, i:any) => (
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
