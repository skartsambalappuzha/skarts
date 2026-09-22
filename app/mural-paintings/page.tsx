import type { Metadata } from 'next'
import { getMuralPaintings, getContact } from '../../lib/sanity/client'
import { ArtworkGrid } from '../../components/ArtworkGrid'

export const metadata: Metadata = {
  title: 'Mural Paintings Catalogue',
  description:
    'Explore our curated collection of traditional mural artwork and custom wall panel paintings available for enquiry.',
}

export const revalidate = 60

export default async function MuralPaintingsPage() {
  const [paintings, contact] = await Promise.all([
    getMuralPaintings(),
    getContact(),
  ])

  return (
    <div className="pt-[30px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* PAGE HEADER */}
        <div className="text-center space-y-3 max-w-2xl mx-auto border-b border-gallery-border pb-8">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gallery-terracotta font-semibold">
            Fine Art Catalogue
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl text-[#1C1917] font-extrabold tracking-tight">
            MURAL PAINTINGS
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gallery-muted font-light tracking-wide">
            A curated collection of mural artworks available for enquiry.
          </p>
        </div>

        {/* CATALOGUE GRID */}
        <ArtworkGrid
          paintings={paintings}
          whatsappNumber={contact.whatsappNumber}
        />

      </div>
    </div>
  )
}
