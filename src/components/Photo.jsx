import { useState } from 'react';

/**
 * Responsive photograph with a quiet brand-colour fallback panel shown until
 * the real photograph is supplied (see public/images/README.txt).
 */
export default function Photo({ image, className = '', priority = false, ratio }) {
  const [failed, setFailed] = useState(!image);
  const style = ratio ? { aspectRatio: ratio } : undefined;

  return (
    <div className={`photo ${failed ? 'photo--fallback' : ''} ${className}`} style={style}>
      {!failed && (
        <img
          src={image.src}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
