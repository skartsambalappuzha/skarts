'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'

interface HeaderProps {
  whatsappNumber?: string
  instagramUrl?: string
}

export function Header({ whatsappNumber }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Custom Art', href: '/custom-art' },
    { name: 'Contact', href: '/contact' },
  ]

  const whatsappMsg = "Hello SKARTS! I am visiting your website and would like to enquire about your mural art."
  const whatsappUrl = `https://wa.me/${whatsappNumber || '919876543210'}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <>
      <nav
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl pointer-events-auto"
        aria-label="Main Floating Navigation"
      >
        <div className="bg-white/90 backdrop-blur-xl border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
          
          {/* BRAND LOGO / NAME */}
          <Link href="/" className="font-bold text-base sm:text-lg text-black tracking-tight flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">S</span>
            <span>SKARTS</span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.name === 'Shop' && (pathname.startsWith('/shop') || pathname.startsWith('/mural-paintings')))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'text-black font-bold bg-stone-100 px-3 py-1.5 rounded-full'
                      : 'text-[#8A8A8A] hover:text-black px-2 py-1'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* RIGHT SIDE: ENQUIRE BUTTON & MOBILE HAMBURGER MENU */}
          <div className="flex items-center gap-2">
            <Link
              href={whatsappUrl}
              target="_blank"
              className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-stone-800 transition-all shadow-xs"
            >
              Enquire
            </Link>

            {/* MOBILE RIGHT: HAMBURGER MENU TOGGLE ICON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black p-1 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-white z-40 p-6 flex flex-col justify-between border-t border-[#E5E5E5]">
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-black border-b border-[#E5E5E5] pb-3"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center font-bold text-sm shadow-md"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
