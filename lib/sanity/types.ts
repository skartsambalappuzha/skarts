export interface MuralPainting {
  _id: string
  paintingName: string
  slug: { current: string }
  description?: string
  size?: string
  price?: number
  priceOnRequest?: boolean
  mainArtworkImage: any
  moreImages?: any[]
  whatsappEnquiryMessage?: string
}

export interface GalleryItem {
  _id: string
  title?: string
  image: any
  description?: string
  displayOrder?: number
}

export interface ProcessStep {
  stepNumber?: string
  title: string
  description?: string
  icon?: any
}

export interface CustomArtData {
  _id?: string
  heading?: string
  description?: string
  processSteps?: ProcessStep[]
  whatsappEnquiryText?: string
  supportingImages?: any[]
}

export interface ContactData {
  _id?: string
  whatsappNumber: string
  phoneNumber?: string
  instagramUrl: string
  email?: string
  contactInformation?: string
}

export interface HeroData {
  _id?: string
  title?: string
  subtitle?: string
  heroImage?: any
  ctaText?: string
}

export interface ReviewData {
  _id: string
  reviewerName: string
  location?: string
  rating?: number
  reviewText: string
  reviewerImage?: any
  artworkImage?: any
  date?: string
  featured?: boolean
}

export interface SiteSettingsData {
  _id?: string
  orderWhatsappNumber: string
  defaultEnquiryText?: string
  contactPhoneNumber?: string
  instagramUrl?: string
  studioAddress?: string
}
