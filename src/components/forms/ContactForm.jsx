import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from './Field.jsx';
import FileInput from './FileInput.jsx';
import Turnstile from './Turnstile.jsx';
import { useSubmission } from './useSubmission.js';
import { BackendNotice, ResultMessage, SuccessPanel } from './FormStatus.jsx';
import { serviceOptions } from '../../data/services.js';
import { LIMITS, validateEmail, validatePhone } from '../../lib/formRules.js';
import { TURNSTILE_SITE_KEY } from '../../lib/config.js';

const initial = () => ({
  name: '',
  company: '',
  email: '',
  phone: '',
  vesselName: '',
  location: '',
  service: '',
  message: '',
  consent: false,
  website: '', // honeypot
});

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!validateEmail(v.email)) e.email = 'Please enter a valid email address.';
  if (v.phone.trim() && !validatePhone(v.phone)) e.phone = 'Please enter a valid phone number, including country code.';
  if (!v.message.trim()) e.message = 'Please enter your message.';
  if (!v.consent) e.consent = 'Please confirm you agree to the Privacy Policy.';
  return e;
}

const MAX_CONTACT_FILES = 3;

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const startedAt = useRef(Date.now());
  const formRef = useRef(null);
  const { backend, checkBackend, state, submit, reset } = useSubmission('/api/contact');
  const allErrors = useMemo(() => ({ ...errors, ...state.fieldErrors }), [errors, state.fieldErrors]);

  const set = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    if (TURNSTILE_SITE_KEY && !token) found.turnstile = 'Please complete the verification.';
    setErrors(found);
    if (Object.keys(found).length || fileError) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, typeof v === 'boolean' ? String(v) : v));
    fd.append('startedAt', String(startedAt.current));
    if (token) fd.append('turnstileToken', token);
    files.forEach((f) => fd.append('attachments', f));
    const ok = await submit(fd);
    if (!ok) {
      setToken('');
      setResetKey((k) => k + 1);
    }
  };

  const startOver = () => {
    setValues(initial());
    setFiles([]);
    setErrors({});
    setToken('');
    setResetKey((k) => k + 1);
    startedAt.current = Date.now();
    reset();
  };

  if (state.status === 'success') {
    return (
      <SuccessPanel title="Message sent" onReset={startOver}>
        <p>Thank you. Your message has been delivered to DEERA ENTERPRISES and the team will respond as soon as possible.</p>
      </SuccessPanel>
    );
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      <BackendNotice backend={backend} onRetry={checkBackend} />
      <p className="form__note">
        Fields marked <span className="field__req">*</span> are required.
      </p>
      <div className="form__grid">
        <Field label="Full name" name="name" required autoComplete="name" maxLength={LIMITS.name} value={values.name} onChange={set('name')} error={allErrors.name} />
        <Field label="Company" name="company" autoComplete="organization" maxLength={LIMITS.company} value={values.company} onChange={set('company')} error={allErrors.company} />
        <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={LIMITS.email} value={values.email} onChange={set('email')} error={allErrors.email} />
        <Field label="Phone or WhatsApp" name="phone" type="tel" autoComplete="tel" maxLength={LIMITS.phone} value={values.phone} onChange={set('phone')} error={allErrors.phone} />
        <Field label="Vessel name" name="vesselName" maxLength={LIMITS.vesselName} value={values.vesselName} onChange={set('vesselName')} error={allErrors.vesselName} />
        <Field label="Port or service location" name="location" maxLength={LIMITS.location} value={values.location} onChange={set('location')} error={allErrors.location} />
      </div>
      <div className="form__grid form__grid--single">
        <Field label="Subject / service" name="service" as="select" value={values.service} onChange={set('service')} error={allErrors.service}>
          <option value="">Select a topic…</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Field>
        <Field label="Message" name="message" as="textarea" rows={6} required maxLength={LIMITS.message} value={values.message} onChange={set('message')} error={allErrors.message} />
        <FileInput files={files} onChange={setFiles} error={fileError || allErrors.attachments} onError={setFileError} maxFiles={MAX_CONTACT_FILES} label="Attachment or photograph" />
      </div>

      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      <div className={`consent ${allErrors.consent ? 'field--error' : ''}`}>
        <label className="checkbox">
          <input type="checkbox" name="consent" checked={values.consent} onChange={set('consent')} aria-invalid={allErrors.consent ? true : undefined} aria-describedby={allErrors.consent ? 'contact-consent-err' : undefined} />
          <span>
            I agree that DEERA ENTERPRISES may use the information in this form to respond to my enquiry, as described in
            the{' '}
            <Link to="/privacy-policy" target="_blank" rel="noopener">
              Privacy Policy
            </Link>
            . <span className="field__req">*</span>
          </span>
        </label>
        {allErrors.consent && (
          <p id="contact-consent-err" className="field__error">
            {allErrors.consent}
          </p>
        )}
      </div>

      <Turnstile onToken={setToken} resetKey={resetKey} />
      {allErrors.turnstile && <p className="field__error">{allErrors.turnstile}</p>}

      <ResultMessage state={state} />

      <div className="form__actions">
        <button type="submit" className="btn btn--primary btn--lg" disabled={state.status === 'submitting'}>
          {state.status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
