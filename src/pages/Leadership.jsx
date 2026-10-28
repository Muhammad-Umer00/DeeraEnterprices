import { PageSeo } from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Photo from '../components/Photo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { pageByKey } from '../data/pages.js';
import { images } from '../data/images.js';
import { site } from '../data/site.js';

export default function Leadership() {
  const initials = site.owner
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

  return (
    <>
      <PageSeo page={pageByKey.leadership} />
      <PageHero eyebrow="Our leadership" title="Leadership" crumb="Our Leadership" />

      <section className="section">
        <div className="container leader">
          <div className="leader__media">
            {images.owner ? (
              <Photo image={images.owner} className="leader__photo" ratio="4 / 5" />
            ) : (
              <div className="leader__monogram" aria-hidden="true">
                {initials}
              </div>
            )}
          </div>
          <div className="leader__body">
            <h2 className="leader__name">{site.owner}</h2>
            <p className="leader__title">{site.ownerTitle}</p>
            <p className="leader__bio">
              Danish Muhammad Siddiqui is the owner of DEERA ENTERPRISES, an established maritime services company
              operating since 2009. The company focuses on marine services, vessel-related operational support, ship
              waste handling, cleaning solutions and marine supply requirements.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
