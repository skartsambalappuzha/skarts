import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMuralPaintingBySlug, getContact, getMuralPaintings } from '../../../lib/sanity/client'
import { ArtworkDetailClient } from '../../../components/ArtworkDetailClient'
import { urlFor } from '../../../lib/sanity/image'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const paintings = await getMuralPaintings()
  return paintings.map((p) => ({
    slug: p.slug.current,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const painting = await getMuralPaintingBySlug(params.slug)
  if (!painting) {
    return {
      title: 'Artwork Not Found',
    }
  }

  const imageUrl = urlFor(painting.mainArtworkImage)

  return {
    title: painting.paintingName,
    description: painting.description || `Explore ${painting.paintingName} mural artwork at Sathyanskarts studio.`,
    openGraph: {
      title: `${painting.paintingName} | SATHYANSKARTS Mural Art`,
      description: painting.description || `Handcrafted mural painting - ${painting.size || 'Custom dimensions'}`,
      images: [{ url: imageUrl }],
    },
  }
}

export const revalidate = 60

export default async function ArtworkDetailPage({ params }: Props) {
  const [painting, contact] = await Promise.all([
    getMuralPaintingBySlug(params.slug),
    getContact(),
  ])

  if (!painting) {
    notFound()
  }

  return (
    <div className="pt-[30px] pb-12">
      <ArtworkDetailClient
        painting={painting}
        whatsappNumber={contact.whatsappNumber}
      />
    </div>
  )
}
