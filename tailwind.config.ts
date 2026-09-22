import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          bg: '#FAF8F5',          // Warm Off-White Background
          surface: '#FFFFFF',     // Clean White Surface
          card: '#FFFFFF',        // White Card Background
          border: '#E7E5E4',      // Soft Border
          borderHover: '#C85A32', // Terracotta Orange Border Hover
          text: '#1C1917',        // Charcoal Text
          muted: '#78716C',       // Elegant Muted Text
          accent: '#C85A32',      // Terracotta Orange Accent
          accentHover: '#B04B26', // Deep Terracotta Hover
        },
        whatsapp: {
          DEFAULT: '#25D366',     // Official WhatsApp Green
          green: '#25D366',
          hover: '#128C7E',       // Deep WhatsApp Green Hover
          dark: '#075E54',        // Rich Dark WhatsApp Teal
          light: '#DCF8C6',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['var(--font-heading)', 'Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4',
      },
      boxShadow: {
        'whatsapp-glow': '0 0 20px rgba(37, 211, 102, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.15)',
      }
    },
  },
  plugins: [],
}
export default config

