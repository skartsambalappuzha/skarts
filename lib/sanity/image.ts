import imageUrlBuilder from '@sanity/image-url'

const DEFAULT_PROJECT_ID = '2dbutxu6'
const DEFAULT_DATASET = 'production'
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'

export function urlFor(source: any): string {
  if (!source) return FALLBACK_IMAGE

  // String cases
  if (typeof source === 'string') {
    if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('data:')) {
      return source
    }
  }

  // Direct url property
  if (source.url && typeof source.url === 'string') {
    return source.url
  }
  if (source.asset && source.asset.url && typeof source.asset.url === 'string') {
    return source.asset.url
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || DEFAULT_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || DEFAULT_DATASET

  // Image builder
  if (source && (source.asset || source._ref || typeof source === 'object')) {
    try {
      const builder = imageUrlBuilder({ projectId, dataset })
      const builtUrl = builder.image(source).auto('format').fit('max').url()
      if (builtUrl) return builtUrl
    } catch (e) {
      // Ignore builder error and try manual ref parsing
    }
  }

  // Manual ref parsing fallback
  const ref = source?.asset?._ref || source?._ref || source?.asset?._id || source?._id
  if (typeof ref === 'string') {
    const parts = ref.split('-')
    if (parts.length >= 4) {
      const format = parts.pop()
      const dimensions = parts.pop()
      const id = parts.slice(1).join('-')
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
    }
  }

  return FALLBACK_IMAGE
}

