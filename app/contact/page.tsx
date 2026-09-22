import type { Metadata } from 'next'
import { getContact } from '../../lib/sanity/client'
import { ContactSection } from '../../components/ContactSection'

export const metadata: Metadata = {
  title: 'Contact & Studio Enquiries',
  description:
    'Get in touch with Sathyanskarts for mural artwork enquiries, pricing, availability, and custom commission requests.',
}

export const revalidate = 60

export default async function ContactPage() {
  const contact = await getContact()

  return (
    <div className="pt-[30px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactSection contactData={contact} />
      </div>
    </div>
  )
}
