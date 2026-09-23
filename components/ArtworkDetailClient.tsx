'use client'

import React, { useState } from 'react'
import { MuralPainting } from '../lib/sanity/types'
import { urlFor } from '../lib/sanity/image'
import { Lightbox } from './Lightbox'
import { ArrowLeft, Share2, Heart, Plus, Minus, ShoppingBag, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { buildWhatsAppUrl } from '../lib/whatsapp'

interface ArtworkDetailClientProps {
  painting: MuralPainting
  whatsappNumber: string
}

const DEFAULT_SIZES = ['12"x16"', '18"x24"', '24"x36"', '30"x40"', '36"x48"']

export function ArtworkDetailClient({ painting, whatsappNumber }: ArtworkDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    painting.size || DEFAULT_SIZES[1]
  )
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

  const whatsappMessage = `Hello SKARTS! I want to buy "${painting.paintingName}" (Qty: ${quantity}, Size: ${selectedSize}). Total Price: ${isPriceOnRequest ? 'Price on Request' : `₹${totalPrice.toLocaleString('en-IN')}`}. Please share order details & availability.`
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappMessage)

  return (
    <>
      <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-4 pb-12">
        
        {/* MOBILE CONTAINER FRAME */}
        <div className="bg-[#F8F8F8] border border-stone-200 rounded-3xl overflow-hidden shadow-lg relative">
          
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
              className="absolute top-4 left-4 w-9 h-9 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90 z-20"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            {/* FLOATING TOP-RIGHT SHARE & FULLSCREEN BUTTONS */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="w-9 h-9 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90"
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
                className="w-9 h-9 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* BADGES AT BOTTOM LEFT OF IMAGE */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 z-20">
              <span className="bg-[#E67E51] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                New
              </span>
              <span className="bg-[#99E2A0] text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                Handcrafted 100%
              </span>
            </div>
          </div>

          {/* BOTTOM SHEET / PRODUCT CARD CONTENT */}
          <div className="bg-white rounded-t-3xl -mt-4 relative z-30 p-5 sm:p-7 space-y-5 shadow-2xl border-t border-stone-100">
            
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
              <p className="text-xs text-stone-500 leading-relaxed font-normal">
                {painting.description}
              </p>
            )}

            {/* SELECT SIZE ROW */}
            <div className="space-y-2.5 pt-2 border-t border-stone-100">
              <div>
                <span className="text-xs font-bold text-stone-900">Select size</span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:flex sm:flex-wrap">
                {DEFAULT_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-full sm:w-16 py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all border text-center ${
                      selectedSize === size
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm scale-102'
                        : 'bg-stone-100 text-stone-700 border-transparent hover:bg-stone-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

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
                <span className="font-heading font-black text-xl text-stone-900">
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
                className="w-full bg-stone-900 hover:bg-[#C85A32] text-white py-4 rounded-full flex items-center justify-center space-x-2.5 text-sm font-bold transition-all duration-300 shadow-md active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Now on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
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


