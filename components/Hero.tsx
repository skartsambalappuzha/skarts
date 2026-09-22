import React from 'react'
import Link from 'next/link'
import { Star, ArrowRight, User } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'

interface HeroProps {
  heroImageUrl?: string
  whatsappNumber?: string
}

export function Hero({ heroImageUrl, whatsappNumber = '919876543210' }: HeroProps) {
  const bgImage = heroImageUrl || '/hero-banner.jpg'

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C1917] font-sans relative antialiased selection:bg-[#C85A32] selection:text-white">
      {/* Light subtle grain texture background overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
        }} 
      />

      {/* HERO MAIN CONTAINER */}
      <section className="relative z-10 max-w-xl mx-auto px-5 sm:px-6 -mt-20 sm:-mt-24 pt-[67px] pb-6 flex flex-col space-y-6">

        {/* HERO IMAGE CONTAINER WITH ABSOLUTE FLOATING TRUST BADGE */}
        <div className="relative w-full">
          {/* Subtle blurred gradient blob behind image */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#C85A32]/20 via-[#D4AF37]/20 to-amber-200/20 rounded-3xl blur-xl opacity-80 -z-10 transform scale-95" />

          {/* Hero Image Container */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-stone-900/10 border border-stone-200/80 bg-stone-100 group">
            <img
              src={bgImage}
              alt="Custom Mural Painting"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

            {/* FLOATING ABSOLUTE TRUST BADGE AT BOTTOM OF IMAGE */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md border border-stone-200/80 rounded-full shadow-xl shadow-stone-900/15 px-4 py-2 flex items-center justify-center gap-3 whitespace-nowrap max-w-[92%]">
              {/* Overlapping User Avatars */}
              <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-[#F2F2F2] ring-2 ring-white flex items-center justify-center border border-stone-200/60 flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-[#111111] fill-[#111111]" />
                </div>
                <div className="w-7 h-7 rounded-full bg-[#E5E5E5] ring-2 ring-white flex items-center justify-center border border-stone-200/60 flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-[#111111] fill-[#111111]" />
                </div>
                <div className="w-7 h-7 rounded-full bg-[#D8D8D8] ring-2 ring-white flex items-center justify-center border border-stone-200/60 flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-[#111111] fill-[#111111]" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans">
                <div className="flex text-[#FFC700] space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFC700] text-[#FFC700]" />
                  ))}
                </div>
                <span className="text-[#111111] font-extrabold text-xs sm:text-sm ml-0.5">4.9/5</span>
                <span className="text-stone-500 font-normal text-xs sm:text-sm">(1,200+ customers)</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}


