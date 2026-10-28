import { Link } from 'react-router-dom';

/** Inner-page header band with breadcrumb, title and lead text. */
export default function PageHero({ eyebrow, title, lead, crumb, tone = 'green', children }) {
  return (
    <section className={`page-hero page-hero--${tone}`}>
      <div className="container">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">{crumb || title}</li>
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
