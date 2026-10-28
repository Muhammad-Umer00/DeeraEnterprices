import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Photo from '../components/Photo.jsx';
import Pending from '../components/Pending.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { pageByKey } from '../data/pages.js';
import { images } from '../data/images.js';
import { certifications } from '../data/certifications.js';

const practices = [
  {
    title: 'Port requirements',
    text: 'Marine services in port are carried out in line with the port’s operating procedures and the instructions of the relevant port and terminal authorities. Access, timing and work permissions are coordinated with the vessel’s agents before work starts.',
  },
  {
    title: 'Marine waste regulations',
    text: 'Ship-generated waste is subject to marine pollution rules and to local requirements on how it is collected, transported and disposed of. Waste is handled according to its type, and disposal is coordinated through authorised channels where applicable.',
  },
  {
    title: 'Safety procedures',
    text: 'Work is planned with attention to occupational health and safety. That includes using appropriate personal protective equipment, keeping to the vessel’s own safety procedures and permit-to-work arrangements, and communicating clearly with the crew.',
  },
  {
    title: 'Environmental controls',
    text: 'Collection and transfer activities are planned to prevent spills and contamination. Waste is segregated where required and documented where applicable to the service.',
  },
];

function CertList({ items, kind }) {
  if (!items.length) return null;
  return (
    <ul className="cert-list">
      {items.map((c) => (
        <li className="cert" key={`${kind}-${c.title}-${c.standard || c.authority || ''}`}>
          {c.standard && <p className="cert__standard">{c.standard}</p>}
          <h4 className="cert__title">{c.title}</h4>
          {c.authority && <p className="cert__meta">Issued by {c.authority}</p>}
          {c.scope && <p className="cert__meta">{c.scope}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function Quality() {
  const { isoCertifications, regulatoryApprovals } = certifications;

  return (
    <>
      <PageSeo page={pageByKey.quality} />
      <PageHero
        eyebrow="Quality, certifications & compliance"
        title="Certified Standards. Professional Operations."
        crumb="Quality, Certifications & Compliance"
        lead="DEERA ENTERPRISES is committed to quality management, environmental responsibility, occupational health and safety, and professional maritime service delivery through its applicable certified management systems and operational procedures."
      />

      <section className="section">
        <div className="container feature-row feature-row--flush">
          <div className="feature-row__body">
            <p className="eyebrow">Our commitment</p>
            <h2 className="section-heading__title">Quality, health, safety and environment</h2>
            <p>
              Quality and safety are part of how every job is planned and carried out. Each service is scoped in
              advance, carried out by people who understand the work, and coordinated with the vessel and the relevant
              port parties.
            </p>
            <ul className="check-list">
              <li>Quality management in service planning and delivery</li>
              <li>Occupational health and safety in all work activities</li>
              <li>Environmental responsibility in marine waste handling</li>
              <li>Professional, documented service delivery where applicable</li>
            </ul>
          </div>
          <Photo image={images.quality} className="feature-row__photo" ratio="4 / 3" />
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="certs-title">
        <div className="container">
          <p className="eyebrow">Certifications &amp; approvals</p>
          <h2 id="certs-title" className="section-heading__title">
            Management-system certifications and regulatory approvals
          </h2>
          <p className="section-heading__lead">
            Certifications of management systems (such as ISO standards) and statutory permits, licences and regulatory
            approvals are different things, so they are listed separately below.
          </p>

          <div className="cert-columns">
            <div className="cert-column">
              <h3 className="cert-column__title">ISO management-system certifications</h3>
              <p className="cert-column__desc">
                Voluntary certifications awarded by an accredited certification body, confirming that a management
                system meets a recognised standard.
              </p>
              <CertList items={isoCertifications} kind="iso" />
              {!isoCertifications.length && (
                <Pending block label="Details of the ISO management-system certifications DEERA ENTERPRISES holds. None are displayed until confirmed by the company." />
              )}
            </div>
            <div className="cert-column">
              <h3 className="cert-column__title">Statutory permits, licences &amp; approvals</h3>
              <p className="cert-column__desc">
                Authorisations issued by government, port or environmental authorities that allow specific activities,
                such as handling, transporting or disposing of marine waste.
              </p>
              <CertList items={regulatoryApprovals} kind="reg" />
              {!regulatoryApprovals.length && (
                <Pending block label="Details of the port permits, waste-handling authorisations and environmental approvals DEERA ENTERPRISES holds. None are displayed until confirmed by the company." />
              )}
            </div>
          </div>
          <p className="form__small">
            Certificate details can be provided to clients on request as part of the procurement or vendor approval
            process.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="practice-title">
        <div className="container">
          <p className="eyebrow">Compliance in practice</p>
          <h2 id="practice-title" className="section-heading__title">
            How requirements apply to our work
          </h2>
          <div className="practice-grid">
            {practices.map((p) => (
              <article className="practice" key={p.title}>
                <h3 className="practice__title">{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Vendor registration or compliance documentation?"
        text="If your organisation needs company documentation as part of supplier approval, contact DEERA ENTERPRISES directly."
        primary={{ to: '/contact', label: 'Contact Us' }}
        secondary={{ to: '/request-a-quotation', label: 'Request a Quotation' }}
      />
    </>
  );
}
