'use client'

import React, { useState } from 'react'
import { GalleryItem } from '../lib/sanity/types'
import { urlFor } from '../lib/sanity/image'
import { Lightbox } from './Lightbox'
import { Maximize2 } from 'lucide-react'

interface GalleryGridClientProps {
  items: GalleryItem[]
}

export function GalleryGridClient({ items }: GalleryGridClientProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-gallery-border bg-gallery-surface">
        <p className="font-serif text-lg text-gallery-charcoal">Gallery coming soon.</p>
      </div>
    )
  }

  const lightboxImages = items.map((item) => ({
    url: urlFor(item.image),
    title: item.title || 'Mural Gallery Artwork',
    alt: item.title || 'Gallery Artwork',
  }))

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
        {items.map((item, idx) => {
          const imgUrl = urlFor(item.image)

          return (
            <div
              key={item._id || idx}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 cursor-pointer shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.015]"
              onClick={() => {
                setSelectedIdx(idx)
                setLightboxOpen(true)
              }}
            >
              <img
                src={imgUrl}
                alt={item.title || 'Mural Artwork'}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )
        })}
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={selectedIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setSelectedIdx((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
        onNext={() => setSelectedIdx((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
      />
    </>
  )
}
