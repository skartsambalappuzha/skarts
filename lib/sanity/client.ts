import { createClient } from '@sanity/client'
import {
  muralPaintingsQuery,
  featuredMuralPaintingsQuery,
  muralPaintingBySlugQuery,
  galleryQuery,
  customArtQuery,
  contactQuery,
} from './queries'
import {
  fallbackMuralPaintings,
  fallbackGallery,
  fallbackCustomArt,
  fallbackContact,
} from './fallbackData'
import { MuralPainting, GalleryItem, CustomArtData, ContactData } from './types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

export async function getMuralPaintings(): Promise<MuralPainting[]> {
  if (!sanityClient) return fallbackMuralPaintings
  try {
    const data = await sanityClient.fetch(muralPaintingsQuery)
    return data && data.length > 0 ? data : fallbackMuralPaintings
  } catch (error) {
    console.warn('Sanity query error for getMuralPaintings, using fallback:', error)
    return fallbackMuralPaintings
  }
}

export async function getFeaturedMuralPaintings(): Promise<MuralPainting[]> {
  if (!sanityClient) return fallbackMuralPaintings.slice(0, 6)
  try {
    const data = await sanityClient.fetch(featuredMuralPaintingsQuery)
    return data && data.length > 0 ? data : fallbackMuralPaintings.slice(0, 6)
  } catch (error) {
    console.warn('Sanity query error for getFeaturedMuralPaintings, using fallback:', error)
    return fallbackMuralPaintings.slice(0, 6)
  }
}

export async function getMuralPaintingBySlug(slug: string): Promise<MuralPainting | null> {
  if (!sanityClient) {
    return fallbackMuralPaintings.find((p) => p.slug.current === slug) || null
  }
  try {
    const data = await sanityClient.fetch(muralPaintingBySlugQuery, { slug })
    return data || fallbackMuralPaintings.find((p) => p.slug.current === slug) || null
  } catch (error) {
    console.warn(`Sanity query error for slug ${slug}, using fallback:`, error)
    return fallbackMuralPaintings.find((p) => p.slug.current === slug) || null
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!sanityClient) return fallbackGallery
  try {
    const data = await sanityClient.fetch(galleryQuery)
    return data && data.length > 0 ? data : fallbackGallery
  } catch (error) {
    console.warn('Sanity query error for getGalleryItems, using fallback:', error)
    return fallbackGallery
  }
}

export async function getCustomArt(): Promise<CustomArtData> {
  if (!sanityClient) return fallbackCustomArt
  try {
    const data = await sanityClient.fetch(customArtQuery)
    return data || fallbackCustomArt
  } catch (error) {
    console.warn('Sanity query error for getCustomArt, using fallback:', error)
    return fallbackCustomArt
  }
}

export async function getContact(): Promise<ContactData> {
  if (!sanityClient) return fallbackContact
  try {
    const data = await sanityClient.fetch(contactQuery)
    return data || fallbackContact
  } catch (error) {
    console.warn('Sanity query error for getContact, using fallback:', error)
    return fallbackContact
  }
}
