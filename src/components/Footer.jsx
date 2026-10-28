import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';
import Pending from './Pending.jsx';
import { site, telHref, whatsappHref } from '../data/site.js';
import { marineCare } from '../data/marineCare.js';
import { pageByKey } from '../data/pages.js';

const companyLinks = [
  { key: 'about', label: 'About Us' },
  { key: 'leadership', label: 'Our Leadership' },
  { key: 'quality', label: 'Quality & Compliance' },
  { key: 'environment', label: 'Environmental Responsibility' },
  { key: 'news', label: 'News & Updates' },
];
const serviceLinks = [
  { to: '/services#marine-waste-management', label: 'Marine Waste Management' },
  { to: '/services#vessel-cleaning', label: 'Vessel Cleaning Services' },
  { to: '/services#maritime-vessel-support', label: 'Maritime & Vessel Support' },
  { to: '/marine-supplies-ship-chandling', label: 'Marine Supplies & Ship Chandling' },
];

export default function Footer() {
  const { phone, whatsapp, email } = site.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer__cta">
        <div>
          <p className="eyebrow eyebrow--light">Enquiries</p>
          <p className="footer__cta-title">Planning a vessel call or a supply requirement?</p>
        </div>
        <Link to="/request-a-quotation" className="btn btn--light">
          Request a Quotation
        </Link>
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand-logo brand-logo--footer" aria-label={`${site.name}, home page`}>
            <BrandLogo variant="onDark" />
          </Link>
          <p className="footer__tagline">{site.tagline}</p>
          <p className="footer__small">
            A maritime services company established in {site.established}, based in {site.location.city},{' '}
            {site.location.country}.
          </p>
        </div>

        <nav aria-label="Company">
          <h2 className="footer__heading">Company</h2>
          <ul className="footer__list">
            {companyLinks.map((l) => (
              <li key={l.key}>
                <Link to={pageByKey[l.key].path}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="footer__heading">Services</h2>
          <ul className="footer__list">
            {serviceLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="footer__division">
            <strong>{marineCare.name}</strong>
            <br />
            {marineCare.designation}
          </p>
        </nav>

        <div>
          <h2 className="footer__heading">Contact</h2>
          <ul className="footer__list footer__contact">
            <li>
              {site.location.streetAddress || `${site.location.city}, ${site.location.country}`}
              {!site.location.streetAddress && (
                <>
                  <br />
                  <Pending label="Office address" />
                </>
              )}
            </li>
            <li>{phone ? <a href={telHref(phone)}>{phone}</a> : <Pending label="Telephone" />}</li>
            <li>
              {whatsapp ? (
                <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener noreferrer">
                  WhatsApp {whatsapp}
                </a>
              ) : (
                <Pending label="WhatsApp" />
              )}
            </li>
            <li>{email ? <a href={`mailto:${email}`}>{email}</a> : <Pending label="Email" />}</li>
          </ul>
          <Link to="/contact" className="footer__link-strong">
            Contact page
          </Link>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
