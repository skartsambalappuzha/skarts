'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  whatsappNumber?: string
  instagramUrl?: string
}

export function Header({ whatsappNumber, instagramUrl }: HeaderProps) {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Custom Art', href: '/custom-art' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg pointer-events-auto"
      aria-label="Main Floating Navigation"
    >
      <div className="bg-[#FAF8F5]/90 backdrop-blur-md border border-stone-300/80 shadow-md rounded-full p-1.5 flex items-center justify-between">
        {navLinks.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.name === 'Shop' && (pathname.startsWith('/shop') || pathname.startsWith('/mural-paintings')))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex-1 text-center py-2 px-2 rounded-full text-xs sm:text-sm font-sans tracking-tight transition-all duration-300 ease-in-out whitespace-nowrap ${
                isActive
                  ? 'bg-[#C85A32] text-white font-semibold shadow-sm transform scale-[1.02]'
                  : 'text-stone-700 hover:text-[#1C1917] font-medium hover:bg-stone-200/50'
              }`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
