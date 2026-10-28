import { useSearchParams } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import QuoteForm from '../components/forms/QuoteForm.jsx';
import { pageByKey } from '../data/pages.js';

const tips = [
  'Vessel name, type and expected time of arrival and departure',
  'Port, berth or anchorage where the service is required',
  'For waste: type and estimated quantity',
  'For cleaning: tanks or spaces, condition and access',
  'For supplies: item list, quantities, specifications or part numbers, and photographs',
];

export default function Quote() {
  const [params] = useSearchParams();
  const service = params.get('service') || '';

  return (
    <>
      <PageSeo page={pageByKey.quote} />
      <PageHero
        eyebrow="Request a quotation"
        title="Request a Quotation"
        lead="Tell us about the vessel, location and requirement. We will review the scope and come back to you to confirm specifications, pricing, lead times and availability."
      />

      <section className="section">
        <div className="container quote-layout">
          <div className="quote-main">
            <QuoteForm key={service} defaultService={service} />
          </div>
          <aside className="quote-aside" aria-labelledby="quote-tips-title">
            <h2 id="quote-tips-title" className="quote-aside__title">
              Helpful information to include
            </h2>
            <ul className="check-list">
              {tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="form__small">
              A quotation request is not a confirmed order. Work and supplies are confirmed only after you accept a
              written quotation.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
