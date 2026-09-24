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
  const cardUrl = `/shop/${slugStr}`

  const whatsappMessage = `Hello SKARTS! I want to buy "${painting.paintingName}" (Size: ${sizeText}). Please share order details & availability.`
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappMessage)

  return (
    <div className="group bg-white flex flex-col justify-between h-full">
      {/* LARGE ARTWORK IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F2F2F2] group cursor-pointer">
        <Link href={cardUrl} className="block w-full h-full">
          <img
            src={imageUrl}
            alt={painting.paintingName}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      </div>

      {/* ARTWORK INFORMATION BELOW IMAGE */}
      <div className="mt-2.5 flex flex-col space-y-0.5">
        <span className="text-[10px] text-[#8A8A8A] font-medium tracking-wide">
          Traditional Kerala Mural
        </span>

        <Link href={cardUrl} className="hover:opacity-75 transition-opacity">
          <h3 className="font-bold text-black text-xs sm:text-sm line-clamp-1 leading-snug">
            {painting.paintingName}
          </h3>
        </Link>

        <div className="font-bold text-xs sm:text-sm text-black pt-0.5">
          {isPriceOnRequest ? (
            <span className="text-[10px] uppercase font-bold text-stone-700">Request Price</span>
          ) : (
            `₹${painting.price?.toLocaleString('en-IN')}`
          )}
        </div>
      </div>
    </div>
  )
}
