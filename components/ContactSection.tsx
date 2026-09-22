import React from 'react'
import { ContactData } from '../lib/sanity/types'
import { WhatsAppIcon } from './WhatsAppIcon'
import { MapPin, Phone, Instagram, Mail } from 'lucide-react'

interface ContactSectionProps {
  contactData: ContactData
}

export function ContactSection({ contactData }: ContactSectionProps) {
  const whatsappUrl = `https://wa.me/${contactData.whatsappNumber.replace(/[^0-9]/g, '')}`
  const emailAddress = contactData.email || 'skartsambalappuzha@gmail.com'

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* SECTION DIVIDER HEADER */}
      <div className="text-left border-b border-stone-200/60 pb-3">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
          Contact & Studio
        </h2>
      </div>

      {/* BLOOMSHOP EDITORIAL STYLE CONTACT CONTENT */}
      <div className="py-2 space-y-5 max-w-2xl">
        {/* Brand Title */}
        <h3 className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-[#1C1917]">
          SK<span className="text-[#C85A32]">ARTS</span>
        </h3>

        {/* Subtitle Description */}
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
          Discover unique handcrafted mural paintings and bespoke architectural art. Quality craftsmanship meets traditional elegance.
        </p>

        {/* Contact Information List with Terracotta Orange Icons */}
        <div className="space-y-3 pt-1">
          {/* Location */}
          <div className="flex items-center gap-3 text-stone-700 text-sm font-medium">
            <MapPin className="w-5 h-5 text-[#C85A32] shrink-0" />
            <span>Mural Fine Art Studio, Ambalappuzha, Kerala, India</span>
          </div>

          {/* Email */}
          <a
            href={`mailto:${emailAddress}`}
            className="flex items-center gap-3 text-stone-700 hover:text-[#C85A32] text-sm font-medium transition-colors"
          >
            <Mail className="w-5 h-5 text-[#C85A32] shrink-0" />
            <span>{emailAddress}</span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${(contactData.phoneNumber || contactData.whatsappNumber).replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-3 text-stone-700 hover:text-[#C85A32] text-sm font-medium transition-colors"
          >
            <Phone className="w-5 h-5 text-[#C85A32] shrink-0" />
            <span>{contactData.phoneNumber || contactData.whatsappNumber}</span>
          </a>

          {/* WhatsApp / Enquiry */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-stone-700 hover:text-[#C85A32] text-sm font-medium transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#C85A32] shrink-0" />
            <span>WhatsApp Enquiry: {contactData.whatsappNumber}</span>
          </a>
        </div>

        {/* Circular Action Icons */}
        <div className="flex items-center gap-3 pt-3">
          <a
            href={`mailto:${emailAddress}`}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-[#C85A32] text-stone-800 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4 stroke-[1.75]" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-[#C85A32] text-stone-800 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          <a
            href={contactData.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-[#C85A32] text-stone-800 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 stroke-[1.75]" />
          </a>

          <a
            href={`tel:${(contactData.phoneNumber || contactData.whatsappNumber).replace(/[^0-9+]/g, '')}`}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-[#C85A32] text-stone-800 hover:text-white flex items-center justify-center transition-colors shadow-xs"
            aria-label="Direct Phone Call"
          >
            <Phone className="w-4 h-4 stroke-[1.75]" />
          </a>
        </div>
      </div>
    </div>
  )
}


