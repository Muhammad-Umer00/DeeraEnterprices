/**
 * Central company information for DEERA ENTERPRISES.
 *
 * EDITING GUIDE
 * - Any value set to `null` is information the company has not yet supplied.
 *   The website shows a clearly marked placeholder in its place.
 * - Replace `null` with the official value (as a string) once confirmed.
 * - Do not enter details that have not been verified by the company.
 */
export const site = {
  name: 'DEERA ENTERPRISES',
  established: 2009,
  owner: 'Danish Muhammad Siddiqui',
  ownerTitle: 'Owner — DEERA ENTERPRISES',
  industry:
    'Maritime Services, Ship Waste Management, Vessel Cleaning, Ship Chandling and Marine Supplies',

  tagline: 'Established Maritime Experience. Reliable Marine Solutions.',

  location: {
    city: 'Karachi',
    country: 'Pakistan',
    countryCode: 'PK',
    // Full registered/office address — TO BE SUPPLIED
    streetAddress: null,
  },

  // Official contact details — TO BE SUPPLIED. Do not invent values.
  contact: {
    phone: null, // e.g. '+92 21 XXXXXXX'
    whatsapp: null, // international format, e.g. '+92 3XX XXXXXXX'
    email: null, // e.g. 'info@your-domain'
    officeHours: null, // e.g. 'Monday – Saturday, 09:00 – 18:00 PKT'
  },

  // Official social media profiles — TO BE SUPPLIED (leave null to hide).
  social: {
    linkedin: null,
    facebook: null,
  },

  // Brand asset slots. Place the ORIGINAL supplied logo files at these paths
  // inside /public. Until then, a text wordmark is displayed.
  logo: {
    src: '/brand/deera-enterprises-logo.png',
    alt: 'DEERA ENTERPRISES logo',
  },

  // When true, missing information is highlighted on the website with a
  // "to be supplied" marker. Set to false only once all details are complete.
  showPendingNotices: true,
};

/** Helper used by components to build a WhatsApp link from a phone number. */
export function whatsappHref(number) {
  if (!number) return null;
  const digits = String(number).replace(/[^\d]/g, '');
  return digits ? `https://wa.me/${digits}` : null;
}

export function telHref(number) {
  if (!number) return null;
  return `tel:${String(number).replace(/[^\d+]/g, '')}`;
}
