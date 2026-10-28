const MIN_FILL_MS = 3000; // faster than a person can complete the form
const MAX_FILL_MS = 24 * 60 * 60 * 1000;

export function turnstileEnabled() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

/**
 * Layered spam checks:
 *  1. Honeypot field ("website") must be empty.
 *  2. The form must not be submitted implausibly fast (or with a stale/forged timestamp).
 *  3. When TURNSTILE_SECRET_KEY is set, a valid Cloudflare Turnstile token is required.
 * Rate limiting is applied separately in index.js.
 */
export async function checkSpam(body, ip) {
  if (typeof body.website === 'string' && body.website.trim() !== '') return 'honeypot';

  const started = Number(body.startedAt);
  const elapsed = Date.now() - started;
  if (!Number.isFinite(started) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return 'timing';

  if (turnstileEnabled()) {
    const token = typeof body.turnstileToken === 'string' ? body.turnstileToken : '';
    if (!token) return 'turnstile-missing';
    try {
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip || '' }),
        signal: AbortSignal.timeout(8000),
      });
      const data = await res.json();
      if (!data.success) return 'turnstile-failed';
    } catch {
      return 'turnstile-error';
    }
  }
  return null;
}
