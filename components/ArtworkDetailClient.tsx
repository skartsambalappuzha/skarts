'use client'

import React, { useState } from 'react'
import { MuralPainting, getSlugString } from '../lib/sanity/types'
import { urlFor } from '../lib/sanity/image'
import { Lightbox } from './Lightbox'
import { ArrowLeft, Share2, ShoppingBag, Maximize2, Palette, Truck, Clock, Sparkles, Layers } from 'lucide-react'
import Link from 'next/link'
import { buildWhatsAppUrl } from '../lib/whatsapp'

interface ArtworkDetailClientProps {
  painting: MuralPainting
  whatsappNumber: string
  relatedPaintings?: MuralPainting[]
}

export function ArtworkDetailClient({ painting, whatsappNumber, relatedPaintings = [] }: ArtworkDetailClientProps) {
  const sizeText = painting.size || 'Standard Size'

  // Build array of all images (main + additional)
  const allImages = [
    painting.mainArtworkImage,
    ...(painting.moreImages || []),
  ].filter(Boolean)

  const imageObjects = allImages.map((img, idx) => ({
    url: urlFor(img),
    title: `${painting.paintingName} (View ${idx + 1})`,
    alt: painting.paintingName,
  }))

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const isPriceOnRequest = painting.priceOnRequest || !painting.price
  const unitPrice = painting.price || 0

  const whatsappMessage = `Hello SKARTS! I want to buy "${painting.paintingName}" (Size: ${sizeText}). Price: ${isPriceOnRequest ? 'Price on Request' : `₹${unitPrice.toLocaleString('en-IN')}`}. Please share order details & availability.`
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappMessage)

  const currentSlugStr = getSlugString(painting.slug)
  // Filter out current item from related list
  const otherArtworks = relatedPaintings.filter((p) => getSlugString(p.slug) !== currentSlugStr)

  return (
    <>
      <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-20 sm:pb-16">
        
        {/* MOBILE & DESKTOP CONTAINER FRAME */}
        <div className="bg-[#F8F8F8] border border-stone-200/80 rounded-3xl overflow-hidden shadow-xl relative">
          
          {/* TOP IMAGE SECTION */}
          <div className="relative aspect-4/5 sm:aspect-square bg-stone-100 overflow-hidden">
            
            {/* MAIN IMAGE */}
            <img
              src={imageObjects[selectedImageIndex]?.url}
              alt={painting.paintingName}
              className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 hover:scale-105"
              onClick={() => setLightboxOpen(true)}
            />

            {/* FLOATING TOP-LEFT BACK BUTTON */}
            <Link
              href="/shop"
              className="absolute top-3 left-3 w-9 h-9 bg-black/75 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90 z-20"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            {/* FLOATING TOP-RIGHT SHARE & FULLSCREEN BUTTONS */}
            <div className="absolute top-3 right-3 flex items-center space-x-2 z-20">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="w-9 h-9 bg-black/75 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: painting.paintingName,
                      url: window.location.href,
                    })
                  }
                }}
                className="w-9 h-9 bg-black/75 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* BADGES AT BOTTOM LEFT OF IMAGE */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-2 z-20">
              <span className="bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                New
              </span>
              <span className="bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                Handcrafted 100%
              </span>
            </div>
          </div>

          {/* PRODUCT CARD CONTENT */}
          <div className="bg-white p-5 sm:p-7 space-y-5 border-t border-[#E5E5E5]">
            
            {/* CATEGORY & TITLE */}
            <div>
              <span className="text-xs text-[#8A8A8A] font-medium block mb-1">
                Traditional Kerala Mural
              </span>
              <h1 className="font-bold text-xl sm:text-2xl text-black leading-tight">
                {painting.paintingName}
              </h1>
            </div>

            {/* PRICE */}
            <div className="pt-2 border-t border-[#E5E5E5]">
              <span className="font-extrabold text-2xl text-black">
                {isPriceOnRequest ? (
                  <span className="text-sm font-bold text-stone-800">Price on Request</span>
                ) : (
                  `₹${unitPrice.toLocaleString('en-IN')}`
                )}
              </span>
            </div>

            {/* DESCRIPTION */}
            {painting.description && (
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal whitespace-pre-line">
                {painting.description}
              </p>
            )}

            {/* DYNAMIC ARTWORK SIZE FROM SANITY CMS */}
            {sizeText && (
              <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between">
                <span className="text-xs font-bold text-black">Artwork Size:</span>
                <span className="px-3.5 py-1.5 rounded-full bg-stone-100 border border-[#E5E5E5] text-xs font-semibold text-black">
                  {sizeText}
                </span>
              </div>
            )}

            {/* PRODUCT SPECIFICATIONS */}
            <div className="pt-3 border-t border-[#E5E5E5] space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
                Artwork & Delivery Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <Layers className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-black block">Material</span>
                    <span className="text-stone-500">Premium Canvas & Acrylic Colors</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <Palette className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-black block">Painting Technique</span>
                    <span className="text-stone-500">100% Handpainted Traditional Kerala Mural</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <Truck className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-black block">Delivery Areas</span>
                    <span className="text-stone-500">All India & Worldwide Shipping</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <Clock className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-black block">Estimated Delivery</span>
                    <span className="text-stone-500">7 - 14 Business Days</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-stone-100/80 p-3 rounded-xl border border-stone-200/80 text-xs text-stone-800 mt-2">
                <Sparkles className="w-4 h-4 text-black shrink-0" />
                <span>
                  <strong className="font-bold text-black">Customization Available:</strong> Custom dimensions, frames, & color schemes tailored on request.
                </span>
              </div>
            </div>

            {/* BUY NOW (LARGE FULL-WIDTH BLACK PILL-SHAPED BUTTON) */}
            <div className="pt-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-black hover:bg-stone-900 text-white py-3.5 rounded-full flex items-center justify-center space-x-2.5 text-sm font-bold transition-all shadow-md active:scale-98"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Buy Now on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {otherArtworks.length > 0 && (
          <div className="mt-12 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="font-heading font-extrabold text-lg text-stone-900">
                Related Artworks
              </h2>
              <Link
                href="/mural-paintings"
                className="text-xs font-bold text-black hover:underline"
              >
                View Shop →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
              {otherArtworks.slice(0, 4).map((item) => {
                const itemSlug = getSlugString(item.slug)
                return (
                  <Link
                    key={item._id || itemSlug}
                    href={`/mural-paintings/${itemSlug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                  <div className="aspect-square relative bg-stone-100 overflow-hidden">
                    <img
                      src={urlFor(item.mainArtworkImage)}
                      alt={item.paintingName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 flex-grow flex flex-col justify-between space-y-1">
                    <h3 className="font-bold text-xs text-stone-900 line-clamp-1 group-hover:text-black transition-colors">
                      {item.paintingName}
                    </h3>
                    <p className="text-[11px] font-semibold text-stone-700">
                      {item.priceOnRequest || !item.price
                        ? 'Price on Request'
                        : `₹${item.price.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                </Link>
              )
            })}
            </div>
          </div>
        )}

      </div>

      {/* LIGHTBOX */}
      <Lightbox
        images={imageObjects}
        currentIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : imageObjects.length - 1))}
        onNext={() => setSelectedImageIndex((prev) => (prev < imageObjects.length - 1 ? prev + 1 : 0))}
      />
    </>
  )
}


