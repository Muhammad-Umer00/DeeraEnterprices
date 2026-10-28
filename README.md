# DEERA ENTERPRISES — Corporate Website

*Established Maritime Experience. Reliable Marine Solutions.*

The corporate website for DEERA ENTERPRISES (Karachi, Pakistan, est. 2009), including its
**MARINE CARE SERVICES — A Division of DEERA ENTERPRISES** marine supplies and ship chandling page.

## Technology stack (mandatory)

| Part      | Technology                                                        |
|-----------|-------------------------------------------------------------------|
| Frontend  | React 19 + JavaScript (JSX), Vite 6, React Router 7, plain CSS    |
| Backend   | Node.js (≥ 20) + Express 5, written in JavaScript (`server/`)     |
| Email     | Nodemailer over SMTP (configured with server environment variables) |

There is no TypeScript and no other framework. To verify this at any time, run:

```bash
npm run lint:stack
```

## Project structure

```
index.html                 HTML shell (SEO block is filled in per page at build time)
vite.config.js             Vite config (proxies /api to the Express server in development)
public/
  brand/                   ← place the ORIGINAL logo files here (see README.txt inside)
  images/                  ← place the authentic maritime photographs here (see README.txt inside)
  favicon.svg              placeholder favicon. Replace it with one made from the official logo
scripts/
  generate-seo.js          post-build: per-page HTML with SEO tags, sitemap.xml, robots.txt, 404.html
  check-stack.js           fails if TypeScript or another framework is found
src/
  data/                    EDITABLE CONTENT (see "Editing content" below)
  components/              layout, header, footer and shared UI
  components/forms/        contact and quotation forms, validation, spam protection
  pages/                   the 12 pages (+ news article and 404)
  styles/                  design tokens and CSS
server/
  src/index.js             Express app: security headers, rate limits, API, optional static hosting
  src/routes/              /api/health, /api/contact, /api/quote
  src/lib/                 validation, file checks, spam checks, email delivery
  .env.example             server configuration template (secrets)
```

## Pages

| # | Page | URL |
|---|------|-----|
| 1 | Home | `/` |
| 2 | About Us | `/about` |
| 3 | Our Services | `/services` (anchors: `#marine-waste-management`, `#vessel-cleaning`, `#maritime-vessel-support`, `#marine-supplies-ship-chandling`) |
| 4 | Marine Supplies & Ship Chandling — Marine Care Services Division | `/marine-supplies-ship-chandling` |
| 5 | Quality, Certifications & Compliance | `/quality-certifications-compliance` |
| 6 | Environmental Responsibility | `/environmental-responsibility` |
| 7 | Our Leadership | `/leadership` |
| 8 | Contact Us | `/contact` |
| 9 | Request a Quotation | `/request-a-quotation` (accepts `?service=marine-supplies` etc.) |
| 10 | News & Updates | `/news` (+ `/news/<slug>` per article) |
| 11 | Privacy Policy | `/privacy-policy` |
| 12 | Terms & Conditions | `/terms-and-conditions` |

There is no Careers page, as specified.

## Installation (local development)

Requirements: Node.js 20 or newer.

```bash
npm install
npm --prefix server install
cp .env.example .env
cp server/.env.example server/.env
```

Run the frontend and the API in two terminals:

```bash
npm run dev:server   # Express API on http://localhost:5050
npm run dev          # Vite dev server on http://localhost:5173 (proxies /api)
```

## Information still to be supplied by the company

The website does **not** invent any details. Until the following are supplied, it shows clearly
marked "TO BE SUPPLIED" placeholders, or hides the item:

| Item | Where to enter it |
|------|-------------------|
| Original DEERA ENTERPRISES logo | `public/brand/deera-enterprises-logo.png` |
| Original MARINE CARE SERVICES logo | `public/brand/marine-care-services-logo.png` |
| Company telephone, WhatsApp, email, office address, office hours | `src/data/site.js` |
| Social media profiles (optional) | `src/data/site.js` → `social` |
| Marine Care Services website URL (turns on the **Visit Marine Care Services** button) | `src/data/marineCare.js` → `website` |
| Marine Care Services telephone, WhatsApp, email | `src/data/marineCare.js` |
| Whether provisions / bonded stores are offered | `src/data/marineCare.js` → `offersProvisions`, `offersBondedStores` (set to `true` only once confirmed) |
| ISO certifications actually held (no numbers or dates) | `src/data/certifications.js` → `isoCertifications` |
| Permits, licences and approvals actually held | `src/data/certifications.js` → `regulatoryApprovals` |
| Authentic maritime photographs | `public/images/` (file names in `public/images/README.txt`) |
| Owner photograph (only if provided and authorised) | `src/data/images.js` → `owner` |
| Official domain name | `.env` → `VITE_SITE_URL` |
| Privacy Policy and Terms: legal review, effective dates, retention period | `src/pages/Privacy.jsx`, `src/pages/Terms.jsx` |
| Social-sharing image (1200×630) | `public/og-image.jpg` (used automatically if present) |

When everything is complete, set `showPendingNotices: false` in `src/data/site.js` to hide any remaining markers.

## Editing content

All business content is in plain JavaScript data files in `src/data/`:

- `site.js` — company name, owner, location, contact details, logo path
- `marineCare.js` — Marine Care Services division details and supply categories
- `services.js` — service groups and the "Required service" options in the forms
- `certifications.js` — certifications and approvals (empty until confirmed)
- `news.js` — news articles (the format is documented in the file)
- `images.js` — photograph paths and alt text
- `pages.js` — page titles, meta descriptions and the navigation order

After editing, rebuild (`npm run build`) and redeploy.

## Forms and submission backend

The **Contact** and **Request a Quotation** forms post to the Express API (`/api/contact`, `/api/quote`).

**Current status: email delivery is NOT configured.** No SMTP credentials have been supplied, so:

- the forms show an "Integration pending" notice, and
- the server rejects submissions with `DELIVERY_NOT_CONFIGURED`. Nothing is sent or stored, and
  the visitor is told so and directed to the contact details.

A success message is shown only after the email server has actually accepted the message.

### Activating email delivery

In `server/.env`, set:

```
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM="DEERA ENTERPRISES Website <no-reply@your-domain>"
SUBMISSIONS_TO=enquiries@your-domain
```

Restart the server. The startup log will say `Email delivery: configured and SMTP connection verified`.
Then send one real test enquiry and one quotation request with an attachment, and confirm both arrive.

Submissions arrive by email with all fields, the supply item table and attachments. `Reply-To` is set
to the visitor's address. Nothing is stored in a database, and attachments are held in memory only.

### Security and spam protection (server side)

- Every field is validated and length-limited on the server, and control characters are stripped
- HTML in submissions is escaped in the email
- Honeypot field, plus a minimum fill time (anything faster than about 3 seconds is rejected)
- Rate limit: 5 submissions per 15 minutes per IP address, and 60 API requests per minute
- Optional **Cloudflare Turnstile**: set `VITE_TURNSTILE_SITE_KEY` (in `.env`) and
  `TURNSTILE_SECRET_KEY` (in `server/.env`)
- Uploads: JPG, PNG, WebP and PDF only. Each file is checked against both its extension/MIME type
  **and** its real file signature. Limits are 8 MB per file, 20 MB in total, 5 files (quotation)
  or 3 files (contact)
- Helmet security headers, including a Content Security Policy
- Secrets exist only in `server/.env`. Nothing secret is in the frontend bundle (`VITE_*` values are public)

## SEO

- Every page has its own title and meta description (`src/data/pages.js`)
- `npm run build` writes a static HTML file for each URL, containing its title, description,
  canonical URL, Open Graph and Twitter tags and JSON-LD structured data (an `Organization` with
  MARINE CARE SERVICES as a `department`, plus a `BreadcrumbList`). Search engines and social
  platforms therefore see correct metadata without running JavaScript
- `sitemap.xml` and `robots.txt` are generated from the same data
- Unknown URLs return a real HTTP 404
- Uses clean URLs and semantic HTML, with descriptive alt text in `src/data/images.js`
- Fonts are self-hosted, so the site makes no third-party font requests

**Before going live, set `VITE_SITE_URL` to the official domain and rebuild.** Otherwise canonical
URLs and the sitemap point to the `example.com` placeholder, and the build prints a warning.

## Production build and deployment

```bash
npm run build                 # builds dist/ and generates the SEO files
npm --prefix server install --omit=dev
npm start                     # starts Express. With SERVE_STATIC=true it serves dist/ and the API
```

Recommended setup: a single Node.js process (managed by PM2 or systemd) behind **Nginx** with a
TLS certificate (for example Let's Encrypt), using `TRUST_PROXY=1` and `NODE_ENV=production`.

Minimal Nginx site:

```nginx
server {
  listen 443 ssl http2;
  server_name www.your-domain;
  ssl_certificate     /etc/letsencrypt/live/www.your-domain/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/www.your-domain/privkey.pem;
  client_max_body_size 25m;
  location / {
    proxy_pass http://127.0.0.1:5050;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
server { listen 80; server_name www.your-domain your-domain; return 301 https://www.your-domain$request_uri; }
```

**Alternative:** host `dist/` on a static host (with a fallback to `index.html` for unknown routes), and
run the API separately. In that case set `VITE_API_BASE_URL` to the API's URL and `ALLOWED_ORIGINS`
to the website's URL.

## Pre-launch checklist

- [ ] Original logos placed in `public/brand/`; favicon and `og-image.jpg` replaced
- [ ] Authentic photographs added and their alt text updated
- [ ] All contact details entered (company and Marine Care Services)
- [ ] Marine Care Services website URL entered and the button tested
- [ ] Certifications and approvals entered (only those actually held)
- [ ] Provisions and bonded stores confirmed, or left hidden
- [ ] Privacy Policy and Terms reviewed by a legal adviser; dates filled in
- [ ] `VITE_SITE_URL` set; site rebuilt
- [ ] SMTP configured; test submissions with attachments received
- [ ] HTTPS active; `showPendingNotices` set to `false`
- [ ] `npm run lint:stack` passes
