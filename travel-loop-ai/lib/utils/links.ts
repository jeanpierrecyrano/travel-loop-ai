// PERCORSO: lib/utils/links.ts

// Quando ti iscriverai ai programmi di affiliazione, inserirai qui i tuoi ID
const AFFILIATE_CONFIG = {
  bookingAid: "", // es: "123456"
  gygPartnerId: "", // es: "ABCDEFG"
};

export const SmartLinks = {
  // Genera link Booking.com
  hotel: (hotelName: string, city: string) => {
    const query = encodeURIComponent(`${hotelName} ${city}`);
    const affiliateParam = AFFILIATE_CONFIG.bookingAid ? `&aid=${AFFILIATE_CONFIG.bookingAid}` : "";
    return `https://www.booking.com/searchresults.html?ss=${query}${affiliateParam}`;
  },

  // Genera link Skyscanner o Google Flights
  flight: (origin: string, destination: string) => {
    // Nota: I voli sono complessi da linkare senza date. Usiamo una ricerca generica su Skyscanner.
    const query = encodeURIComponent(`${origin} a ${destination}`);
    return `https://www.skyscanner.it/trasporti/voli?q=${query}`;
  },

  // Genera link Google Maps (perfetto per ristoranti e location)
  restaurant: (restaurantName: string, city: string) => {
    const query = encodeURIComponent(`${restaurantName} ${city}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },

  // Genera link GetYourGuide / Viator
  attraction: (attractionName: string, city: string) => {
    const query = encodeURIComponent(`${attractionName} ${city}`);
    const affiliateParam = AFFILIATE_CONFIG.gygPartnerId ? `&partner_id=${AFFILIATE_CONFIG.gygPartnerId}` : "";
    return `https://www.getyourguide.com/search?q=${query}${affiliateParam}`;
  }
};