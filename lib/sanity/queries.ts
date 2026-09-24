export const muralPaintingsQuery = `
  *[_type == "muralPainting"] | order(_createdAt desc) {
    _id,
    paintingName,
    slug,
    description,
    size,
    price,
    priceOnRequest,
    mainArtworkImage {
      ...,
      "url": asset->url
    },
    moreImages[] {
      ...,
      "url": asset->url
    },
    whatsappEnquiryMessage,
    material,
    technique,
    deliveryAreas,
    estimatedDeliveryTime,
    customizationOptions
  }
`

export const featuredMuralPaintingsQuery = `
  *[_type == "muralPainting"][0...6] | order(_createdAt desc) {
    _id,
    paintingName,
    slug,
    description,
    size,
    price,
    priceOnRequest,
    mainArtworkImage {
      ...,
      "url": asset->url
    },
    moreImages[] {
      ...,
      "url": asset->url
    },
    whatsappEnquiryMessage,
    material,
    technique,
    deliveryAreas,
    estimatedDeliveryTime,
    customizationOptions
  }
`

export const muralPaintingBySlugQuery = `
  *[_type == "muralPainting" && (
    slug.current == $slug || 
    slug == $slug || 
    slug.current == $rawSlug || 
    slug == $rawSlug || 
    paintingName == $slug || 
    paintingName == $rawSlug
  )][0] {
    _id,
    paintingName,
    slug,
    description,
    size,
    price,
    priceOnRequest,
    mainArtworkImage {
      ...,
      "url": asset->url
    },
    moreImages[] {
      ...,
      "url": asset->url
    },
    whatsappEnquiryMessage,
    material,
    technique,
    deliveryAreas,
    estimatedDeliveryTime,
    customizationOptions
  }
`

export const galleryQuery = `
  *[_type == "gallery"] | order(displayOrder asc, _createdAt desc) {
    _id,
    title,
    image {
      ...,
      "url": asset->url
    },
    description,
    displayOrder
  }
`

export const customArtQuery = `
  *[_type == "customArt"][0] {
    _id,
    heading,
    description,
    processSteps,
    whatsappEnquiryText,
    supportingImages[] {
      ...,
      "url": asset->url
    }
  }
`

export const contactQuery = `
  *[_type == "contact"][0] {
    _id,
    whatsappNumber,
    phoneNumber,
    address,
    email,
    instagramUrl,
    contactInformation
  }
`

export const heroQuery = `
  *[_type == "hero"][0] {
    _id,
    title,
    subtitle,
    heroImage {
      ...,
      "url": asset->url
    },
    ctaText
  }
`

export const reviewsQuery = `
  *[_type == "review"] | order(_createdAt desc) {
    _id,
    reviewerName,
    location,
    rating,
    reviewText,
    reviewerImage {
      ...,
      "url": asset->url
    },
    artworkImage {
      ...,
      "url": asset->url
    },
    date,
    featured
  }
`
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    orderWhatsappNumber,
    defaultEnquiryText,
    contactPhoneNumber,
    instagramUrl,
    studioAddress
  }
`

