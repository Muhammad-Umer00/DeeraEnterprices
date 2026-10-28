import { Link } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Pending from '../components/Pending.jsx';
import { pageByKey } from '../data/pages.js';
import { site } from '../data/site.js';

const LAST_UPDATED = null; // e.g. '1 January 2027'

export default function Terms() {
  return (
    <>
      <PageSeo page={pageByKey.terms} />
      <PageHero title="Terms & Conditions" lead="The terms governing your use of this website." />
      <section className="section">
        <div className="container narrow prose legal">
          <p className="legal__meta">
            Last updated: {LAST_UPDATED || <Pending label="Effective date" />}
          </p>
          <Pending block label="These terms are a template. Have them reviewed by a qualified legal adviser before publication. They cover website use only, not the company’s commercial terms of service or supply." />

          <h2>1. About these terms</h2>
          <p>
            This website is operated by {site.name}, {site.location.city}, {site.location.country}, including its
            MARINE CARE SERVICES division. By using this website you agree to these terms. If you do not agree, please
            do not use the website.
          </p>

          <h2>2. Website information</h2>
          <p>
            The content of this website is general information about {site.name} and its services. We aim to keep it
            accurate and up to date, but it does not amount to an offer, a binding commitment or professional advice.
            Services, supply items, specifications, availability and pricing may change without notice.
          </p>

          <h2>3. Enquiries and quotations</h2>
          <p>
            Sending an enquiry or quotation request through this website does not create a contract. A contract for
            services or supplies is formed only when we issue a written quotation and you accept it, on the terms set
            out in that quotation. Specifications, pricing, lead times and availability are confirmed only in the
            quotation. We do not guarantee continuous stock availability.
          </p>

          <h2>4. Your responsibilities</h2>
          <p>When using this website you agree:</p>
          <ul>
            <li>to provide accurate information in any form you submit;</li>
            <li>not to upload files containing malware or material you do not have the right to share;</li>
            <li>not to try to disrupt, overload or gain unauthorised access to the website or its systems;</li>
            <li>not to use the forms to send unsolicited marketing or automated submissions.</li>
          </ul>

          <h2>5. Intellectual property</h2>
          <p>
            The {site.name} and MARINE CARE SERVICES names, logos, text, photographs and design of this website belong
            to {site.name} or are used with permission. They may not be copied or reused without prior written consent.
          </p>

          <h2>6. Links to other websites</h2>
          <p>
            This website may link to other websites, including the official MARINE CARE SERVICES website. We are not
            responsible for the content or availability of websites we do not control.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            As far as the law allows, {site.name} is not liable for any loss arising from the use of, or reliance on,
            this website or its content. Nothing in these terms limits liability that cannot be limited under
            applicable law.
          </p>

          <h2>8. Privacy</h2>
          <p>
            Information you submit through this website is handled in line with our{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These terms are governed by the laws of Pakistan.{' '}
            <Pending label="Confirm governing law and jurisdiction with your legal adviser." />
          </p>

          <h2>10. Changes</h2>
          <p>We may update these terms from time to time. The latest version will always be published on this page.</p>
        </div>
      </section>
    </>
  );
}
