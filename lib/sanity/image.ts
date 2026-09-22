import imageUrlBuilder from '@sanity/image-url'

export function urlFor(source: any): string {
  if (!source) return 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'
  if (typeof source === 'string') return source
  if (source.url) return source.url
  
  if (source.asset && source.asset._ref) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
    if (projectId) {
      try {
        const builder = imageUrlBuilder({ projectId, dataset })
        return builder.image(source).auto('format').fit('max').url()
      } catch (e) {
        const ref = source.asset._ref
        const parts = ref.split('-')
        if (parts.length >= 4) {
          const [, id, dimensions, format] = parts
          return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
        }
      }
    }
  }
  
  return 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'
}
