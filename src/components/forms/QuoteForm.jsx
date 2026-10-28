import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from './Field.jsx';
import FileInput from './FileInput.jsx';
import Turnstile from './Turnstile.jsx';
import Icon from '../Icon.jsx';
import { useSubmission } from './useSubmission.js';
import { BackendNotice, ResultMessage, SuccessPanel } from './FormStatus.jsx';
import { serviceOptions } from '../../data/services.js';
import { LIMITS, todayIso, validateEmail, validatePhone } from '../../lib/formRules.js';
import { TURNSTILE_SITE_KEY } from '../../lib/config.js';

const emptyItem = () => ({ description: '', quantity: '', unit: '', specs: '' });

const initial = (service) => ({
  name: '',
  company: '',
  email: '',
  phone: '',
  vesselName: '',
  location: '',
  service: serviceOptions.some((o) => o.value === service) ? service : '',
  productRequirements: '',
  quantitySpecs: '',
  requiredDate: '',
  description: '',
  consent: false,
  website: '', // honeypot — must stay empty
});

function validate(v, items) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!validateEmail(v.email)) e.email = 'Please enter a valid email address.';
  if (!v.phone.trim()) e.phone = 'Please enter a phone or WhatsApp number.';
  else if (!validatePhone(v.phone)) e.phone = 'Please enter a valid phone number, including country code.';
  if (!v.location.trim()) e.location = 'Please enter the port or service location.';
  if (!v.service) e.service = 'Please select the required service.';
  if (v.requiredDate && v.requiredDate < todayIso()) e.requiredDate = 'The required date cannot be in the past.';
  if (!v.description.trim()) e.description = 'Please describe the work or requirement.';
  if (v.service === 'marine-supplies' && !items.some((it) => it.description.trim()) && !v.productRequirements.trim()) {
    e.items = 'Please list at least one item, or describe the products or materials required.';
  }
  if (!v.consent) e.consent = 'Please confirm you agree to the Privacy Policy.';
  return e;
}

export default function QuoteForm({ defaultService = '' }) {
  const [values, setValues] = useState(() => initial(defaultService));
  const [items, setItems] = useState([emptyItem()]);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const startedAt = useRef(Date.now());
  const formRef = useRef(null);
  const { backend, checkBackend, state, submit, reset } = useSubmission('/api/quote');

  const isSupplies = values.service === 'marine-supplies';
  const allErrors = useMemo(() => ({ ...errors, ...state.fieldErrors }), [errors, state.fieldErrors]);

  const set = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const setItem = (idx, key, value) => {
    setItems((list) => list.map((it, i) => (i === idx ? { ...it, [key]: value } : it)));
    if (errors.items) setErrors((er) => ({ ...er, items: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values, items);
    if (TURNSTILE_SITE_KEY && !token) found.turnstile = 'Please complete the verification.';
    setErrors(found);
    if (Object.keys(found).length || fileError) {
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
      });
      return;
    }

    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, typeof v === 'boolean' ? String(v) : v));
    const filled = isSupplies ? items.filter((it) => it.description.trim()) : [];
    fd.append('items', JSON.stringify(filled));
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
    setValues(initial(''));
    setItems([emptyItem()]);
    setFiles([]);
    setErrors({});
    setToken('');
    setResetKey((k) => k + 1);
    startedAt.current = Date.now();
    reset();
  };

  if (state.status === 'success') {
    return (
      <SuccessPanel title="Quotation request sent" onReset={startOver} resetLabel="Submit another request">
        <p>
          Thank you. Your request has been delivered to DEERA ENTERPRISES. The team will review the scope and contact
          you to confirm specifications, pricing, lead times and availability.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-describedby="quote-form-note">
      <BackendNotice backend={backend} onRetry={checkBackend} />
      <p id="quote-form-note" className="form__note">
        Fields marked <span className="field__req">*</span> are required.
      </p>

      <fieldset className="form__group">
        <legend>Your details</legend>
        <div className="form__grid">
          <Field label="Full name" name="name" required autoComplete="name" maxLength={LIMITS.name} value={values.name} onChange={set('name')} error={allErrors.name} />
          <Field label="Company" name="company" autoComplete="organization" maxLength={LIMITS.company} value={values.company} onChange={set('company')} error={allErrors.company} />
          <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={LIMITS.email} value={values.email} onChange={set('email')} error={allErrors.email} />
          <Field label="Phone or WhatsApp" name="phone" type="tel" required autoComplete="tel" maxLength={LIMITS.phone} hint="Include the country code, e.g. +92" value={values.phone} onChange={set('phone')} error={allErrors.phone} />
        </div>
      </fieldset>

      <fieldset className="form__group">
        <legend>Vessel and service</legend>
        <div className="form__grid">
          <Field label="Vessel name" name="vesselName" maxLength={LIMITS.vesselName} value={values.vesselName} onChange={set('vesselName')} error={allErrors.vesselName} />
          <Field label="Port or service location" name="location" required maxLength={LIMITS.location} value={values.location} onChange={set('location')} error={allErrors.location} />
          <Field label="Required service" name="service" as="select" required value={values.service} onChange={set('service')} error={allErrors.service}>
            <option value="">Select a service…</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Field>
          <Field label="Required date" name="requiredDate" type="date" min={todayIso()} hint="Date by which the service or supply is needed" value={values.requiredDate} onChange={set('requiredDate')} error={allErrors.requiredDate} />
        </div>
      </fieldset>

      <fieldset className="form__group">
        <legend>Requirements</legend>

        {isSupplies && (
          <div className={`items ${allErrors.items ? 'items--error' : ''}`}>
            <p className="field__label">Supply items</p>
            <p className="field__hint">
              List each item with its quantity, unit and any specification, maker’s reference or part number. Final
              specifications, pricing, lead times and availability are confirmed in the quotation.
            </p>
            <ol className="items__list">
              {items.map((it, i) => (
                <li className="items__row" key={i}>
                  <span className="items__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <label className="items__cell items__cell--desc">
                    <span className="visually-hidden">Item {i + 1} description</span>
                    <input placeholder="Item description" maxLength={LIMITS.itemText} value={it.description} onChange={(e) => setItem(i, 'description', e.target.value)} />
                  </label>
                  <label className="items__cell items__cell--qty">
                    <span className="visually-hidden">Item {i + 1} quantity</span>
                    <input placeholder="Qty" inputMode="decimal" maxLength={LIMITS.itemQty} value={it.quantity} onChange={(e) => setItem(i, 'quantity', e.target.value)} />
                  </label>
                  <label className="items__cell items__cell--unit">
                    <span className="visually-hidden">Item {i + 1} unit</span>
                    <input placeholder="Unit" maxLength={LIMITS.itemUnit} value={it.unit} onChange={(e) => setItem(i, 'unit', e.target.value)} />
                  </label>
                  <label className="items__cell items__cell--specs">
                    <span className="visually-hidden">Item {i + 1} specification or part number</span>
                    <input placeholder="Specification / part no." maxLength={LIMITS.itemSpecs} value={it.specs} onChange={(e) => setItem(i, 'specs', e.target.value)} />
                  </label>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setItems((list) => (list.length > 1 ? list.filter((_, j) => j !== i) : [emptyItem()]))}
                  >
                    <Icon name="minus" size={16} />
                    <span className="visually-hidden">Remove item {i + 1}</span>
                  </button>
                </li>
              ))}
            </ol>
            {items.length < LIMITS.maxItems && (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setItems((l) => [...l, emptyItem()])}>
                <Icon name="plus" size={16} /> Add item
              </button>
            )}
            {allErrors.items && (
              <p className="field__error" aria-invalid="true" tabIndex={-1}>
                {allErrors.items}
              </p>
            )}
          </div>
        )}

        <div className="form__grid form__grid--single">
          <Field
            label="Product or material requirements"
            name="productRequirements"
            as="textarea"
            rows={4}
            maxLength={LIMITS.productRequirements}
            hint={isSupplies ? 'Optional if the items are listed above. You can also paste a requisition here.' : 'Products, materials or equipment involved, if any'}
            value={values.productRequirements}
            onChange={set('productRequirements')}
            error={allErrors.productRequirements}
          />
          <Field
            label="Quantity and specifications"
            name="quantitySpecs"
            as="textarea"
            rows={3}
            maxLength={LIMITS.quantitySpecs}
            hint="For example estimated waste volume, tank type and capacity, or technical specifications"
            value={values.quantitySpecs}
            onChange={set('quantitySpecs')}
            error={allErrors.quantitySpecs}
          />
          <Field
            label="Description of work"
            name="description"
            as="textarea"
            rows={6}
            required
            maxLength={LIMITS.description}
            hint="Scope, vessel schedule (ETA/ETD), access arrangements and anything else we should know"
            value={values.description}
            onChange={set('description')}
            error={allErrors.description}
          />
        </div>
      </fieldset>

      <fieldset className="form__group">
        <legend>Attachments</legend>
        <FileInput
          files={files}
          onChange={setFiles}
          error={fileError || allErrors.attachments}
          onError={setFileError}
          label="Files or photographs"
        />
      </fieldset>

      {/* Honeypot: hidden from people, often filled in by bots. */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      <div className={`consent ${allErrors.consent ? 'field--error' : ''}`}>
        <label className="checkbox">
          <input type="checkbox" name="consent" checked={values.consent} onChange={set('consent')} aria-invalid={allErrors.consent ? true : undefined} aria-describedby={allErrors.consent ? 'quote-consent-err' : undefined} />
          <span>
            I agree that DEERA ENTERPRISES may use the information in this form to respond to my request, as described in
            the{' '}
            <Link to="/privacy-policy" target="_blank" rel="noopener">
              Privacy Policy
            </Link>
            . <span className="field__req">*</span>
          </span>
        </label>
        {allErrors.consent && (
          <p id="quote-consent-err" className="field__error">
            {allErrors.consent}
          </p>
        )}
      </div>

      <Turnstile onToken={setToken} resetKey={resetKey} />
      {allErrors.turnstile && <p className="field__error">{allErrors.turnstile}</p>}

      <ResultMessage state={state} />

      <div className="form__actions">
        <button type="submit" className="btn btn--primary btn--lg" disabled={state.status === 'submitting'}>
          {state.status === 'submitting' ? 'Sending…' : 'Submit Quotation Request'}
        </button>
        <p className="form__small">
          Submitting this form does not create a contract. Specifications, pricing, lead times and availability are
          confirmed in the quotation.
        </p>
      </div>
    </form>
  );
}
