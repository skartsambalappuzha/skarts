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
