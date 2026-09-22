export const muralPaintingsQuery = `
  *[_type == "muralPainting"] | order(_createdAt desc) {
    _id,
    paintingName,
    "slug": slug.current,
    description,
    size,
    price,
    priceOnRequest,
    mainArtworkImage,
    moreImages,
    whatsappEnquiryMessage
  }
`

export const featuredMuralPaintingsQuery = `
  *[_type == "muralPainting"][0...6] | order(_createdAt desc) {
    _id,
    paintingName,
    "slug": slug.current,
    description,
    size,
    price,
    priceOnRequest,
    mainArtworkImage,
    moreImages,
    whatsappEnquiryMessage
  }
`

export const muralPaintingBySlugQuery = `
  *[_type == "muralPainting" && slug.current == $slug][0] {
    _id,
    paintingName,
    "slug": slug.current,
    description,
    size,
    price,
    priceOnRequest,
    mainArtworkImage,
    moreImages,
    whatsappEnquiryMessage
  }
`

export const galleryQuery = `
  *[_type == "gallery"] | order(displayOrder asc, _createdAt desc) {
    _id,
    title,
    image,
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
    supportingImages
  }
`

export const contactQuery = `
  *[_type == "contact"][0] {
    _id,
    whatsappNumber,
    phoneNumber,
    instagramUrl,
    contactInformation
  }
`
