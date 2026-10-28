import { Link } from 'react-router-dom';

export default function CtaBand({
  title = 'Discuss your requirement with DEERA ENTERPRISES',
  text = 'Tell us the vessel, the port and the scope of work. We will confirm availability, method, timing and pricing with you directly.',
  primary = { to: '/request-a-quotation', label: 'Request a Quotation' },
  secondary = { to: '/contact', label: 'Contact Us' },
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__text">{text}</p>
        </div>
        <div className="cta-band__actions">
          <Link to={primary.to} className="btn btn--light">
            {primary.label}
          </Link>
          {secondary && (
            <Link to={secondary.to} className="btn btn--outline-light">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
