'use client'

import React, { useState, useEffect } from 'react'
import { X, ShoppingBag, MapPin, User, Phone, Home, Building, Globe, Send } from 'lucide-react'
import { MuralPainting } from '../lib/sanity/types'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { urlFor } from '../lib/sanity/image'
import { WhatsAppIcon } from './WhatsAppIcon'

export interface ShippingAddress {
  fullName: string
  phone: string
  houseBuilding: string
  area: string
  city: string
  district: string
  state: string
  pinCode: string
  country: string
}

interface OrderAddressModalProps {
  isOpen: boolean
  onClose: () => void
  painting: MuralPainting
  whatsappNumber: string
}

const STORAGE_KEY = 'skarts_saved_shipping_address'

export function OrderAddressModal({ isOpen, onClose, painting, whatsappNumber }: OrderAddressModalProps) {
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    houseBuilding: '',
    area: '',
    city: '',
    district: '',
    state: '',
    pinCode: '',
    country: 'India',
  })

  // Load saved address from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setAddress((prev) => ({ ...prev, ...parsed }))
      }
    } catch (e) {
      // Ignore storage read errors
    }
  }, [])

  if (!isOpen) return null

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to localStorage for convenience in future orders
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(address))
    } catch (err) {
      // Ignore storage write errors
    }

    const sizeText = painting.size || 'Standard Size'
    const isPriceOnRequest = painting.priceOnRequest || !painting.price
    const priceText = isPriceOnRequest ? 'Price on Request' : `₹${painting.price?.toLocaleString('en-IN')}`

    // Construct formatted WhatsApp message
    const formattedMessage = `*NEW ORDER ENQUIRY - SATHYANSKARTS*

*Artwork Details:*
- *Item:* ${painting.paintingName}
- *Size:* ${sizeText}
- *Price:* ${priceText}

*Delivery Address:*
- *Name:* ${address.fullName}
- *Phone:* ${address.phone}
- *House/Building:* ${address.houseBuilding}
- *Area/Street:* ${address.area}
- *City:* ${address.city}
- *District:* ${address.district}
- *State:* ${address.state}
- *PIN Code:* ${address.pinCode}
- *Country:* ${address.country}

Please confirm availability and order payment details. Thank you!`

    const whatsappUrl = buildWhatsAppUrl(whatsappNumber, formattedMessage)
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    onClose()
  }

  const imageUrl = painting.mainArtworkImage ? urlFor(painting.mainArtworkImage) : ''

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 p-0 sm:p-4">
      <div 
        className="bg-white w-full sm:max-w-lg rounded-t-[32px] sm:rounded-3xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col relative animate-in slide-in-from-bottom-5 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MOBILE DRAG HANDLE */}
        <div className="pt-2.5 pb-1 sm:hidden flex justify-center bg-white">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* MODAL HEADER */}
        <div className="bg-white px-5 py-3.5 border-b border-stone-100 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-stone-900 leading-tight">
                Delivery Details
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                Enter your shipping address for WhatsApp order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FORM & SCROLLABLE CONTENT */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto px-5 py-4 space-y-3.5 flex-1">

            {/* PRODUCT SUMMARY BANNER */}
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center space-x-3">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={painting.paintingName}
                  className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-stone-900 truncate">
                  {painting.paintingName}
                </h4>
                <div className="flex items-center space-x-2 text-[11px] text-stone-500 mt-0.5">
                  <span>Size: {painting.size || 'Standard'}</span>
                  <span>•</span>
                  <span className="font-bold text-stone-900">
                    {painting.priceOnRequest || !painting.price
                      ? 'Price on Request'
                      : `₹${painting.price?.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>
            </div>

            {/* FULL NAME & PHONE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sreejith Kumar"
                    value={address.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={address.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* HOUSE / BUILDING */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                House / Building / Flat Name & No. *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Villa 12, Sreevalsam House"
                  value={address.houseBuilding}
                  onChange={(e) => handleChange('houseBuilding', e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                />
                <Home className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* AREA / STREET */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Area / Street / Landmark *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Ambalappuzha East, Near Temple"
                  value={address.area}
                  onChange={(e) => handleChange('area', e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                />
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* CITY & DISTRICT */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  City / Town *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ambalappuzha"
                    value={address.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                  />
                  <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  District *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alappuzha"
                    value={address.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                  />
                  <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* STATE & PIN CODE */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  State *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kerala"
                    value={address.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                  />
                  <Globe className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  PIN Code *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 688561"
                    value={address.pinCode}
                    onChange={(e) => handleChange('pinCode', e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* COUNTRY */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Country *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. India"
                  value={address.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all bg-white"
                />
                <Globe className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

          </div>

          {/* STICKY SUBMIT BUTTON AT BOTTOM OF MODAL */}
          <div className="p-4 bg-white border-t border-stone-100 shrink-0 shadow-lg">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-[#25D366]/20 transition-all active:scale-98 cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 mr-1" />
              <span>Send Order & Address via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
