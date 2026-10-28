/**
 * Server-side validation and sanitisation. This is the authority — the
 * browser's checks are a convenience only. Keep LIMITS in sync with
 * src/lib/formRules.js.
 */
export const LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 30,
  vesselName: 120,
  location: 150,
  service: 60,
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

export const SERVICES = {
  'marine-waste-management': 'Marine Waste Management',
  'vessel-cleaning': 'Vessel Cleaning Services',
  'maritime-vessel-support': 'Maritime & Vessel Support',
  'marine-supplies': 'Marine Supplies & Ship Chandling (Marine Care Services)',
  other: 'Other / General Enquiry',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,30}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Trim, normalise line endings and strip control characters. */
export function clean(value, max, { multiline = false } = {}) {
  if (typeof value !== 'string') return '';
  let s = value.replace(/\r\n?/g, '\n');
  // eslint-disable-next-line no-control-regex
  s = multiline ? s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') : s.replace(/[\u0000-\u001F\u007F]/g, ' ');
  s = s.trim();
  return s.length > max ? s.slice(0, max) : s;
}

function tooLong(raw, max) {
  return typeof raw === 'string' && raw.trim().length > max;
}

function validEmail(v) {
  return EMAIL_RE.test(v) && !/[\r\n]/.test(v);
}

function validPhone(v) {
  return PHONE_RE.test(v) && (v.match(/\d/g) || []).length >= 7;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function common(body, errors) {
  const data = {
    name: clean(body.name, LIMITS.name),
    company: clean(body.company, LIMITS.company),
    email: clean(body.email, LIMITS.email),
    phone: clean(body.phone, LIMITS.phone),
    vesselName: clean(body.vesselName, LIMITS.vesselName),
    location: clean(body.location, LIMITS.location),
    service: clean(body.service, LIMITS.service),
  };

  for (const key of ['name', 'company', 'email', 'phone', 'vesselName', 'location']) {
    if (tooLong(body[key], LIMITS[key])) errors[key] = 'This entry is too long.';
  }
  if (!data.name) errors.name = 'Please enter your name.';
  if (!data.email) errors.email = 'Please enter your email address.';
  else if (!validEmail(data.email)) errors.email = 'Please enter a valid email address.';
  if (data.service && !SERVICES[data.service]) errors.service = 'Please select a valid service.';
  if (body.consent !== 'true') errors.consent = 'Consent is required to process your request.';
  return data;
}

export function validateContact(body) {
  const errors = {};
  const data = common(body, errors);
  data.message = clean(body.message, LIMITS.message, { multiline: true });
  if (tooLong(body.message, LIMITS.message)) errors.message = 'Your message is too long.';
  if (!data.message) errors.message = 'Please enter your message.';
  if (data.phone && !validPhone(data.phone)) errors.phone = 'Please enter a valid phone number.';
  return { data, errors };
}

export function validateQuote(body) {
  const errors = {};
  const data = common(body, errors);

  data.productRequirements = clean(body.productRequirements, LIMITS.productRequirements, { multiline: true });
  data.quantitySpecs = clean(body.quantitySpecs, LIMITS.quantitySpecs, { multiline: true });
  data.description = clean(body.description, LIMITS.description, { multiline: true });
  data.requiredDate = clean(body.requiredDate, 10);

  for (const key of ['productRequirements', 'quantitySpecs', 'description']) {
    if (tooLong(body[key], LIMITS[key])) errors[key] = 'This entry is too long.';
  }
  if (!data.phone) errors.phone = 'Please enter a phone or WhatsApp number.';
  else if (!validPhone(data.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!data.location) errors.location = 'Please enter the port or service location.';
  if (!data.service) errors.service = 'Please select the required service.';
  if (!data.description) errors.description = 'Please describe the work or requirement.';
  if (data.requiredDate) {
    const d = new Date(`${data.requiredDate}T00:00:00Z`);
    if (!DATE_RE.test(data.requiredDate) || Number.isNaN(d.getTime())) errors.requiredDate = 'Please enter a valid date.';
    // Allow one day of leeway for time-zone differences.
    else if (d.getTime() < new Date(`${todayIso()}T00:00:00Z`).getTime() - 86400000) {
      errors.requiredDate = 'The required date cannot be in the past.';
    }
  }

  // Line items (marine supplies)
  data.items = [];
  if (typeof body.items === 'string' && body.items.length) {
    let parsed;
    try {
      parsed = JSON.parse(body.items);
    } catch {
      parsed = null;
    }
    if (!Array.isArray(parsed)) {
      errors.items = 'The item list could not be read.';
    } else {
      data.items = parsed.slice(0, LIMITS.maxItems).map((it) => ({
        description: clean(it?.description, LIMITS.itemText),
        quantity: clean(it?.quantity, LIMITS.itemQty),
        unit: clean(it?.unit, LIMITS.itemUnit),
        specs: clean(it?.specs, LIMITS.itemSpecs),
      })).filter((it) => it.description);
      if (parsed.length > LIMITS.maxItems) errors.items = `Please list no more than ${LIMITS.maxItems} items.`;
    }
  }
  if (data.service === 'marine-supplies' && !data.items.length && !data.productRequirements) {
    errors.items = 'Please list at least one item, or describe the products or materials required.';
  }

  return { data, errors };
}
