'use client'

import React from 'react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { buildWhatsAppUrl } from '../lib/whatsapp'

interface WhatsAppButtonProps {
  phone: string
  message?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'stickyMobile'
  children?: React.ReactNode
}

export function WhatsAppButton({
  phone,
  message,
  className = '',
  variant = 'primary',
  children,
}: WhatsAppButtonProps) {
  const url = buildWhatsAppUrl(phone, message)

  let baseStyle =
    'inline-flex items-center justify-center font-sans tracking-wide text-xs uppercase font-semibold transition-all duration-300 cursor-pointer rounded-sm shadow-sm'

  if (variant === 'primary') {
    baseStyle +=
      ' bg-whatsapp-green text-white hover:bg-whatsapp-hover hover:shadow-whatsapp-glow px-6 py-3.5 border border-whatsapp-green/40'
  } else if (variant === 'secondary') {
    baseStyle +=
      ' bg-whatsapp-dark text-white hover:bg-whatsapp-hover px-6 py-3.5 border border-whatsapp-green/30'
  } else if (variant === 'outline') {
    baseStyle +=
      ' bg-transparent text-whatsapp-green border border-whatsapp-green/60 hover:bg-whatsapp-green hover:text-white px-6 py-3.5'
  } else if (variant === 'stickyMobile') {
    baseStyle +=
      ' bg-whatsapp-green text-white w-full py-3.5 shadow-whatsapp-glow flex items-center justify-center space-x-2 text-sm tracking-wider font-semibold hover:bg-whatsapp-hover'
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyle} ${className}`}
    >
      <WhatsAppIcon className="w-4 h-4 mr-2" />
      <span>{children || 'Enquire on WhatsApp'}</span>
    </a>
  )
}

