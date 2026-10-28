/**
 * Page metadata used by BOTH the React app (runtime <head> updates) and the
 * build script (scripts/generate-seo.js), which writes a static HTML file per
 * route with the correct title, description, canonical URL and social tags,
 * plus sitemap.xml and robots.txt.
 *
 * Keep this file free of JSX and browser-only code so Node can import it.
 */
export const pages = [
  {
    key: 'home',
    path: '/',
    navLabel: 'Home',
    title: 'DEERA ENTERPRISES | Maritime Services Karachi, Pakistan — Since 2009',
    description:
      'DEERA ENTERPRISES provides maritime services in Karachi, Pakistan since 2009: ship waste handling, sludge and garbage collection, de-mucking, de-slopping, tank cleaning and marine supplies.',
    priority: 1.0,
    changefreq: 'monthly',
  },
  {
    key: 'about',
    path: '/about',
    navLabel: 'About',
    title: 'About Us | DEERA ENTERPRISES — Maritime Services Since 2009',
    description:
      'An established maritime services company in Karachi, Pakistan operating since 2009. Read about our mission, values, quality and safety commitment and our Marine Care Services division.',
    priority: 0.8,
    changefreq: 'yearly',
  },
  {
    key: 'services',
    path: '/services',
    navLabel: 'Services',
    title: 'Marine Services Pakistan | Waste Management & Vessel Cleaning | DEERA ENTERPRISES',
    description:
      'Marine waste management, ship sludge and garbage collection, de-mucking, de-slopping, ship tank cleaning, vessel support and ship chandling from DEERA ENTERPRISES, Karachi.',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    key: 'marineSupplies',
    path: '/marine-supplies-ship-chandling',
    navLabel: 'Marine Supplies',
    title: 'Ship Chandling & Marine Supplies Karachi | Marine Care Services — A Division of DEERA ENTERPRISES',
    description:
      'MARINE CARE SERVICES, a division of DEERA ENTERPRISES, supplies deck stores, engine stores, marine spare parts, tools, PPE and general ship supplies in Karachi.',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    key: 'quality',
    path: '/quality-certifications-compliance',
    navLabel: 'Quality & Compliance',
    title: 'Quality, Certifications & Compliance | DEERA ENTERPRISES',
    description:
      'How DEERA ENTERPRISES approaches quality management, occupational health and safety, port requirements and marine waste regulations.',
    priority: 0.7,
    changefreq: 'yearly',
  },
  {
    key: 'environment',
    path: '/environmental-responsibility',
    navLabel: 'Environment',
    title: 'Environmental Responsibility | Marine Waste Management | DEERA ENTERPRISES',
    description:
      'Responsible marine waste handling, collection and segregation practices and disposal coordinated through authorised channels by DEERA ENTERPRISES, Karachi.',
    priority: 0.7,
    changefreq: 'yearly',
  },
  {
    key: 'leadership',
    path: '/leadership',
    navLabel: 'Leadership',
    title: 'Our Leadership | Danish Muhammad Siddiqui | DEERA ENTERPRISES',
    description:
      'Danish Muhammad Siddiqui is the owner of DEERA ENTERPRISES, an established maritime services company in Karachi operating since 2009.',
    priority: 0.6,
    changefreq: 'yearly',
  },
  {
    key: 'news',
    path: '/news',
    navLabel: 'News',
    title: 'News & Updates | DEERA ENTERPRISES',
    description: 'Announcements and updates from DEERA ENTERPRISES and its Marine Care Services division.',
    priority: 0.5,
    changefreq: 'weekly',
  },
  {
    key: 'contact',
    path: '/contact',
    navLabel: 'Contact',
    title: 'Contact Us | DEERA ENTERPRISES — Karachi, Pakistan',
    description:
      'Contact DEERA ENTERPRISES in Karachi, Pakistan for marine services, ship waste handling, vessel cleaning and marine supply enquiries.',
    priority: 0.8,
    changefreq: 'yearly',
  },
  {
    key: 'quote',
    path: '/request-a-quotation',
    navLabel: 'Request a Quotation',
    title: 'Request a Quotation | Marine Services & Ship Supplies | DEERA ENTERPRISES',
    description:
      'Request a quotation from DEERA ENTERPRISES for marine waste management, vessel cleaning, vessel support or marine supplies and ship chandling.',
    priority: 0.8,
    changefreq: 'yearly',
  },
  {
    key: 'privacy',
    path: '/privacy-policy',
    navLabel: 'Privacy Policy',
    title: 'Privacy Policy | DEERA ENTERPRISES',
    description: 'How DEERA ENTERPRISES collects, uses and protects information submitted through this website.',
    priority: 0.3,
    changefreq: 'yearly',
  },
  {
    key: 'terms',
    path: '/terms-and-conditions',
    navLabel: 'Terms & Conditions',
    title: 'Terms & Conditions | DEERA ENTERPRISES',
    description: 'Terms and conditions governing the use of the DEERA ENTERPRISES website.',
    priority: 0.3,
    changefreq: 'yearly',
  },
];

export const pageByKey = Object.fromEntries(pages.map((p) => [p.key, p]));

/** Main navigation order (the quotation link is shown as a button). */
export const mainNav = ['about', 'services', 'marineSupplies', 'quality', 'environment', 'leadership', 'news', 'contact'];
