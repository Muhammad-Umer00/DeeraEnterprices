import Icon from './Icon.jsx';
import Pending from './Pending.jsx';
import { telHref, whatsappHref } from '../data/site.js';

/** Phone / WhatsApp / email list with clearly marked placeholders. */
export default function ContactDetails({ phone, whatsapp, email, address, hours, labelPrefix = '' }) {
  const rows = [
    { icon: 'phone', label: 'Telephone', value: phone && <a href={telHref(phone)}>{phone}</a> },
    {
      icon: 'chat',
      label: 'WhatsApp',
      value: whatsapp && (
        <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener noreferrer">
          {whatsapp}
        </a>
      ),
    },
    { icon: 'mail', label: 'Email', value: email && <a href={`mailto:${email}`}>{email}</a> },
  ];
  if (address !== undefined) rows.push({ icon: 'pin', label: 'Address', value: address });
  if (hours !== undefined) rows.push({ icon: 'clock', label: 'Office hours', value: hours });

  return (
    <dl className="contact-details">
      {rows.map((r) => (
        <div className="contact-details__row" key={r.label}>
          <dt>
            <Icon name={r.icon} size={18} /> {r.label}
          </dt>
          <dd>{r.value || <Pending label={`${labelPrefix}${r.label.toLowerCase()}`} />}</dd>
        </div>
      ))}
    </dl>
  );
}
