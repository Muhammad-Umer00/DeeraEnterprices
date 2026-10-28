import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | DEERA ENTERPRISES" description="The page you requested could not be found." noindex />
      <section className="section not-found">
        <div className="container narrow">
          <p className="eyebrow">Error 404</p>
          <h1 className="section-heading__title">Page not found</h1>
          <p>The page you are looking for does not exist or has moved.</p>
          <div className="hero__actions">
            <Link to="/" className="btn btn--primary">
              Go to the home page
            </Link>
            <Link to="/contact" className="btn btn--outline">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
