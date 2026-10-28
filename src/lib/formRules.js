/**
 * Client-side validation rules. These mirror server/src/lib/validate.js.
 * Client checks exist for convenience only; the server re-validates
 * everything and is the authority.
 */
export const LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 30,
  vesselName: 120,
  location: 150,
  productRequirements: 3000,
  quantitySpecs: 3000,
  description: 5000,
  message: 5000,
  itemText: 300,
  itemQty: 30,
  itemUnit: 30,
  itemSpecs: 500,
  maxItems: 30,
};

export const FILE_RULES = {
  maxFiles: 5,
  maxFileBytes: 8 * 1024 * 1024, // 8 MB per file
  maxTotalBytes: 20 * 1024 * 1024, // 20 MB per submission
  accept: '.jpg,.jpeg,.png,.webp,.pdf',
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  extensions: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,30}$/;

export function validateEmail(v) {
  return EMAIL_RE.test(String(v).trim());
}

export function validatePhone(v) {
  const s = String(v).trim();
  return PHONE_RE.test(s) && (s.match(/\d/g) || []).length >= 7;
}

export function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns an error string for a list of File objects, or '' when valid. */
export function validateFiles(files, maxFiles = FILE_RULES.maxFiles) {
  if (files.length > maxFiles) return `Please attach no more than ${maxFiles} files.`;
  let total = 0;
  for (const f of files) {
    const ext = f.name.split('.').pop().toLowerCase();
    if (!FILE_RULES.extensions.includes(ext) || (f.type && !FILE_RULES.mimeTypes.includes(f.type))) {
      return `“${f.name}” is not an accepted file type. Use JPG, PNG, WebP or PDF.`;
    }
    if (f.size > FILE_RULES.maxFileBytes) {
      return `“${f.name}” is larger than ${formatBytes(FILE_RULES.maxFileBytes)}.`;
    }
    total += f.size;
  }
  if (total > FILE_RULES.maxTotalBytes) {
    return `Attachments must total no more than ${formatBytes(FILE_RULES.maxTotalBytes)}.`;
  }
  return '';
}

export function todayIso() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}
