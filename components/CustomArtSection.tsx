'use client'

import React from 'react'
import { CustomArtData } from '../lib/sanity/types'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'
import {
  ArrowRight,
  Sparkles,
} from 'lucide-react'

interface CustomArtSectionProps {
  customArtData: CustomArtData
  whatsappNumber: string
}

export function CustomArtSection({ customArtData, whatsappNumber }: CustomArtSectionProps) {
  const customEnquiryMsg = `Hello SKARTS Studio! I am interested in a Custom Mural Art Commission. Please share consultation details and process.`
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, customEnquiryMsg)

  return (
    <div className="space-y-12 py-2">
      
      {/* 1. HERO STUDIO BANNER */}
      <div className="relative overflow-hidden bg-stone-900 text-white rounded-3xl p-6 sm:p-12 md:p-16 shadow-xl border border-stone-800">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-800/90 border border-stone-700/60 text-xs font-sans font-bold uppercase tracking-widest text-stone-300">
            <Sparkles className="w-3.5 h-3.5 text-stone-300" />
            <span>SKARTS Studio Commissions</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Bespoke Wall Murals & <br className="hidden sm:inline" />
            <span className="text-stone-300">Custom Canvas Art</span>
          </h1>

          <p className="font-sans text-stone-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Commission a handcrafted master mural tailored precisely to your wall dimensions, interior palette, and sacred motif preferences.
          </p>

          {/* Quick highlight feature badges */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-xs font-semibold text-stone-300">
            <span className="bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-700/50 flex items-center gap-1.5">
              🎨 100% Handpainted
            </span>
            <span className="bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-700/50 flex items-center gap-1.5">
              📐 Tailored Dimensions
            </span>
            <span className="bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-700/50 flex items-center gap-1.5">
              ✨ Gold Leafing Available
            </span>
            <span className="bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-700/50 flex items-center gap-1.5">
              🚚 Insured Delivery
            </span>
          </div>

          <div className="pt-4 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-stone-200 text-black px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-2.5 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 fill-black text-black" />
              <span>Discuss Project on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. DIRECT CONSULTATION BAR */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-xl border border-stone-800">
        <h3 className="font-heading text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto">
          Have a Specific Mural Idea or Architect Blueprint?
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
          Send wall dimensions, architectural drawings, or Pinterest inspiration directly to our master studio team for a personalized design proposal.
        </p>
        <div className="pt-2 flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-stone-200 text-black px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2.5 active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4 fill-black text-black" />
            <span>Connect Directly on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  )
}






