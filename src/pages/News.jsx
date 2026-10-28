import { Link } from 'react-router-dom';
import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Photo from '../components/Photo.jsx';
import Icon from '../components/Icon.jsx';
import { pageByKey } from '../data/pages.js';
import { news } from '../data/news.js';

export function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function News() {
  return (
    <>
      <PageSeo page={pageByKey.news} />
      <PageHero
        eyebrow="News & updates"
        title="News & Updates"
        lead="Announcements from DEERA ENTERPRISES and its MARINE CARE SERVICES division."
      />

      <section className="section">
        <div className="container">
          {news.length === 0 ? (
            <div className="empty-state">
              <h2 className="empty-state__title">No updates published yet</h2>
              <p>Company news and announcements will be published here.</p>
              <Link to="/contact" className="text-link">
                Contact DEERA ENTERPRISES <Icon name="arrowRight" size={18} />
              </Link>
            </div>
          ) : (
            <div className="news-grid">
              {news.map((n) => (
                <article className="news-card" key={n.slug}>
                  {n.image && <Photo image={n.image} className="news-card__photo" ratio="16 / 9" />}
                  <div className="news-card__body">
                    <time className="news-card__date" dateTime={n.date}>
                      {formatDate(n.date)}
                    </time>
                    <h2 className="news-card__title">
                      <Link to={`/news/${n.slug}`}>{n.title}</Link>
                    </h2>
                    <p>{n.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
