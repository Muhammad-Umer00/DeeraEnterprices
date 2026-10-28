import { Link } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Photo from '../components/Photo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import { pageByKey } from '../data/pages.js';
import { images } from '../data/images.js';
import { serviceGroups } from '../data/services.js';
import { marineCare } from '../data/marineCare.js';

export default function Services() {
  return (
    <>
      <PageSeo page={pageByKey.services} />
      <PageHero
        eyebrow="Our services"
        title="Complete maritime services"
        crumb="Our Services"
        lead="Marine waste management, vessel cleaning, vessel support, and marine supplies and ship chandling through the MARINE CARE SERVICES division."
      >
        <nav className="jump-nav" aria-label="Service areas">
          <ul>
            {serviceGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`}>
                  <span aria-hidden="true">{g.code}</span> {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {serviceGroups.map((g, i) => (
        <section
          key={g.id}
          id={g.id}
          className={`section service-detail ${i % 2 ? 'section--tint' : ''}`}
          aria-labelledby={`${g.id}-title`}
        >
          <div className={`container feature-row feature-row--flush ${i % 2 ? 'feature-row--reverse' : ''}`}>
            <div className="feature-row__body">
              <p className="service-detail__code">Service {g.code}</p>
              <h2 id={`${g.id}-title`} className="section-heading__title">
                {g.title}
              </h2>
              {g.divisionPage && (
                <p className="division-tag">
                  {marineCare.name} <span>· {marineCare.designation}</span>
                </p>
              )}
              <p>{g.intro}</p>
              <ul className="check-list check-list--cols">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              {g.divisionPage && (
                <p className="service-detail__note">
                  Specifications, pricing, lead times and availability are confirmed at the quotation stage. Items are
                  sourced for each request; continuous stock availability is not implied.
                </p>
              )}
              <div className="service-detail__actions">
                <Link to={`/request-a-quotation?service=${g.quoteValue}`} className="btn btn--primary">
                  Enquire about {g.title}
                </Link>
                {g.divisionPage && (
                  <Link to={g.divisionPage} className="btn btn--outline">
                    Marine Care Services division <Icon name="arrowRight" size={16} />
                  </Link>
                )}
              </div>
            </div>
            <Photo image={images[g.image]} className="feature-row__photo" ratio="4 / 3" />
          </div>
        </section>
      ))}

      <CtaBand
        title="Not sure which service you need?"
        text="Describe the vessel, its location and what needs to be done. We will advise on the appropriate service and confirm the scope with you."
      />
    </>
  );
}
