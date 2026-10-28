import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';
import Icon from './Icon.jsx';
import { mainNav, pageByKey } from '../data/pages.js';
import { site, telHref } from '../data/site.js';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.classList.add('nav-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('nav-open');
    };
  }, [open]);

  const { phone, email } = site.contact;

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="topbar">
        <div className="container topbar__inner">
          <p className="topbar__meta">
            Established {site.established} <span aria-hidden="true">·</span> {site.location.city},{' '}
            {site.location.country}
          </p>
          <ul className="topbar__contact">
            {phone && (
              <li>
                <a href={telHref(phone)}>
                  <Icon name="phone" size={15} /> {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`}>
                  <Icon name="mail" size={15} /> {email}
                </a>
              </li>
            )}
            <li>
              <Link to="/marine-supplies-ship-chandling">Marine Care Services Division</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar">
        <div className="container navbar__inner">
          <Link to="/" className="brand-logo" aria-label={`${site.name}, home page`}>
            <BrandLogo />
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          </button>

          <nav id="primary-nav" className={`primary-nav ${open ? 'is-open' : ''}`} aria-label="Primary">
            <ul className="primary-nav__list">
              {mainNav.map((key) => {
                const page = pageByKey[key];
                return (
                  <li key={key}>
                    <NavLink to={page.path} className="primary-nav__link">
                      {page.navLabel}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <Link to="/request-a-quotation" className="btn btn--primary primary-nav__cta">
              Request a Quotation
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
