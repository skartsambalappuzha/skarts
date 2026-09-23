'use client'

import React, { useState } from 'react'
import { MuralPainting, getSlugString } from '../lib/sanity/types'
import { urlFor } from '../lib/sanity/image'
import { Lightbox } from './Lightbox'
import { ArrowLeft, Share2, Heart, Plus, Minus, ShoppingBag, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { buildWhatsAppUrl } from '../lib/whatsapp'

interface ArtworkDetailClientProps {
  painting: MuralPainting
  whatsappNumber: string
  relatedPaintings?: MuralPainting[]
}

export function ArtworkDetailClient({ painting, whatsappNumber, relatedPaintings = [] }: ArtworkDetailClientProps) {
  const sizeText = painting.size || 'Standard Size'
  const [quantity, setQuantity] = useState<number>(1)
  const [isLiked, setIsLiked] = useState<boolean>(false)

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
  const totalPrice = unitPrice * quantity

  const whatsappMessage = `Hello SKARTS! I want to buy "${painting.paintingName}" (Qty: ${quantity}, Size: ${sizeText}). Total Price: ${isPriceOnRequest ? 'Price on Request' : `₹${totalPrice.toLocaleString('en-IN')}`}. Please share order details & availability.`
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappMessage)

  const currentSlugStr = getSlugString(painting.slug)
  // Filter out current item from related list
  const otherArtworks = relatedPaintings.filter((p) => getSlugString(p.slug) !== currentSlugStr)

  return (
    <>
      <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto px-3 sm:px-4 pt-16 sm:pt-4 pb-16">
        
        {/* MOBILE CONTAINER FRAME */}
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
              href="/mural-paintings"
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
              <span className="bg-[#C85A32] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                New
              </span>
              <span className="bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                Handcrafted 100%
              </span>
            </div>
          </div>

          {/* BOTTOM SHEET / PRODUCT CARD CONTENT */}
          <div className="bg-white rounded-t-3xl -mt-4 relative z-30 p-5 sm:p-7 space-y-4 shadow-2xl border-t border-stone-100">
            
            {/* TITLE */}
            <div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-stone-900 leading-tight">
                {painting.paintingName}
              </h1>
              <p className="text-xs text-stone-400 font-medium mt-1">
                SKARTS Premium Mural Art
              </p>
            </div>

            {/* DESCRIPTION */}
            {painting.description && (
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {painting.description}
              </p>
            )}

            {/* SINGLE SIZE DISPLAY */}
            {sizeText && (
              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                <span className="text-xs font-bold text-stone-900 block">Size</span>
                <div className="inline-block bg-stone-100 border border-stone-200/80 px-3.5 py-1 rounded-full text-xs font-bold text-stone-800">
                  {sizeText}
                </div>
              </div>
            )}

            {/* QTY & TOTAL PRICE ROW */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              {/* QTY SELECTOR */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Qty
                </span>
                <div className="flex items-center space-x-3 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200/60">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-6 h-6 rounded-full bg-white text-stone-900 flex items-center justify-center font-bold text-sm shadow-xs hover:bg-stone-200 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-sm text-stone-900 w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 rounded-full bg-white text-stone-900 flex items-center justify-center font-bold text-sm shadow-xs hover:bg-stone-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* TOTAL PRICE */}
              <div className="text-right">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Total price
                </span>
                <span className="font-heading font-black text-lg sm:text-xl text-stone-900">
                  {isPriceOnRequest ? (
                    <span className="text-xs uppercase font-bold text-[#C85A32]">
                      Price on Request
                    </span>
                  ) : (
                    `₹${totalPrice.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>
            </div>

            {/* FULL-WIDTH BLACK PILL BUY NOW BUTTON */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-900 hover:bg-[#C85A32] text-white py-3.5 rounded-full flex items-center justify-center space-x-2.5 text-sm font-bold transition-all duration-300 shadow-md active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
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
                className="text-xs font-bold text-[#C85A32] hover:underline"
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
                    <h3 className="font-bold text-xs text-stone-900 line-clamp-1 group-hover:text-[#C85A32] transition-colors">
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


