const ABRIGO_WHATSAPP = '5547989134439';

export const getAdoptionWhatsAppUrl = (petName) => {
  const message = `Olá! Conheci ${petName || 'um dos cães'} pelo site do Abrigo Animal Joinville e gostaria de saber mais sobre a adoção.`;
  return `https://wa.me/${ABRIGO_WHATSAPP}?text=${encodeURIComponent(message)}`;
};
