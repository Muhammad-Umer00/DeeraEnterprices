import multer from 'multer';

export const FILE_RULES = {
  maxFiles: 5,
  maxFileBytes: 8 * 1024 * 1024,
  maxTotalBytes: 20 * 1024 * 1024,
};

const ALLOWED = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'application/pdf': ['pdf'],
};

/**
 * Files are held in memory only (never written to disk) and forwarded as
 * email attachments. Limits are enforced while the request is streamed.
 */
export function uploader(maxFiles) {
  return multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: FILE_RULES.maxFileBytes,
      files: maxFiles,
      fields: 40,
      fieldSize: 64 * 1024,
      parts: 40 + maxFiles,
    },
    fileFilter(_req, file, cb) {
      const ext = String(file.originalname).split('.').pop().toLowerCase();
      if (!ALLOWED[file.mimetype] || !ALLOWED[file.mimetype].includes(ext)) {
        const err = new Error(`“${safeName(file.originalname)}” is not an accepted file type. Use JPG, PNG, WebP or PDF.`);
        err.code = 'FILE_TYPE';
        return cb(err);
      }
      return cb(null, true);
    },
  });
}

/** Detects the real file type from its first bytes ("magic numbers"). */
function sniff(buf) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return 'image/png';
  }
  if (buf.length >= 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    return 'image/webp';
  }
  if (buf.length >= 5 && buf.toString('ascii', 0, 5) === '%PDF-') return 'application/pdf';
  return null;
}

export function safeName(name) {
  const base = String(name || 'file')
    .normalize('NFKD')
    .replace(/[^\w.\- ]+/g, '_')
    .replace(/\s+/g, ' ')
    .replace(/^\.+/, '')
    .trim();
  return (base || 'file').slice(0, 100);
}

/** Verifies content matches the declared type and total size is acceptable. */
export function checkFiles(files = []) {
  let total = 0;
  for (const f of files) {
    total += f.size;
    const actual = sniff(f.buffer);
    if (!actual || actual !== f.mimetype) {
      return `“${safeName(f.originalname)}” does not appear to be a valid ${f.mimetype === 'application/pdf' ? 'PDF' : 'image'} file.`;
    }
  }
  if (total > FILE_RULES.maxTotalBytes) return 'Attachments exceed the 20 MB total limit.';
  return '';
}
