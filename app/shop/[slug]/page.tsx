import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMuralPaintingBySlug, getContact, getMuralPaintings } from '../../../lib/sanity/client'
import { ArtworkDetailClient } from '../../../components/ArtworkDetailClient'
import { urlFor } from '../../../lib/sanity/image'
import { getSlugString } from '../../../lib/sanity/types'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const paintings = await getMuralPaintings()
  return paintings
    .map((p) => ({
      slug: getSlugString(p.slug, p.paintingName) || p._id,
    }))
    .filter((item) => Boolean(item.slug && item.slug.trim() !== ''))
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

export default async function ShopArtworkDetailPage({ params }: Props) {
  const [painting, contact, allPaintings] = await Promise.all([
    getMuralPaintingBySlug(params.slug),
    getContact(),
    getMuralPaintings(),
  ])

  if (!painting) {
    notFound()
  }

  return (
    <div className="pt-[30px] pb-12">
      <ArtworkDetailClient
        painting={painting}
        whatsappNumber={contact.whatsappNumber}
        relatedPaintings={allPaintings}
      />
    </div>
  )
}
