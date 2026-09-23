'use client'

import React from 'react'
import Link from 'next/link'
import { MuralPainting, getSlugString } from '../lib/sanity/types'
import { urlFor } from '../lib/sanity/image'
import { buildWhatsAppUrl } from '../lib/whatsapp'

interface ArtworkCardProps {
  painting: MuralPainting
  whatsappNumber: string
}

export function ArtworkCard({ painting, whatsappNumber }: ArtworkCardProps) {
  const sizeText = painting.size || 'Standard Size'
  const imageUrl = urlFor(painting.mainArtworkImage)
  const isPriceOnRequest = painting.priceOnRequest || !painting.price
  const slugStr = getSlugString(painting.slug)
  const cardUrl = `/mural-paintings/${slugStr}`

  const whatsappMessage = `Hello SKARTS! I want to buy "${painting.paintingName}" (Size: ${sizeText}). Please share order details & availability.`
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappMessage)

  return (
    <div className="group bg-white border border-stone-200/80 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col justify-between h-full shadow-xs hover:shadow-xl transition-all duration-300 hover:border-[#C85A32]/40 overflow-hidden">
      
      {/* MAIN CONTENT LINK (IMAGE, TITLE, SUBTITLE, DESCRIPTION) */}
      <Link href={cardUrl} className="block space-y-2 sm:space-y-3 cursor-pointer flex-1">
        {/* TOP IMAGE CONTAINER */}
        <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100">
          <img
            src={imageUrl}
            alt={painting.paintingName}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* TOP LEFT BADGE */}
          <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-white/90 backdrop-blur-md text-stone-900 text-[9px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs">
            Best Seller
          </span>
        </div>

        {/* TITLE & DESCRIPTION */}
        <div className="min-h-[60px] sm:min-h-[72px] flex flex-col justify-start">
          <h3 className="font-heading font-extrabold text-stone-900 text-xs sm:text-base leading-snug line-clamp-1 group-hover:text-[#C85A32] transition-colors">
            {painting.paintingName}
          </h3>

          <p className="text-[10px] sm:text-xs text-stone-400 font-medium mt-0.5">
            SKARTS Premium Canvas
          </p>

          <p className="text-[10px] sm:text-xs text-stone-500 line-clamp-2 leading-relaxed mt-1 font-normal">
            {painting.description || 'Intricate traditional mural artwork with fine detailing.'}
          </p>
        </div>
      </Link>

      {/* SINGLE SIZE DISPLAY */}
      {sizeText && (
        <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-medium text-stone-500">
            Size: <span className="font-semibold text-stone-800">{sizeText}</span>
          </span>
        </div>
      )}

      {/* BOTTOM ROW: PRICE PILL + BUY NOW BUTTON */}
      <div className="mt-3 pt-2 flex items-center justify-between gap-1 border-t border-stone-100">
        {/* PRICE PILL LINK */}
        <Link
          href={cardUrl}
          className="bg-stone-100 text-stone-900 font-heading font-extrabold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full border border-stone-200/60 block hover:bg-stone-200 transition-colors cursor-pointer shrink-0"
        >
          {isPriceOnRequest ? (
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#C85A32]">
              Request
            </span>
          ) : (
            `₹${painting.price?.toLocaleString('en-IN')}`
          )}
        </Link>

        {/* BUY NOW BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            window.open(whatsappUrl, '_blank')
          }}
          className="bg-stone-900 hover:bg-[#C85A32] text-white text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-1.5 rounded-full flex items-center gap-0.5 sm:gap-1 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer shrink-0"
        >
          <span>Buy Now</span>
          <svg
            className="w-3 h-3 sm:w-3.5 sm:h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
