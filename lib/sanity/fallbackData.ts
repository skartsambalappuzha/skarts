import { MuralPainting, GalleryItem, CustomArtData, ContactData } from './types'

export const fallbackContact: ContactData = {
  _id: 'fallback-contact',
  whatsappNumber: '917356462150',
  phoneNumber: '+91 73564 62150',
  instagramUrl: 'https://www.instagram.com/sathyanskarts/',
  email: 'skartsambalappuzha@gmail.com',
  contactInformation: 'For bespoke mural artwork, canvas projects, and site consultations, connect directly via WhatsApp or Instagram.',
}

export const fallbackMuralPaintings: MuralPainting[] = []

export const fallbackGallery: GalleryItem[] = []

export const fallbackCustomArt: CustomArtData = {
  _id: 'fallback-custom-art',
  heading: 'CUSTOM ART',
  description: 'Have a specific mural painting or custom space in mind? Work directly with the artist to conceptualize, design, and create a bespoke piece tailored to your architectural dimensions and aesthetic vision.',
  processSteps: [
    {
      stepNumber: '01',
      title: 'Share Your Idea',
      description: 'Send us your space photos, dimension requirements, and reference concepts via WhatsApp.',
    },
    {
      stepNumber: '02',
      title: 'Discuss Your Requirements',
      description: 'We review wall surface conditions, palette preferences, and custom motif directions.',
    },
    {
      stepNumber: '03',
      title: 'Artwork / Concept Discussion',
      description: 'Receive conceptual sketches, color swatches, and scale proportions for your approval.',
    },
    {
      stepNumber: '04',
      title: 'Final Enquiry',
      description: 'Confirm artwork details, schedule timeline, and finalize your custom mural commission.',
    },
  ],
  whatsappEnquiryText: 'Hello, I would like to enquire about commissioned custom mural artwork for my space.',
  supportingImages: [],
}

