import React from 'react'
import { MuralPainting, getSlugString } from '../lib/sanity/types'
import { ArtworkCard } from './ArtworkCard'

interface ArtworkGridProps {
  paintings: MuralPainting[]
  whatsappNumber: string
}

export function ArtworkGrid({ paintings, whatsappNumber }: ArtworkGridProps) {
  if (!paintings || paintings.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-gallery-border p-8 bg-gallery-surface">
        <p className="font-serif text-lg text-gallery-charcoal">No mural paintings are currently available.</p>
        <p className="text-xs text-gallery-muted font-sans mt-2">Please check back soon or enquire directly for custom commissions.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
      {paintings.map((painting) => (
        <ArtworkCard
          key={painting._id || getSlugString(painting.slug)}
          painting={painting}
          whatsappNumber={whatsappNumber}
        />
      ))}
    </div>
  )
}
