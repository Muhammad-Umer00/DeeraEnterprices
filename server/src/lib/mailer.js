import nodemailer from 'nodemailer';
import { SERVICES } from './validate.js';
import { safeName } from './files.js';

const REQUIRED = ['SMTP_HOST', 'SMTP_FROM', 'SUBMISSIONS_TO'];

/** Delivery counts as configured only when every required SMTP setting is present. */
export function deliveryConfigured() {
  return REQUIRED.every((k) => Boolean(process.env[k] && process.env[k].trim()));
}

let transporter;
function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || '' } : undefined,
      requireTLS: port === 587,
      tls: { minVersion: 'TLSv1.2' },
    });
  }
  return transporter;
}

export async function verifyTransport() {
  if (!deliveryConfigured()) return false;
  await getTransporter().verify();
  return true;
}

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function rowsFor(type, data) {
  const rows = [
    ['Name', data.name],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone / WhatsApp', data.phone],
    ['Vessel name', data.vesselName],
    ['Port / service location', data.location],
    ['Required service', SERVICES[data.service] || data.service],
  ];
  if (type === 'quote') {
    rows.push(
      ['Required date', data.requiredDate],
      ['Product / material requirements', data.productRequirements],
      ['Quantity & specifications', data.quantitySpecs],
      ['Description of work', data.description],
    );
  } else {
    rows.push(['Message', data.message]);
  }
  return rows.filter(([, v]) => v);
}

function itemsTable(items) {
  if (!items?.length) return { html: '', text: '' };
  const head = '<tr><th>#</th><th>Description</th><th>Qty</th><th>Unit</th><th>Specification / part no.</th></tr>';
  const body = items
    .map(
      (it, i) =>
        `<tr><td>${i + 1}</td><td>${esc(it.description)}</td><td>${esc(it.quantity)}</td><td>${esc(it.unit)}</td><td>${esc(it.specs)}</td></tr>`,
    )
    .join('');
  const text = items
    .map((it, i) => `${i + 1}. ${it.description} | Qty: ${it.quantity || '-'} ${it.unit || ''} | Spec: ${it.specs || '-'}`)
    .join('\n');
  return {
    html: `<h3 style="font-family:Arial,sans-serif;color:#0a2f24">Supply items</h3><table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;border-color:#dfe3e1">${head}${body}</table>`,
    text: `\nSUPPLY ITEMS\n${text}\n`,
  };
}

export async function sendSubmission(type, data, files, meta) {
  const label = type === 'quote' ? 'Quotation request' : 'Website enquiry';
  const svc = SERVICES[data.service] ? ` — ${SERVICES[data.service]}` : '';
  const subject = `[${label}] ${data.name}${data.company ? ` (${data.company})` : ''}${svc}`.slice(0, 200);
  const rows = rowsFor(type, data);
  const items = itemsTable(data.items);

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#1b2120">
      <h2 style="color:#0a2f24;margin:0 0 12px">${esc(label)} — DEERA ENTERPRISES website</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="vertical-align:top;font-weight:bold;color:#3f4846;white-space:nowrap">${esc(k)}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`,
          )
          .join('')}
      </table>
      ${items.html}
      <p style="color:#7b8682;font-size:12px;margin-top:20px">
        Attachments: ${files.length}. Submitted ${esc(meta.submittedAt)}. Consent to processing: given.
      </p>
    </div>`;

  const text = `${label} — DEERA ENTERPRISES website\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n${items.text}\nAttachments: ${files.length}\nSubmitted: ${meta.submittedAt}\n`;

  await getTransporter().sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SUBMISSIONS_TO.split(',').map((s) => s.trim()).filter(Boolean),
    replyTo: { name: data.name, address: data.email },
    subject,
    text,
    html,
    attachments: files.map((f) => ({
      filename: safeName(f.originalname),
      content: f.buffer,
      contentType: f.mimetype,
    })),
  });
}
