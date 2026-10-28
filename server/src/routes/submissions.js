import { Router } from 'express';
import multer from 'multer';
import { uploader, checkFiles, FILE_RULES } from '../lib/files.js';
import { validateContact, validateQuote } from '../lib/validate.js';
import { checkSpam, turnstileEnabled } from '../lib/spam.js';
import { deliveryConfigured, sendSubmission } from '../lib/mailer.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ ok: true, deliveryConfigured: deliveryConfigured(), turnstileRequired: turnstileEnabled() });
});

/** Wraps multer so its errors become clean JSON responses. */
function parseMultipart(maxFiles) {
  const upload = uploader(maxFiles).array('attachments', maxFiles);
  return (req, res, next) => {
    upload(req, res, (err) => {
      if (!err) return next();
      let message = 'One of the attachments was rejected.';
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') message = `Each file must be ${FILE_RULES.maxFileBytes / 1024 / 1024} MB or smaller.`;
        else if (err.code === 'LIMIT_FILE_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE') message = `Please attach no more than ${maxFiles} files.`;
        else message = 'The submission was too large or malformed.';
      } else if (err.code === 'FILE_TYPE') {
        message = err.message;
      } else {
        return next(err);
      }
      return res.status(400).json({ ok: false, code: 'FILE_REJECTED', message, fieldErrors: { attachments: message } });
    });
  };
}

function handler(type, validate) {
  return async (req, res, next) => {
    try {
      const body = req.body || {};
      const spam = await checkSpam(body, req.ip);
      if (spam) {
        console.info(`[${type}] submission rejected by spam check: ${spam}`);
        return res.status(400).json({ ok: false, code: 'SPAM_CHECK_FAILED' });
      }

      const { data, errors } = validate(body);
      if (Object.keys(errors).length) {
        return res.status(422).json({ ok: false, code: 'VALIDATION_FAILED', fieldErrors: errors });
      }

      const files = req.files || [];
      const fileProblem = checkFiles(files);
      if (fileProblem) {
        return res
          .status(400)
          .json({ ok: false, code: 'FILE_REJECTED', message: fileProblem, fieldErrors: { attachments: fileProblem } });
      }

      // Never pretend a submission was delivered when delivery is not configured.
      if (!deliveryConfigured()) {
        return res.status(503).json({ ok: false, code: 'DELIVERY_NOT_CONFIGURED' });
      }

      try {
        await sendSubmission(type, data, files, { submittedAt: new Date().toISOString() });
      } catch (err) {
        console.error(`[${type}] email delivery failed:`, err.message);
        return res.status(502).json({ ok: false, code: 'DELIVERY_FAILED' });
      }

      return res.json({ ok: true });
    } catch (err) {
      return next(err);
    }
  };
}

router.post('/contact', parseMultipart(3), handler('contact', validateContact));
router.post('/quote', parseMultipart(FILE_RULES.maxFiles), handler('quote', validateQuote));

export default router;
