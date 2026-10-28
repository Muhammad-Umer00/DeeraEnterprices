import { useState } from 'react';
import { site } from '../data/site.js';

/**
 * Shows the ORIGINAL DEERA ENTERPRISES logo from /public/brand when the file
 * exists. If it has not been supplied yet, a plain text wordmark is shown.
 * The logo image is never recoloured or distorted (object-fit: contain).
 */
export default function BrandLogo({ variant = 'default' }) {
  const [failed, setFailed] = useState(false);
  const src = variant === 'onDark' && site.logo.srcOnDark ? site.logo.srcOnDark : site.logo.src;

  if (!failed) {
    return (
      <img
        className={`brand-logo__img brand-logo__img--${variant}`}
        src={src}
        alt={site.logo.alt}
        onError={() => setFailed(true)}
        decoding="async"
      />
    );
  }

  return (
    <span className={`wordmark wordmark--${variant}`} aria-label={site.name}>
      <span className="wordmark__main" aria-hidden="true">DEERA</span>
      <span className="wordmark__sub" aria-hidden="true">ENTERPRISES</span>
    </span>
  );
}

export function DivisionLogo({ logo, name }) {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img className="division-logo__img" src={logo.src} alt={logo.alt} onError={() => setFailed(true)} decoding="async" />
    );
  }
  return (
    <span className="division-wordmark" aria-label={name}>
      <span aria-hidden="true">{name}</span>
    </span>
  );
}
