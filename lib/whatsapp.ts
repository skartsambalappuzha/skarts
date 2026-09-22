export function buildWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '')
  const encodedMsg = message ? encodeURIComponent(message) : ''
  return `https://wa.me/${cleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ''}`
}
