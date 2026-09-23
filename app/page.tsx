import Link from 'next/link'
import { getFeaturedMuralPaintings, getContact, getGalleryItems } from '../lib/sanity/client'
import { Hero } from '../components/Hero'
import { ArtworkGrid } from '../components/ArtworkGrid'
import { GalleryGridClient } from '../components/GalleryGridClient'
import { GoogleReviewsSection } from '../components/GoogleReviewsSection'
import { ContactSection } from '../components/ContactSection'
import { WhatsAppButton } from '../components/WhatsAppButton'

export const revalidate = 60 // Revalidate Sanity data every 60s

export default async function HomePage() {
  const [featuredPaintings, contact, galleryItems] = await Promise.all([
    getFeaturedMuralPaintings(),
    getContact(),
    getGalleryItems(),
  ])

  return (
    <div className="space-y-10 pb-12">
      
      {/* HERO SECTION */}
      <Hero whatsappNumber={contact.whatsappNumber} />

      {/* FEATURED MURAL PAINTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left border-b border-stone-200/60 pb-3">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
            Explore Our Mural Art
          </h2>
        </div>

        <ArtworkGrid
          paintings={featuredPaintings.slice(0, 4)}
          whatsappNumber={contact.whatsappNumber}
        />

        <div className="text-center pt-6">
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 border border-stone-300 bg-white text-[#1C1917] hover:border-[#C85A32] hover:text-[#C85A32] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all rounded-full shadow-sm"
          >
            See More Shop All
          </Link>
        </div>
      </section>

      {/* GALLERY SHOWCASE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left border-b border-stone-200/60 pb-3">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
            Visual Gallery
          </h2>
        </div>
        <GalleryGridClient items={galleryItems.slice(0, 6)} />

        <div className="text-center pt-4">
          <Link
            href="/gallery"
            className="inline-block px-8 py-3.5 border border-stone-300 bg-white text-[#1C1917] hover:border-[#C85A32] hover:text-[#C85A32] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all rounded-full shadow-sm"
          >
            Show More Images
          </Link>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION (BELOW GALLERY) */}
      <GoogleReviewsSection />

      {/* CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactSection contactData={contact} />
      </section>

    </div>
  )
}

