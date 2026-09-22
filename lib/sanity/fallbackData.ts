import { MuralPainting, GalleryItem, CustomArtData, ContactData } from './types'

export const fallbackContact: ContactData = {
  _id: 'fallback-contact',
  whatsappNumber: '919876543210',
  phoneNumber: '+91 98765 43210',
  instagramUrl: 'https://www.instagram.com/sathyanskarts/',
  email: 'skartsambalappuzha@gmail.com',
  contactInformation: 'For bespoke mural artwork, canvas projects, and site consultations, connect directly via WhatsApp or Instagram.',
}

export const fallbackMuralPaintings: MuralPainting[] = [
  {
    _id: 'mural-1',
    paintingName: 'Traditional Heritage Canvas Mural',
    slug: { current: 'traditional-heritage-canvas-mural' },
    description: 'Intricate traditional mural artwork rendered with rich earth tones and gold accents. Hand-crafted detailing reflecting classic mural aesthetic.',
    size: '5ft x 7ft',
    price: 45000,
    priceOnRequest: false,
    mainArtworkImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    ],
    whatsappEnquiryMessage: 'Hello, I am interested in the mural painting "Traditional Heritage Canvas Mural". I would like to know more about the artwork, price and availability.',
  },
  {
    _id: 'mural-2',
    paintingName: 'Divine Motif Architectural Mural',
    slug: { current: 'divine-motif-architectural-mural' },
    description: 'A grand scale mural painting designed for sanctum walls and luxury residence living spaces. Rich pigments with authentic line stroke technique.',
    size: '6ft x 8ft',
    priceOnRequest: true,
    mainArtworkImage: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    ],
    whatsappEnquiryMessage: 'Hello, I am interested in the mural painting "Divine Motif Architectural Mural". I would like to know more about the artwork, price and availability.',
  },
  {
    _id: 'mural-3',
    paintingName: 'Classical Temple Wall Panels',
    slug: { current: 'classical-temple-wall-panels' },
    description: 'Harmonious composition featuring classical figures, natural flora, and ornamental borders. Prepared with enduring natural acrylic sealants.',
    size: '4ft x 6ft',
    price: 38000,
    priceOnRequest: false,
    mainArtworkImage: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1200&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    ],
    whatsappEnquiryMessage: 'Hello, I am interested in the mural painting "Classical Temple Wall Panels". I would like to know more about the artwork, price and availability.',
  },
  {
    _id: 'mural-4',
    paintingName: 'Earthy Clay Toned Sacred Artwork',
    slug: { current: 'earthy-clay-toned-sacred-artwork' },
    description: 'Terracotta, ochre, and warm clay hues blending traditional iconography with serene aesthetic elegance.',
    size: '5ft x 5ft',
    price: 32000,
    priceOnRequest: false,
    mainArtworkImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    ],
    whatsappEnquiryMessage: 'Hello, I am interested in the mural painting "Earthy Clay Toned Sacred Artwork". I would like to know more about the artwork, price and availability.',
  },
  {
    _id: 'mural-5',
    paintingName: 'Royal Court Procession Mural',
    slug: { current: 'royal-court-procession-mural' },
    description: 'Detailed narrative mural portraying historic motifs, traditional attire, and intricate background patterns.',
    size: '8ft x 4ft',
    priceOnRequest: true,
    mainArtworkImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    ],
    whatsappEnquiryMessage: 'Hello, I am interested in the mural painting "Royal Court Procession Mural". I would like to know more about the artwork, price and availability.',
  },
  {
    _id: 'mural-6',
    paintingName: 'Botanical & Peacock Wall Artwork',
    slug: { current: 'botanical-peacock-wall-artwork' },
    description: 'Exquisite mural blending vibrant peacock feather textures with traditional botanical artwork.',
    size: '4ft x 5ft',
    price: 29500,
    priceOnRequest: false,
    mainArtworkImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    moreImages: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    ],
    whatsappEnquiryMessage: 'Hello, I am interested in the mural painting "Botanical & Peacock Wall Artwork". I would like to know more about the artwork, price and availability.',
  }
]

export const fallbackGallery: GalleryItem[] = [
  {
    _id: 'gal-1',
    title: 'Sanctum Mural Installation',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    description: 'Custom wall mural commissioned for a private residence feature wall.',
    displayOrder: 1,
  },
  {
    _id: 'gal-2',
    title: 'Heritage Archway Detail',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',
    description: 'Precision line work and traditional pigment layering on entrance wall.',
    displayOrder: 2,
  },
  {
    _id: 'gal-3',
    title: 'Traditional Figure Studies',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1200&q=80',
    description: 'Detailed study of classic mural postures and facial expressions.',
    displayOrder: 3,
  },
  {
    _id: 'gal-4',
    title: 'Gold Accent Border Work',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    description: 'Gold leafing and hand-painted floral borders.',
    displayOrder: 4,
  },
  {
    _id: 'gal-5',
    title: 'Living Room Centrepiece Mural',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    description: 'Large-scale artwork integrated into contemporary interior spaces.',
    displayOrder: 5,
  },
  {
    _id: 'gal-6',
    title: 'Natural Pigment Shading',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Earthy ochre gradients with fine contour lining.',
    displayOrder: 6,
  }
]

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
  supportingImages: [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',
  ],
}
