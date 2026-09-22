'use client'

import React from 'react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { buildWhatsAppUrl } from '../lib/whatsapp'

interface MobileWhatsAppProps {
  phone: string
  message?: string
}

export function MobileWhatsApp({ phone, message }: MobileWhatsAppProps) {
  const url = buildWhatsAppUrl(phone, message)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="md:hidden fixed bottom-20 right-4 z-40 bg-whatsapp-green text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-whatsapp-hover active:scale-95 transition-all duration-200 flex items-center justify-center"
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  )
}
