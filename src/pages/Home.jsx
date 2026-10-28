import { Link } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import Photo from '../components/Photo.jsx';
import Icon from '../components/Icon.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { DivisionLogo } from '../components/BrandLogo.jsx';
import { pageByKey } from '../data/pages.js';
import { images } from '../data/images.js';
import { serviceGroups } from '../data/services.js';
import { marineCare } from '../data/marineCare.js';
import { site } from '../data/site.js';

const reasons = [
  {
    title: 'Experience since 2009',
    text: 'DEERA ENTERPRISES has provided marine services since 2009 and understands how port and vessel operations work in practice.',
  },
  {
    title: 'Planned around the vessel',
    text: 'Work is scheduled around the vessel’s port stay, crew availability and the requirements of the port and the vessel’s agents.',
  },
  {
    title: 'One point of contact',
    text: 'Waste handling, cleaning, vessel support and marine supplies are all available from one company and one point of contact.',
  },
  {
    title: 'Clear scope and documentation',
    text: 'Scope, method, timing and pricing are agreed before work starts. Records are provided where applicable to the service.',
  },
];

export default function Home() {
  const page = pageByKey.home;

  return (
    <>
      <PageSeo page={page} />

      <section className="hero" aria-labelledby="hero-title">
        <Photo image={images.hero} className="hero__photo" priority />
        <div className="hero__shade" aria-hidden="true" />
        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light">DEERA ENTERPRISES · Established {site.established}</p>
          <h1 id="hero-title" className="hero__title">
            Established Maritime Experience.
            <br />
            Reliable Marine Solutions.
          </h1>
          <p className="hero__lead">
            Since 2009, DEERA ENTERPRISES has been supporting maritime operations through professional marine services,
            vessel waste handling, cleaning solutions and marine supply support.
          </p>
          <div className="hero__actions">
            <Link to="/request-a-quotation" className="btn btn--light btn--lg">
              Request a Quotation
            </Link>
            <Link to="/services" className="btn btn--outline-light btn--lg">
              Our Services
            </Link>
          </div>
        </div>
        <div className="hero__strip">
          <div className="container hero__strip-inner">
            <span>Marine Waste Management</span>
            <span>Vessel Cleaning</span>
            <span>Maritime &amp; Vessel Support</span>
            <span>Marine Supplies &amp; Ship Chandling</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="About the company"
              title="A maritime services company serving vessels in port"
            />
            <p className="prose-lead">
              DEERA ENTERPRISES is a maritime services company based in Karachi, Pakistan. Since 2009 it has worked with
              shipowners, ship managers, shipping agents and marine operators. Its work covers ship waste handling,
              vessel cleaning, vessel support and, through its MARINE CARE SERVICES division, marine supplies and ship
              chandling.
            </p>
            <Link to="/about" className="text-link">
              About DEERA ENTERPRISES <Icon name="arrowRight" size={18} />
            </Link>
          </div>
          <div className="since-panel">
            <p className="since-panel__label">Established</p>
            <p className="since-panel__year">{site.established}</p>
            <p className="since-panel__text">
              Serving maritime operations since {site.established}. Owned by {site.owner}.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Core maritime services"
            id="services-title"
            lead="Four service areas, each planned around the vessel’s schedule and agreed with the client in advance."
          />
          <div className="service-grid">
            {serviceGroups.map((g) => (
              <article className="service-card" key={g.id}>
                <Photo image={images[g.image]} className="service-card__photo" ratio="16 / 10" />
                <div className="service-card__body">
                  <p className="service-card__code">{g.code}</p>
                  <h3 className="service-card__title">{g.title}</h3>
                  <p className="service-card__text">{g.short}</p>
                  <Link
                    to={g.divisionPage || `/services#${g.id}`}
                    className="text-link"
                    aria-label={`Learn more about ${g.title}`}
                  >
                    Learn more <Icon name="arrowRight" size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container feature-row">
          <Photo image={images.serviceWaste} className="feature-row__photo" ratio="4 / 3" />
          <div className="feature-row__body">
            <SectionHeading eyebrow="Ship waste management" title="Handling ship-generated waste in port" />
            <p>
              DEERA ENTERPRISES collects and handles ship sludge and ship garbage, and coordinates waste removal. Waste
              segregation, disposal coordination and the related records are provided where applicable to the service.
            </p>
            <ul className="check-list">
              <li>Ship sludge collection and handling</li>
              <li>Ship garbage collection and handling</li>
              <li>Waste removal coordination</li>
            </ul>
            <Link to="/services#marine-waste-management" className="text-link">
              Marine waste management <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
        <div className="container feature-row feature-row--reverse">
          <Photo image={images.serviceCleaning} className="feature-row__photo" ratio="4 / 3" />
          <div className="feature-row__body">
            <SectionHeading eyebrow="Vessel cleaning" title="De-mucking, de-slopping and tank cleaning" />
            <p>
              Cleaning work is scoped with the vessel’s crew and agents, so that the method and timing fit the vessel’s
              operations in port.
            </p>
            <ul className="check-list">
              <li>De-mucking services</li>
              <li>De-slopping services</li>
              <li>Ship tank cleaning and cleaning support</li>
            </ul>
            <Link to="/services#vessel-cleaning" className="text-link">
              Vessel cleaning services <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="division-band" aria-labelledby="division-title">
        <div className="container division-band__inner">
          <div className="division-band__brand">
            <DivisionLogo logo={marineCare.logo} name={marineCare.name} />
            <p className="division-band__designation">{marineCare.designation}</p>
          </div>
          <div className="division-band__body">
            <p className="eyebrow eyebrow--light">Marine Supplies &amp; Ship Chandling</p>
            <h2 id="division-title" className="division-band__title">
              MARINE CARE SERVICES: the marine supplies division of DEERA ENTERPRISES
            </h2>
            <p>
              Marine supplies, ship chandling and ship stores are handled by MARINE CARE SERVICES, a dedicated division
              of DEERA ENTERPRISES. It supplies deck stores, engine stores, marine spare parts, tools, maintenance
              materials, safety equipment and general vessel supplies.
            </p>
            <div className="division-band__actions">
              <Link to="/marine-supplies-ship-chandling" className="btn btn--light">
                Marine Supplies &amp; Ship Chandling
              </Link>
              {marineCare.website ? (
                <a href={marineCare.website} className="btn btn--outline-light" target="_blank" rel="noopener noreferrer">
                  Visit Marine Care Services <Icon name="external" size={16} />
                </a>
              ) : (
                <Link to="/marine-supplies-ship-chandling#division-contact" className="btn btn--outline-light">
                  Division Contact Details
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col-cards">
          <article className="info-card">
            <Photo image={images.quality} className="info-card__photo" ratio="16 / 9" />
            <div className="info-card__body">
              <p className="eyebrow">Quality &amp; compliance</p>
              <h2 className="info-card__title">Certified Standards. Professional Operations.</h2>
              <p>
                DEERA ENTERPRISES is committed to quality management, occupational health and safety, environmental
                responsibility and professional service delivery. The work is carried out under the company’s
                applicable management systems and operating procedures.
              </p>
              <Link to="/quality-certifications-compliance" className="text-link">
                Quality, certifications &amp; compliance <Icon name="arrowRight" size={18} />
              </Link>
            </div>
          </article>
          <article className="info-card">
            <Photo image={images.environment} className="info-card__photo" ratio="16 / 9" />
            <div className="info-card__body">
              <p className="eyebrow">Environmental responsibility</p>
              <h2 className="info-card__title">Responsible handling of marine waste</h2>
              <p>
                Appropriate collection and segregation, with disposal coordinated through authorised channels where
                applicable. This protects the marine environment and supports compliance with applicable requirements.
              </p>
              <Link to="/environmental-responsibility" className="text-link">
                Our environmental approach <Icon name="arrowRight" size={18} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="why-title">
        <div className="container">
          <SectionHeading eyebrow="Why DEERA ENTERPRISES" title="A dependable partner for marine services" id="why-title" align="center" />
          <div className="reason-grid">
            {reasons.map((r, i) => (
              <div className="reason" key={r.title}>
                <span className="reason__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="reason__title">{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Request a quotation for your next vessel call"
        text="Tell us the vessel, the port, the service needed and the required date. Specifications, pricing and timing are confirmed in the quotation."
      />
    </>
  );
}
