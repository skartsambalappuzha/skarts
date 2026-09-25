import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedMuralPaintings, getContact, getGalleryItems, getHero } from '../lib/sanity/client'
import { Hero } from '../components/Hero'
import { ArtworkGrid } from '../components/ArtworkGrid'
import { GalleryGridClient } from '../components/GalleryGridClient'
import { GoogleReviewsSection } from '../components/GoogleReviewsSection'
import { ContactSection } from '../components/ContactSection'

export const revalidate = 60 // Revalidate Sanity data every 60s

export default async function HomePage() {
  const [featuredPaintings, contact, galleryItems, heroData] = await Promise.all([
    getFeaturedMuralPaintings(),
    getContact(),
    getGalleryItems(),
    getHero(),
  ])

  return (
    <div className="space-y-10 pb-12">
      
      {/* HERO SECTION */}
      <Hero heroData={heroData} whatsappNumber={contact.whatsappNumber} />

      {/* FEATURED MURAL PAINTINGS / PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-stone-200/80 pb-3">
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-stone-900 tracking-tight">
            Products
          </h2>
        </div>

        <ArtworkGrid
          paintings={featuredPaintings.slice(0, 4)}
          whatsappNumber={contact.whatsappNumber}
        />

        <div className="pt-2 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold tracking-wide text-stone-800 bg-stone-100 hover:bg-[#10B981] hover:text-white border border-stone-200/80 hover:border-[#10B981] transition-all duration-300 shadow-sm hover:shadow-md group active:scale-95 w-full sm:w-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>
      </section>

      {/* GALLERY SHOWCASE SECTION / WHAT'S NEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="border-b border-stone-200/80 pb-3">
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-stone-900 tracking-tight">
            What&apos;s New
          </h2>
        </div>
        <GalleryGridClient items={galleryItems.slice(0, 6)} />

        <div className="pt-2 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold tracking-wide text-stone-800 bg-stone-100 hover:bg-[#10B981] hover:text-white border border-stone-200/80 hover:border-[#10B981] transition-all duration-300 shadow-sm hover:shadow-md group active:scale-95 w-full sm:w-auto"
          >
            <span>View Gallery</span>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
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


