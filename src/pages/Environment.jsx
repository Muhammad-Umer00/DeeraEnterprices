import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Photo from '../components/Photo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { pageByKey } from '../data/pages.js';
import { images } from '../data/images.js';

const commitments = [
  {
    title: 'Responsible marine waste handling',
    text: 'Ship-generated waste such as sludge and garbage is collected and handled with care, using suitable equipment and methods for the type of waste.',
  },
  {
    title: 'Appropriate collection and segregation',
    text: 'Waste streams are identified at collection and kept apart where required, so that each type can be handled and disposed of appropriately.',
  },
  {
    title: 'Environmental protection',
    text: 'Collection and transfer activities are planned to prevent spills, leaks and contamination of harbour waters and port facilities.',
  },
  {
    title: 'Compliance with applicable requirements',
    text: 'Work is carried out in line with the marine pollution, port and environmental requirements that apply to each service.',
  },
  {
    title: 'Disposal through authorised channels',
    text: 'Where applicable, waste disposal is coordinated through authorised channels and facilities, with the related records provided.',
  },
];

export default function Environment() {
  return (
    <>
      <PageSeo page={pageByKey.environment} />
      <PageHero
        eyebrow="Environmental responsibility"
        title="Protecting the marine environment we work in"
        crumb="Environmental Responsibility"
        lead="Responsible waste handling is central to DEERA ENTERPRISES’ marine services. It protects harbour waters and port facilities, and helps clients meet their own obligations."
      />

      <section className="section">
        <div className="container feature-row feature-row--flush">
          <div className="feature-row__body">
            <p className="eyebrow">Our approach</p>
            <h2 className="section-heading__title">Responsibility at every stage</h2>
            <p>
              Ship-generated waste needs careful handling from the moment it is collected from the vessel until it is
              disposed of. DEERA ENTERPRISES plans each job around the type and quantity of waste, the vessel’s
              arrangements and the requirements that apply in port.
            </p>
            <p>
              This page sets out the company’s environmental commitments. It does not claim specific environmental
              outcomes or performance figures.
            </p>
          </div>
          <Photo image={images.environment} className="feature-row__photo" ratio="4 / 3" />
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="env-commit-title">
        <div className="container">
          <p className="eyebrow">Commitments</p>
          <h2 id="env-commit-title" className="section-heading__title">
            How we handle marine waste responsibly
          </h2>
          <ol className="commit-list">
            {commitments.map((c, i) => (
              <li className="commit-list__item" key={c.title}>
                <span className="commit-list__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="commit-list__title">{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Arrange marine waste collection"
        text="Tell us the vessel, the port, the type and estimated quantity of waste and the vessel’s schedule."
        primary={{ to: '/request-a-quotation?service=marine-waste-management', label: 'Request a Quotation' }}
      />
    </>
  );
}
