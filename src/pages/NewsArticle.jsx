import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Photo from '../components/Photo.jsx';
import Icon from '../components/Icon.jsx';
import NotFound from './NotFound.jsx';
import { news } from '../data/news.js';
import { formatDate } from './News.jsx';

export default function NewsArticle() {
  const { slug } = useParams();
  const article = news.find((n) => n.slug === slug);
  if (!article) return <NotFound />;

  return (
    <>
      <Seo title={`${article.title} | DEERA ENTERPRISES`} description={article.summary} />
      <PageHero eyebrow="News & updates" title={article.title} crumb="News">
        <p className="page-hero__lead">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      </PageHero>
      <article className="section">
        <div className="container narrow prose">
          {article.image && <Photo image={article.image} ratio="16 / 9" />}
          {article.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <Link to="/news" className="text-link">
            All news &amp; updates <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </article>
    </>
  );
}
