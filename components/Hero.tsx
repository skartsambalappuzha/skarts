'use client'

import React from 'react'
import Link from 'next/link'
import { Star, ArrowRight, User, SlidersHorizontal } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'

interface HeroProps {
  heroImageUrl?: string
  whatsappNumber?: string
}

export function Hero({ heroImageUrl, whatsappNumber = '919876543210' }: HeroProps) {
  const bgImage = heroImageUrl || '/hero-banner.jpg'

  return (
    <div className="w-full bg-white text-black font-sans relative antialiased">
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2 space-y-4">



        {/* HERO BANNER */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.4/1] rounded-2xl overflow-hidden bg-[#F2F2F2] group">
          <img
            src={bgImage}
            alt="Beautiful Mural Art"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

          {/* HERO CONTENT */}
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 z-20 space-y-2 max-w-lg">
            <h2 className="font-extrabold text-xl sm:text-3xl text-white leading-tight">
              Discover Beautiful Mural Art
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-normal line-clamp-1">
              Hand-painted traditional & contemporary murals for modern spaces.
            </p>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-black text-xs sm:text-sm font-bold px-5 py-2 rounded-full hover:bg-stone-100 transition-all shadow-md active:scale-95"
              >
                <span>Explore Art</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}


