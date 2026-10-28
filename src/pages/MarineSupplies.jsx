import { Link } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import Photo from '../components/Photo.jsx';
import Icon from '../components/Icon.jsx';
import Pending from '../components/Pending.jsx';
import ContactDetails from '../components/ContactDetails.jsx';
import { DivisionLogo } from '../components/BrandLogo.jsx';
import { pageByKey } from '../data/pages.js';
import { images } from '../data/images.js';
import { marineCare } from '../data/marineCare.js';
import { site } from '../data/site.js';

const process = [
  { title: 'Send your requisition', text: 'Share the item list, quantities, specifications or part numbers, photographs, vessel name, port and required delivery date.' },
  { title: 'Review and quotation', text: 'The division reviews the request, then confirms specifications, pricing, lead times and availability in a written quotation.' },
  { title: 'Confirmation', text: 'Once you approve the quotation, delivery is coordinated with the vessel, its agents and the relevant port parties.' },
];

function VisitButton({ className = 'btn btn--light btn--lg' }) {
  if (marineCare.website) {
    return (
      <a href={marineCare.website} className={className} target="_blank" rel="noopener noreferrer">
        Visit Marine Care Services <Icon name="external" size={18} />
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <span className="visit-pending">
      <button type="button" className={`${className} is-disabled`} disabled aria-describedby="mcs-site-pending">
        Visit Marine Care Services <Icon name="external" size={18} />
      </button>
      {site.showPendingNotices && (
        <span id="mcs-site-pending" className="visit-pending__note">
          Official website link to be supplied
        </span>
      )}
    </span>
  );
}

export default function MarineSupplies() {
  const extra = [];
  if (marineCare.offersProvisions === true) {
    extra.push({ id: 'provisions', title: 'Provisions', text: 'Provision supplies for vessels, quoted against each request.' });
  }
  if (marineCare.offersBondedStores === true) {
    extra.push({ id: 'bonded', title: 'Bonded Stores', text: 'Bonded stores, supplied in accordance with applicable customs requirements.' });
  }
  const categories = [...marineCare.categories, ...extra];
  const provisionsUnconfirmed = marineCare.offersProvisions !== true || marineCare.offersBondedStores !== true;

  return (
    <>
      <PageSeo page={pageByKey.marineSupplies} />

      <section className="mcs-hero" aria-labelledby="mcs-title">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li aria-current="page">Marine Supplies &amp; Ship Chandling</li>
            </ol>
          </nav>
          <div className="mcs-hero__grid">
            <div>
              <p className="eyebrow eyebrow--light">Marine Supplies &amp; Ship Chandling</p>
              <h1 id="mcs-title" className="mcs-hero__title">
                {marineCare.name}
                <span className="mcs-hero__designation">{marineCare.designation}</span>
              </h1>
              <p className="mcs-hero__lead">{marineCare.intro}</p>
              <div className="mcs-hero__actions">
                <VisitButton />
                <Link to="/request-a-quotation?service=marine-supplies" className="btn btn--outline-light btn--lg">
                  Request a Supply Quotation
                </Link>
              </div>
            </div>
            <div className="mcs-hero__brand">
              <div className="mcs-logo-card">
                <DivisionLogo logo={marineCare.logo} name={marineCare.name} />
              </div>
              <p className="mcs-hero__parent">
                Operated by <strong>DEERA ENTERPRISES</strong>
                <br />
                Established {site.established} · {site.location.city}, {site.location.country}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container feature-row feature-row--flush">
          <div className="feature-row__body">
            <p className="eyebrow">About the division</p>
            <h2 className="section-heading__title">Ship supply under the DEERA ENTERPRISES name</h2>
            <p>
              MARINE CARE SERVICES is the business division through which DEERA ENTERPRISES handles marine supplies,
              ship chandling and ship stores. Each supply request is handled by the division and delivered under DEERA
              ENTERPRISES.
            </p>
            <p>
              The division sources items against each vessel’s requisition. It works from item descriptions, makers’
              references, part numbers and technical specifications, and coordinates delivery with the vessel’s schedule
              in port.
            </p>
          </div>
          <Photo image={images.serviceSupplies} className="feature-row__photo" ratio="4 / 3" />
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="supply-range-title">
        <div className="container">
          <p className="eyebrow">Supply range</p>
          <h2 id="supply-range-title" className="section-heading__title">
            Marine supplies and ship stores
          </h2>
          <div className="supply-grid">
            {categories.map((c) => (
              <article className="supply-card" key={c.id}>
                <h3 className="supply-card__title">{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
          {provisionsUnconfirmed && (
            <Pending block label="Confirmation of whether provision supplies and bonded stores are offered. They are not listed until confirmed." />
          )}
          <div className="notice notice--plain">
            <Icon name="info" size={20} />
            <p>
              Items are sourced for each request, and continuous stock availability is not implied. Specifications,
              pricing, lead times and availability are confirmed in the quotation.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <p className="eyebrow">How to order</p>
          <h2 id="process-title" className="section-heading__title">
            From requisition to delivery
          </h2>
          <ol className="process">
            {process.map((p, i) => (
              <li className="process__step" key={p.title}>
                <span className="process__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="process__title">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--navy" id="division-contact" aria-labelledby="mcs-contact-title">
        <div className="container mcs-contact">
          <div>
            <p className="eyebrow eyebrow--light">Division contact</p>
            <h2 id="mcs-contact-title" className="mcs-contact__title">
              Contact {marineCare.name}
            </h2>
            <p className="mcs-contact__text">
              For marine supply, ship chandling and ship stores enquiries, contact the division directly or send a
              supply quotation request with your item list and photographs.
            </p>
            <div className="mcs-contact__actions">
              <Link to="/request-a-quotation?service=marine-supplies" className="btn btn--light">
                Marine Supply Enquiry
              </Link>
              <VisitButton className="btn btn--outline-light" />
            </div>
          </div>
          <div className="mcs-contact__card">
            <ContactDetails
              phone={marineCare.phone}
              whatsapp={marineCare.whatsapp}
              email={marineCare.email}
              labelPrefix="Marine Care Services "
            />
            <p className="mcs-contact__website">
              <span>Official website</span>
              {marineCare.website ? (
                <a href={marineCare.website} target="_blank" rel="noopener noreferrer">
                  {marineCare.website.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <Pending label="Marine Care Services website URL" />
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
