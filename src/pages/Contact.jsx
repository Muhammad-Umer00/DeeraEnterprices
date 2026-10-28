import { Link } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import ContactDetails from '../components/ContactDetails.jsx';
import ContactForm from '../components/forms/ContactForm.jsx';
import Icon from '../components/Icon.jsx';
import { pageByKey } from '../data/pages.js';
import { site } from '../data/site.js';
import { marineCare } from '../data/marineCare.js';

export default function Contact() {
  const { phone, whatsapp, email, officeHours } = site.contact;

  return (
    <>
      <PageSeo page={pageByKey.contact} />
      <PageHero
        eyebrow="Contact us"
        title="Contact DEERA ENTERPRISES"
        crumb="Contact Us"
        lead="For marine services, waste handling, vessel cleaning and general enquiries. For a priced proposal, use the quotation request form."
      />

      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-aside" aria-labelledby="contact-details-title">
            <h2 id="contact-details-title" className="contact-aside__title">
              {site.name}
            </h2>
            <ContactDetails
              phone={phone}
              whatsapp={whatsapp}
              email={email}
              address={site.location.streetAddress || null}
              hours={officeHours || null}
            />
            <p className="contact-aside__city">
              {site.location.city}, {site.location.country}
            </p>

            <div className="contact-aside__division">
              <p className="eyebrow">Marine supplies &amp; ship chandling</p>
              <p>
                <strong>{marineCare.name}</strong>
                <br />
                {marineCare.designation}
              </p>
              <Link to="/marine-supplies-ship-chandling#division-contact" className="text-link">
                Division contact details <Icon name="arrowRight" size={18} />
              </Link>
            </div>

            <div className="contact-aside__quote">
              <p>Need a priced proposal for a vessel?</p>
              <Link to="/request-a-quotation" className="btn btn--primary">
                Request a Quotation
              </Link>
            </div>
          </aside>

          <div className="contact-main">
            <h2 className="section-heading__title">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
