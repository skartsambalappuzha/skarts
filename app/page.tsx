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

      {/* FEATURED MURAL PAINTINGS / PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
          <h2 className="font-heading font-extrabold text-lg sm:text-2xl text-stone-900 tracking-tight">
            Products
          </h2>
          <Link
            href="/shop"
            className="text-xs font-semibold text-stone-500 hover:text-[#10B981] transition-colors"
          >
            See all
          </Link>
        </div>

        <ArtworkGrid
          paintings={featuredPaintings.slice(0, 4)}
          whatsappNumber={contact.whatsappNumber}
        />
      </section>

      {/* GALLERY SHOWCASE SECTION / WHAT'S NEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
          <h2 className="font-heading font-extrabold text-lg sm:text-2xl text-stone-900 tracking-tight">
            What&apos;s New
          </h2>
          <Link
            href="/gallery"
            className="text-xs font-semibold text-stone-500 hover:text-[#10B981] transition-colors"
          >
            See all
          </Link>
        </div>
        <GalleryGridClient items={galleryItems.slice(0, 6)} />
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

