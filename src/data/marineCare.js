/**
 * MARINE CARE SERVICES — A Division of DEERA ENTERPRISES.
 *
 * Marine Care Services is a business division of DEERA ENTERPRISES that
 * handles marine supplies, ship chandling and ship stores. It must NOT be
 * described as a sister company, subsidiary, affiliate or separately
 * incorporated entity unless that legal status is confirmed.
 *
 * Values set to `null` have not been supplied yet and are shown as
 * clearly marked placeholders on the website.
 */
export const marineCare = {
  name: 'MARINE CARE SERVICES',
  designation: 'A Division of DEERA ENTERPRISES',

  // Official website URL — TO BE SUPPLIED (e.g. 'https://www.example.com').
  // The "Visit Marine Care Services" button activates once this is set.
  website: null,

  // Official division contact details — TO BE SUPPLIED.
  phone: null,
  whatsapp: null,
  email: null,

  // Place the ORIGINAL Marine Care Services logo at this path in /public.
  logo: {
    src: '/brand/marine-care-services-logo.png',
    alt: 'MARINE CARE SERVICES logo',
  },

  intro:
    'MARINE CARE SERVICES is the dedicated marine supplies and ship chandling division of DEERA ENTERPRISES. The division handles the company’s ship supply, ship stores and marine procurement requirements for vessels, ship managers and marine operators, with every enquiry handled under the DEERA ENTERPRISES name.',

  // Core supply categories offered by the division.
  categories: [
    {
      id: 'deck-stores',
      title: 'Deck Stores',
      text: 'Deck-side consumables and stores for routine operation and upkeep of the vessel, supplied against the vessel’s requisition.',
    },
    {
      id: 'engine-stores',
      title: 'Engine Stores',
      text: 'Engine room consumables and stores sourced to the specifications, makes and quantities stated in the requisition.',
    },
    {
      id: 'spare-parts',
      title: 'Marine Spare Parts & Equipment',
      text: 'Sourcing of marine spare parts and equipment against part numbers, makers’ references and technical specifications.',
    },
    {
      id: 'tools',
      title: 'Marine Tools & Equipment',
      text: 'Hand tools, power tools and general marine equipment for onboard maintenance work.',
    },
    {
      id: 'maintenance',
      title: 'Maintenance Materials & Consumables',
      text: 'Ship maintenance materials, cleaning materials and general consumables for planned and corrective maintenance.',
    },
    {
      id: 'safety',
      title: 'Safety Equipment & PPE',
      text: 'Personal protective equipment and safety supplies for crew and onboard work activities.',
    },
    {
      id: 'general',
      title: 'General Vessel Supplies',
      text: 'General ship supplies and other approved procurement requirements, quoted individually against each request.',
    },
  ],

  // Provisions and bonded stores must only be displayed once the company
  // confirms they are offered. Set to true to display them; leave null/false
  // to keep them hidden from the public website.
  offersProvisions: null,
  offersBondedStores: null,
};
