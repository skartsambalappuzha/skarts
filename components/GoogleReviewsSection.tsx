'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface Review {
  id: string
  name: string
  initial: string
  role: string
  quote: string
  rating: number
}

const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Priya Nair',
    initial: 'P',
    role: 'VERIFIED CLIENT',
    quote:
      '"SKARTS exceeded our expectations. From design to completion, everything was handled professionally. The mural looks amazing, and the finishing is excellent. Great team to work with!"',
    rating: 5,
  },
  {
    id: '2',
    name: 'Anand Ramakrishnan',
    initial: 'A',
    role: 'VERIFIED CLIENT',
    quote:
      '"Bespoke traditional mural artwork done with outstanding craftsmanship. The pigments and brush strokes bring an authentic royal heritage feel to our living room."',
    rating: 5,
  },
  {
    id: '3',
    name: 'Meera Menon',
    initial: 'M',
    role: 'GOOGLE REVIEW',
    quote:
      '"Prompt WhatsApp response, custom dimensions tailored to our wall size, and flawless delivery. Highly recommended for premium wall artwork!"',
    rating: 5,
  },
  {
    id: '4',
    name: 'Siddharth Varma',
    initial: 'S',
    role: 'VERIFIED CLIENT',
    quote:
      '"The attention to detail and traditional color tones are breathtaking. Transformed our studio entrance completely."',
    rating: 5,
  },
]

export function GoogleReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : REVIEWS.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-200/60 pb-3 gap-2">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
          Customer Reviews
        </h2>
        <div className="flex items-center space-x-1.5 bg-white px-3 py-1 rounded-full border border-stone-200/80 shadow-xs">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-900">4.9/5</span>
          <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
            Customer Reviews
          </span>
        </div>
      </div>

      {/* REVIEWS CAROUSEL CONTAINER */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* CARDS DISPLAY */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="w-full flex-shrink-0 px-1 sm:px-2"
              >
                <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-4">
                  {/* 5 STARS */}
                  <div className="flex text-amber-400 space-x-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* QUOTE TEXT */}
                  <p className="font-serif italic text-stone-700 text-sm sm:text-base leading-relaxed my-3 font-normal">
                    {review.quote}
                  </p>

                  {/* REVIEWER INFO ROW */}
                  <div className="flex items-center space-x-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-900 font-heading font-extrabold flex items-center justify-center text-base border border-stone-200 shadow-2xs">
                      {review.initial}
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-stone-900 text-sm sm:text-base leading-tight">
                        {review.name}
                      </h4>
                      <p className="text-[10px] font-semibold tracking-wider text-stone-400 uppercase mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION CONTROLS BELOW CARD */}
        <div className="flex items-center justify-center space-x-3 pt-4">
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center shadow-sm transition-all duration-300 active:scale-90 cursor-pointer"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center shadow-sm transition-all duration-300 active:scale-90 cursor-pointer"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
