'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { WhatsAppIcon } from './WhatsAppIcon'
import { buildWhatsAppUrl } from '../lib/whatsapp'

interface MobileWhatsAppProps {
  phone: string
  message?: string
}

export function MobileWhatsApp({ phone, message }: MobileWhatsAppProps) {
  const pathname = usePathname() || ''
  
  // Hide global floating WhatsApp FAB on product detail pages where sticky buy bar is present
  const isDetailPage =
    (pathname.startsWith('/shop/') && pathname !== '/shop') ||
    (pathname.startsWith('/mural-paintings/') && pathname !== '/mural-paintings')

  if (isDetailPage) return null

  const url = buildWhatsAppUrl(phone, message)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="md:hidden fixed bottom-6 right-4 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.5)] hover:bg-[#128C7E] active:scale-90 transition-all duration-200 flex items-center justify-center cursor-pointer"
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  )
}


