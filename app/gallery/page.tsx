import type { Metadata } from 'next'
import { getGalleryItems } from '../../lib/sanity/client'
import { GalleryGridClient } from '../../components/GalleryGridClient'

export const metadata: Metadata = {
  title: 'Gallery & Mural Showcase',
  description:
    'An editorial showcase of traditional mural art installations, studio works, and wall panel details.',
}

export const revalidate = 60

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems()

  return (
    <div className="pt-[30px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-3 max-w-2xl mx-auto border-b border-gallery-border pb-8">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-gallery-terracotta font-semibold">
            Visual Archive
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl text-[#1C1917] font-extrabold tracking-tight">
            GALLERY SHOWCASE
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gallery-muted font-light tracking-wide">
            An editorial showcase of completed mural installations and artwork details.
          </p>
        </div>

        {/* MASONRY GALLERY CLIENT */}
        <GalleryGridClient items={galleryItems} />

      </div>
    </div>
  )
}
