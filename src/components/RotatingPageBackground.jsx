import { useEffect, useState } from 'react';
import { localPhotos } from '../media';

const backgroundPhotos = localPhotos.slice(3);

export default function RotatingPageBackground() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBackgroundIndex((i) => (i + 1) % backgroundPhotos.length);
    }, 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page-soft-bg" aria-hidden="true">
      {backgroundPhotos.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={[
            'home-hero-bg',
            i === backgroundIndex ? 'home-hero-bg--active' : '',
          ].join(' ')}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-bubble-100/70 via-white/62 to-sky-soft/72" />
    </div>
  );
}
