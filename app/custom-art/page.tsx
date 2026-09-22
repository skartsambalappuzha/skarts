import type { Metadata } from 'next'
import { getCustomArt, getContact } from '../../lib/sanity/client'
import { CustomArtSection } from '../../components/CustomArtSection'

export const metadata: Metadata = {
  title: 'Custom Mural Art Commissions',
  description:
    'Commission bespoke mural paintings tailored to your space dimensions, color scheme, and architectural theme.',
}

export const revalidate = 60

export default async function CustomArtPage() {
  const [customArt, contact] = await Promise.all([
    getCustomArt(),
    getContact(),
  ])

  return (
    <div className="pt-[30px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomArtSection
          customArtData={customArt}
          whatsappNumber={contact.whatsappNumber}
        />
      </div>
    </div>
  )
}
