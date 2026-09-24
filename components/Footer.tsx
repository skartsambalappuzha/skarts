import React from 'react'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { buildWhatsAppUrl } from '../lib/whatsapp'

interface FooterProps {
  whatsappNumber: string
  instagramUrl: string
}

export function Footer({ whatsappNumber, instagramUrl }: FooterProps) {
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, 'Hello Sathyanskarts, I am reaching out from your website footer.')

  return (
    <footer className="bg-gallery-surface border-t border-gallery-border min-h-[100px] flex items-center text-gallery-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        {/* BRAND */}
        <Link href="/" className="inline-flex items-center space-x-2">
          <span className="font-heading text-xl tracking-widest uppercase text-[#1C1917] font-black">
            SKARTS
          </span>
        </Link>

        {/* COPYRIGHT */}
        <p className="text-xs font-sans text-stone-600 text-center">
          © 2026 SKARTS. All rights reserved.
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex items-center space-x-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-stone-200 bg-white hover:border-black text-[#1C1917] transition-colors rounded-full"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-stone-900 bg-black text-white hover:bg-stone-800 transition-colors rounded-full shadow-xs"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}

