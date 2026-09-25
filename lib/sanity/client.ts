import { createClient } from '@sanity/client'
import {
  muralPaintingsQuery,
  featuredMuralPaintingsQuery,
  muralPaintingBySlugQuery,
  galleryQuery,
  customArtQuery,
  contactQuery,
  siteSettingsQuery,
  heroQuery,
} from './queries'
import {
  fallbackMuralPaintings,
  fallbackGallery,
  fallbackCustomArt,
  fallbackContact,
} from './fallbackData'
import { MuralPainting, GalleryItem, CustomArtData, ContactData, SiteSettingsData, HeroData, getSlugString } from './types'

const fallbackSiteSettings: SiteSettingsData = {
  orderWhatsappNumber: '919876543210',
  defaultEnquiryText: 'Hello! I am interested in ordering custom artwork from Sathyanskarts.',
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2dbutxu6'
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
  const decodedSlug = decodeURIComponent(slug)
  const isMatch = (p: MuralPainting) => {
    const s = getSlugString(p.slug, p.paintingName) || p._id
    const generatedSlug = p.paintingName ? p.paintingName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : ''
    return (
      s === slug ||
      s === decodedSlug ||
      generatedSlug === slug ||
      generatedSlug === decodedSlug ||
      p._id === slug ||
      p.paintingName === slug ||
      p.paintingName === decodedSlug
    )
  }

  const paintings = await getMuralPaintings()
  return paintings.find(isMatch) || null
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
  let contactData = fallbackContact
  let settingsData = fallbackSiteSettings

  if (sanityClient) {
    try {
      const [cRes, sRes] = await Promise.all([
        sanityClient.fetch(contactQuery),
        sanityClient.fetch(siteSettingsQuery),
      ])
      if (cRes) contactData = cRes
      if (sRes) settingsData = sRes
    } catch (error) {
      console.warn('Sanity query error for getContact, using fallback:', error)
    }
  }

  // If siteSettings orderWhatsappNumber is set, use it across all website components
  const activeWhatsapp = settingsData?.orderWhatsappNumber || contactData.whatsappNumber

  return {
    ...contactData,
    whatsappNumber: activeWhatsapp,
  }
}


export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (!sanityClient) return fallbackSiteSettings
  try {
    const data = await sanityClient.fetch(siteSettingsQuery)
    return data || fallbackSiteSettings
  } catch (error) {
    console.warn('Sanity query error for getSiteSettings, using fallback:', error)
    return fallbackSiteSettings
  }
}

export async function getHero(): Promise<HeroData | null> {
  if (!sanityClient) return null
  try {
    const data = await sanityClient.fetch(heroQuery)
    return data || null
  } catch (error) {
    console.warn('Sanity query error for getHero:', error)
    return null
  }
}

