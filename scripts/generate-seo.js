/**
 * Post-build SEO step (runs after `vite build`).
 *
 * For every route in src/data/pages.js (and every news article) it writes
 * dist/<route>/index.html containing that page's title, meta description,
 * canonical URL, Open Graph/Twitter tags and JSON-LD structured data, so
 * search engines and social platforms see correct metadata without running
 * JavaScript. It also writes dist/404.html, dist/sitemap.xml and dist/robots.txt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { pages } from '../src/data/pages.js';
import { news } from '../src/data/news.js';
import { site } from '../src/data/site.js';
import { marineCare } from '../src/data/marineCare.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const env = loadEnv(process.env.NODE_ENV || 'production', root, 'VITE_');
const SITE_URL = String(env.VITE_SITE_URL || process.env.VITE_SITE_URL || 'https://www.example.com').replace(/\/+$/, '');

if (/example\.com/.test(SITE_URL)) {
  console.warn('\n[seo] WARNING: VITE_SITE_URL is not set. Canonical URLs and sitemap use the placeholder https://www.example.com.');
  console.warn('[seo] Set VITE_SITE_URL in .env to the official domain and rebuild before going live.\n');
}

const templatePath = path.join(dist, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[seo] dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf8');
const START = '<!--seo:start-->';
const END = '<!--seo:end-->';
if (!template.includes(START) || !template.includes(END)) {
  console.error('[seo] SEO markers missing from index.html.');
  process.exit(1);
}

const ogImage = fs.existsSync(path.join(dist, 'og-image.jpg')) ? `${SITE_URL}/og-image.jpg` : null;
const logoUrl = fs.existsSync(path.join(dist, site.logo.src.replace(/^\//, ''))) ? `${SITE_URL}${site.logo.src}` : null;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const urlFor = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`);

function organizationLd() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: site.name,
    url: `${SITE_URL}/`,
    foundingDate: String(site.established),
    slogan: site.tagline,
    description:
      'Maritime services company in Karachi, Pakistan, established in 2009: marine waste management, ship sludge and garbage collection, de-mucking, de-slopping, ship tank cleaning, vessel support, and marine supplies and ship chandling.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
      ...(site.location.streetAddress ? { streetAddress: site.location.streetAddress } : {}),
    },
    areaServed: { '@type': 'City', name: site.location.city },
    knowsAbout: [
      'Ship waste handling',
      'Ship sludge collection',
      'Ship garbage collection',
      'De-mucking',
      'De-slopping',
      'Ship tank cleaning',
      'Marine waste management',
      'Ship chandling',
      'Marine supplies',
    ],
    department: {
      '@type': 'Organization',
      name: marineCare.name,
      description: `${marineCare.designation}. Marine supplies, ship chandling and ship stores.`,
      ...(marineCare.website ? { url: marineCare.website } : {}),
      ...(marineCare.email ? { email: marineCare.email } : {}),
      ...(marineCare.phone ? { telephone: marineCare.phone } : {}),
    },
  };
  if (logoUrl) org.logo = logoUrl;
  if (site.contact.email) org.email = site.contact.email;
  if (site.contact.phone) org.telephone = site.contact.phone;
  const sameAs = Object.values(site.social).filter(Boolean);
  if (sameAs.length) org.sameAs = sameAs;
  return org;
}

function breadcrumbLd(page) {
  if (page.path === '/') return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: page.navLabel || page.title, item: urlFor(page.path) },
    ],
  };
}

function headFor({ title, description, pathName, noindex = false, ld = [] }) {
  const url = urlFor(pathName);
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}" />`,
    noindex ? '' : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    ogImage ? `<meta property="og:image" content="${esc(ogImage)}" />` : '',
    `<meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}" />` : '',
    ...ld.filter(Boolean).map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`),
  ];
  return tags.filter(Boolean).join('\n    ');
}

function render(head) {
  const before = template.slice(0, template.indexOf(START) + START.length);
  const after = template.slice(template.indexOf(END));
  return `${before}\n    ${head}\n    ${after}`;
}

function write(routePath, html) {
  const dir = routePath === '/' ? dist : path.join(dist, routePath.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const org = organizationLd();
const sitemapEntries = [];

for (const page of pages) {
  write(
    page.path,
    render(headFor({ title: page.title, description: page.description, pathName: page.path, ld: [org, breadcrumbLd(page)] })),
  );
  sitemapEntries.push({ loc: urlFor(page.path), changefreq: page.changefreq, priority: page.priority });
}

for (const article of news) {
  const p = `/news/${article.slug}`;
  write(
    p,
    render(
      headFor({
        title: `${article.title} | ${site.name}`,
        description: article.summary,
        pathName: p,
        ld: [
          org,
          {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            datePublished: article.date,
            publisher: { '@id': `${SITE_URL}/#organization` },
            mainEntityOfPage: urlFor(p),
          },
        ],
      }),
    ),
  );
  sitemapEntries.push({ loc: urlFor(p), changefreq: 'yearly', priority: 0.4, lastmod: article.date });
}

fs.writeFileSync(
  path.join(dist, '404.html'),
  render(headFor({ title: `Page not found | ${site.name}`, description: 'The page you requested could not be found.', pathName: '/404', noindex: true })),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) =>
      `  <url>\n    <loc>${esc(e.loc)}</loc>\n${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ''}    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

console.log(`[seo] Wrote ${pages.length + news.length} page shells, 404.html, sitemap.xml and robots.txt for ${SITE_URL}`);
