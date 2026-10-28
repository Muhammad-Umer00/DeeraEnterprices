/**
 * Photography slots.
 *
 * Place authentic, properly licensed maritime photographs in /public/images
 * using the file names below (WebP or JPEG, about 2000px wide for the hero
 * and 1400px for others, ideally under 350 KB each).
 *
 * Until a file exists, the site shows a plain brand-colour panel instead.
 * When you add a photo, update its `alt` text so it describes what the
 * photograph actually shows.
 */
export const images = {
  hero: {
    src: '/images/hero-port.jpg',
    alt: 'Commercial vessel alongside a port berth',
  },
  about: {
    src: '/images/about-operations.jpg',
    alt: 'DEERA ENTERPRISES team carrying out marine service work alongside a vessel',
  },
  serviceWaste: {
    src: '/images/service-waste-management.jpg',
    alt: 'Ship waste collection being carried out alongside a vessel in port',
  },
  serviceCleaning: {
    src: '/images/service-vessel-cleaning.jpg',
    alt: 'Vessel tank cleaning operation in progress',
  },
  serviceSupport: {
    src: '/images/service-vessel-support.jpg',
    alt: 'Vessel berthed at a commercial port terminal',
  },
  serviceSupplies: {
    src: '/images/service-marine-supplies.jpg',
    alt: 'Marine stores and supplies prepared for delivery to a vessel',
  },
  environment: {
    src: '/images/environment-harbour.jpg',
    alt: 'Calm harbour waters at a commercial port',
  },
  quality: {
    src: '/images/quality-operations.jpg',
    alt: 'Marine personnel wearing personal protective equipment during operations',
  },
  // Owner photograph: only add if provided and authorised.
  owner: null, // e.g. { src: '/images/leadership/danish-muhammad-siddiqui.jpg', alt: 'Danish Muhammad Siddiqui, Owner of DEERA ENTERPRISES' }
};
