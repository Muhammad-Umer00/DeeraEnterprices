import { Link } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Pending from '../components/Pending.jsx';
import { pageByKey } from '../data/pages.js';
import { site } from '../data/site.js';

// Update this date whenever the policy is changed.
const LAST_UPDATED = null; // e.g. '1 January 2027'

export default function Privacy() {
  const { email } = site.contact;
  return (
    <>
      <PageSeo page={pageByKey.privacy} />
      <PageHero title="Privacy Policy" lead="How DEERA ENTERPRISES handles information submitted through this website." />
      <section className="section">
        <div className="container narrow prose legal">
          <p className="legal__meta">
            Last updated: {LAST_UPDATED || <Pending label="Effective date" />}
          </p>
          <Pending block label="This policy is a template that describes how this website is built to work. Have it reviewed by a qualified legal adviser before publication." />

          <h2>1. Who we are</h2>
          <p>
            This website is operated by {site.name}, a maritime services company based in {site.location.city},{' '}
            {site.location.country}. MARINE CARE SERVICES is a division of {site.name}. References to “we”, “us” and
            “our” mean {site.name}, including its MARINE CARE SERVICES division.
          </p>

          <h2>2. Information we collect</h2>
          <p>We collect only the information you choose to give us through our contact and quotation forms:</p>
          <ul>
            <li>your name, company, email address and phone or WhatsApp number;</li>
            <li>vessel name, port or service location, required service and required date;</li>
            <li>details of your requirement, such as product descriptions, quantities and specifications;</li>
            <li>any files or photographs you choose to attach.</li>
          </ul>
          <p>
            When you use the forms, our server also processes technical information such as your IP address. This is
            used to protect the forms against spam and abuse.
          </p>

          <h2>3. How we use your information</h2>
          <p>We use the information you submit to:</p>
          <ul>
            <li>respond to your enquiry or quotation request;</li>
            <li>prepare quotations and discuss services or supplies with you;</li>
            <li>keep a record of our business correspondence;</li>
            <li>protect this website and its forms against misuse.</li>
          </ul>
          <p>We do not sell your information or use it for unrelated marketing.</p>

          <h2>4. How submissions are handled</h2>
          <p>
            Form submissions, including attachments, are sent by email to our business inbox. The website does not keep
            submissions in a database. Attachments are checked for permitted file type and size and are then forwarded;
            they are not kept on the web server. Short-lived technical records, such as rate-limiting counters, are
            kept only in temporary memory.
          </p>
          <p>
            If spam protection by Cloudflare Turnstile is enabled, a verification check is performed by Cloudflare when
            you submit a form. Fonts and other website assets are served from our own hosting.
          </p>

          <h2>5. Sharing your information</h2>
          <p>
            We share your information only where needed to respond to your request. That includes our email and
            hosting service providers, and parties directly involved in providing the service you asked for (for
            example the vessel’s agents, where needed). We may also disclose it where the law requires.
          </p>

          <h2>6. How long we keep information</h2>
          <p>
            We keep enquiry and quotation correspondence only as long as needed for the purposes described above and
            for our legal, accounting and business record-keeping obligations.{' '}
            <Pending label="Confirm the company’s retention period." />
          </p>

          <h2>7. Security</h2>
          <p>
            The website is designed to be served over encrypted HTTPS connections. Forms are validated on the server,
            and access to submissions is limited to authorised staff. No method of transmission over the internet is
            completely secure, so please do not send highly sensitive information through the forms.
          </p>

          <h2>8. Your choices and rights</h2>
          <p>
            You may ask us to access, correct or delete the personal information you have sent us, subject to our legal
            obligations. To make a request, contact us using the details below.
          </p>

          <h2>9. Cookies</h2>
          <p>
            This website does not use advertising or analytics cookies. If spam protection is enabled, the
            verification service may use strictly necessary technical data to work. If analytics are added in future,
            this policy will be updated first.
          </p>

          <h2>10. Contact</h2>
          <p>
            For privacy questions, contact {site.name} at{' '}
            {email ? <a href={`mailto:${email}`}>{email}</a> : <Pending label="Official email address" />} or through
            our <Link to="/contact">Contact page</Link>.
          </p>

          <h2>11. Changes to this policy</h2>
          <p>We may update this policy from time to time. The latest version will always be published on this page.</p>
        </div>
      </section>
    </>
  );
}
