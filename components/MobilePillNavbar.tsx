'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react'

export function MobilePillNavbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/shop', icon: Compass },
    { name: 'Gallery', href: '/gallery', icon: Heart },
    { name: 'Cart', href: '/shop', icon: ShoppingBag },
    { name: 'Contact', href: '/contact', icon: User },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E5E5] px-4 py-2 pointer-events-auto"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.name === 'Explore' && (pathname.startsWith('/shop') || pathname.startsWith('/mural-paintings')))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
                isActive ? 'text-black' : 'text-[#8A8A8A] hover:text-black'
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-black text-white' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-medium mt-0.5 ${isActive ? 'font-bold text-black' : 'text-[#8A8A8A]'}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
