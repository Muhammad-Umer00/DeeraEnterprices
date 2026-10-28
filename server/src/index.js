import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import submissions from './routes/submissions.js';
import { deliveryConfigured, verifyTransport } from './lib/mailer.js';
import { turnstileEnabled } from './lib/spam.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Always read server/.env, whatever directory the server is started from.
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const DIST = path.resolve(__dirname, '../../dist');
const PORT = Number(process.env.PORT || 5050);
const SERVE_STATIC = String(process.env.SERVE_STATIC || '').toLowerCase() === 'true';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', Number(process.env.TRUST_PROXY || 0));

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", 'https://challenges.cloudflare.com'],
        'frame-src': ['https://challenges.cloudflare.com'],
        'connect-src': ["'self'", 'https://challenges.cloudflare.com'],
        'img-src': ["'self'", 'data:'],
        'style-src': ["'self'", "'unsafe-inline'"],
        'font-src': ["'self'", 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'upgrade-insecure-requests': process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

// CORS is only needed if the website is hosted on a different origin.
const allowed = String(process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
if (allowed.length) {
  app.use('/api', cors({ origin: allowed, methods: ['GET', 'POST'] }));
}

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, res) => res.status(429).json({ ok: false, code: 'RATE_LIMITED' }),
});

const apiLimiter = rateLimit({ windowMs: 60 * 1000, limit: 60, standardHeaders: 'draft-7', legacyHeaders: false });

app.use('/api', apiLimiter);
app.use('/api/contact', submitLimiter);
app.use('/api/quote', submitLimiter);
app.use('/api', submissions);
app.use('/api', (_req, res) => res.status(404).json({ ok: false, code: 'NOT_FOUND' }));

// ---- Optional: serve the built website (npm run build) ----------------
if (SERVE_STATIC) {
  if (!fs.existsSync(DIST)) {
    console.warn(`SERVE_STATIC=true but ${DIST} does not exist. Run "npm run build" in the project root first.`);
  }
  app.use(
    express.static(DIST, {
      index: false,
      redirect: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=86400');
        }
      },
    }),
  );

  // Each route has its own pre-rendered HTML shell (dist/<route>/index.html)
  // with page-specific SEO tags. Unknown routes get a 404 status.
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    let decoded;
    try {
      decoded = decodeURIComponent(req.path);
    } catch {
      return res.status(400).end();
    }
    const clean = path.posix.normalize(decoded).replace(/\/+$/, '');
    if (clean.includes('..')) return res.status(400).end();
    const candidate = path.join(DIST, clean, 'index.html');
    res.setHeader('Cache-Control', 'no-cache');
    if (candidate.startsWith(DIST) && fs.existsSync(candidate)) return res.sendFile(candidate);
    const notFound = path.join(DIST, '404.html');
    if (fs.existsSync(notFound)) return res.status(404).sendFile(notFound);
    return res.status(404).send('Not found');
  });
}

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ ok: false, code: 'SERVER_ERROR' });
});

app.listen(PORT, async () => {
  console.log(`DEERA ENTERPRISES API listening on http://localhost:${PORT}`);
  console.log(`  Static site: ${SERVE_STATIC ? `serving ${DIST}` : 'not served (SERVE_STATIC is not true)'}`);
  console.log(`  Spam protection: honeypot + timing + rate limit${turnstileEnabled() ? ' + Cloudflare Turnstile' : ''}`);
  if (!deliveryConfigured()) {
    console.warn('  Email delivery: NOT CONFIGURED. Form submissions will be rejected with DELIVERY_NOT_CONFIGURED.');
    console.warn('  Set SMTP_HOST, SMTP_FROM and SUBMISSIONS_TO (and SMTP_USER/SMTP_PASS) in server/.env.');
  } else {
    try {
      await verifyTransport();
      console.log('  Email delivery: configured and SMTP connection verified.');
    } catch (e) {
      console.error(`  Email delivery: configured but SMTP verification FAILED: ${e.message}`);
    }
  }
});
