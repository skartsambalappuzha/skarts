'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobilePillNavbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/mural-paintings' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Custom Art', href: '/custom-art' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-md pointer-events-auto"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full p-1.5 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === '/mural-paintings' && pathname.startsWith('/mural-paintings')) ||
            (item.href === '/shop' && pathname === '/shop')

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex-1 text-center py-2 px-1 rounded-full text-[11px] sm:text-xs font-sans tracking-tight transition-all duration-300 ease-in-out whitespace-nowrap ${
                isActive
                  ? 'bg-black text-white font-semibold shadow-md transform scale-[1.02]'
                  : 'text-stone-700 hover:text-black font-medium hover:bg-stone-100/80'
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
