import { Link } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Photo from '../components/Photo.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import { pageByKey } from '../data/pages.js';
import { images } from '../data/images.js';
import { marineCare } from '../data/marineCare.js';
import { site } from '../data/site.js';

const values = [
  { title: 'Reliability', text: 'Doing what was agreed, when it was agreed, and keeping clients informed throughout.' },
  { title: 'Safety', text: 'Planning and carrying out work so that people, vessels and port facilities are protected.' },
  { title: 'Responsibility', text: 'Handling marine waste with care for the environment and in line with applicable requirements.' },
  { title: 'Integrity', text: 'Clear scopes, honest communication and transparent quotations.' },
  { title: 'Professionalism', text: 'Coordinated, well-organised service that works within port and vessel procedures.' },
];

const focus = [
  'Shipowners and ship management companies',
  'Shipping agents',
  'Commercial vessels',
  'Port and terminal operators',
  'Marine contractors',
  'Industrial clients',
];

export default function About() {
  return (
    <>
      <PageSeo page={pageByKey.about} />
      <PageHero
        eyebrow={`Established ${site.established}`}
        title="About DEERA ENTERPRISES"
        crumb="About Us"
        lead="An established maritime services company in Karachi, Pakistan, supporting vessels and marine operations since 2009."
      />

      <section className="section">
        <div className="container feature-row feature-row--flush">
          <div className="feature-row__body">
            <SectionHeading eyebrow="Company overview" title="Maritime services, delivered with care" />
            <p>
              DEERA ENTERPRISES provides marine services to vessels and the organisations that operate them. The company
              collects and handles ship-generated waste, carries out vessel and tank cleaning, supports vessel operations
              in port and, through its MARINE CARE SERVICES division, supplies marine stores and handles ship chandling.
            </p>
            <p>
              The company is owned by {site.owner} and is based in {site.location.city}, {site.location.country}.
            </p>
          </div>
          <Photo image={images.about} className="feature-row__photo" ratio="4 / 3" />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container narrow">
          <SectionHeading eyebrow="History" title="Experience built since 2009" />
          <p>
            DEERA ENTERPRISES has served the maritime sector since it was established in {site.established}. Over that
            time it has built working experience of vessel operations in port, of the coordination port services need,
            and of what shipowners, managers and agents expect from a service provider.
          </p>
          <p>
            As client needs grew, the company set up MARINE CARE SERVICES as a dedicated division to handle marine
            supplies, ship chandling and ship stores within DEERA ENTERPRISES.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container mv-grid">
          <article className="mv-card">
            <p className="eyebrow">Our mission</p>
            <h2 className="mv-card__title">Dependable marine services, carried out responsibly</h2>
            <p>
              To support maritime operations with dependable marine services, responsible waste handling, effective
              cleaning and well-coordinated marine supply, carried out safely and professionally.
            </p>
          </article>
          <article className="mv-card mv-card--dark">
            <p className="eyebrow eyebrow--light">Our vision</p>
            <h2 className="mv-card__title">A trusted name in marine services</h2>
            <p>
              To be recognised by shipowners, managers and agents as a trusted, professional and responsible maritime
              services company.
            </p>
          </article>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading eyebrow="Core values" title="What guides our work" id="values-title" />
          <div className="values-grid">
            {values.map((v) => (
              <div className="value" key={v.title}>
                <h3 className="value__title">{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <div>
            <SectionHeading eyebrow="Maritime industry focus" title="Who we work with" />
            <ul className="check-list check-list--cols">
              {focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Service reliability" title="How we work" />
            <p>
              Every job starts with a clear understanding of the vessel, its location, its schedule and the scope
              required. Method, timing, pricing and responsibilities are agreed in advance, and the work is coordinated
              with the vessel’s crew and agents and with the relevant port parties.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container commit-grid">
          <article className="commit">
            <h2 className="commit__title">Quality and safety commitment</h2>
            <p>
              DEERA ENTERPRISES is committed to quality management and to occupational health and safety. The company
              follows its applicable management systems and operating procedures, and expects its people to work safely
              and to the agreed scope.
            </p>
            <Link to="/quality-certifications-compliance" className="text-link">
              Quality, certifications &amp; compliance <Icon name="arrowRight" size={18} />
            </Link>
          </article>
          <article className="commit">
            <h2 className="commit__title">Environmental responsibility</h2>
            <p>
              Marine waste is handled with appropriate collection and segregation practices. Disposal is coordinated
              through authorised channels where applicable, in line with the requirements that apply to each service.
            </p>
            <Link to="/environmental-responsibility" className="text-link">
              Environmental responsibility <Icon name="arrowRight" size={18} />
            </Link>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container division-inline">
          <div>
            <p className="eyebrow">Our division</p>
            <h2 className="section-heading__title">
              {marineCare.name}
              <span className="division-inline__designation">{marineCare.designation}</span>
            </h2>
            <p>
              MARINE CARE SERVICES is the dedicated division of DEERA ENTERPRISES for marine supplies, ship chandling
              and ship stores. It handles deck and engine stores, marine spare parts and equipment, maintenance
              materials and consumables, and general vessel supply requirements.
            </p>
          </div>
          <Link to="/marine-supplies-ship-chandling" className="btn btn--primary">
            Marine Supplies &amp; Ship Chandling
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
