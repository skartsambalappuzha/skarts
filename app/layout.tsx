import type { Metadata } from 'next'
import './globals.css'
import { getContact } from '../lib/sanity/client'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { MobileWhatsApp } from '../components/MobileWhatsApp'

export const metadata: Metadata = {
  title: {
    default: 'SKARTS | Premium Mural Artwork & Custom Studio',
    template: '%s | SKARTS Mural Art',
  },
  description:
    'Contemporary mural painting catalogue and custom wall art studio. Traditional craftsmanship, rich pigments, and bespoke architectural mural commissions.',
  keywords: [
    'Mural Art',
    'Mural Paintings',
    'Traditional Mural Art',
    'Custom Wall Painting',
    'Indian Mural Artist',
    'SKARTS',
    'Architectural Murals',
    'Bespoke Wall Artwork',
  ],
  openGraph: {
    title: 'SKARTS | Premium Mural Artwork & Custom Studio',
    description:
      'Contemporary mural painting catalogue and custom wall art studio. Handcrafted with traditional technique and rich spatial elegance.',
    url: 'https://skarts.com',
    siteName: 'SKARTS',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contact = await getContact()

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FAF8F5] text-[#1C1917] flex flex-col min-h-screen">
        <Header
          whatsappNumber={contact.whatsappNumber}
          instagramUrl={contact.instagramUrl}
        />
        <main className="flex-grow pt-14 sm:pt-24 pb-12 sm:pb-0">{children}</main>
        <Footer
          whatsappNumber={contact.whatsappNumber}
          instagramUrl={contact.instagramUrl}
        />
        <MobileWhatsApp
          phone={contact.whatsappNumber}
          message="Hello Sathyanskarts, I am visiting your website and would like to enquire about mural art."
        />
      </body>
    </html>
  )
}
