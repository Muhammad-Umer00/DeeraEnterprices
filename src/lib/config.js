// Public build-time configuration (safe to expose in the browser).
const trimSlash = (s) => String(s || '').replace(/\/+$/, '');

export const SITE_URL = trimSlash(import.meta.env.VITE_SITE_URL) || 'https://www.example.com';
export const API_BASE_URL = trimSlash(import.meta.env.VITE_API_BASE_URL);
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
