import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to top on navigation, or to the #hash target when present. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: 'start' });
      }, 0);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
    // Move focus to main content for screen-reader users after navigation.
    const main = document.getElementById('main');
    if (main) main.focus({ preventScroll: true });
    return undefined;
  }, [pathname, hash]);

  return null;
}
