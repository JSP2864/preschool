import { useEffect, useState } from 'react';
import g1 from '@assets/images/gallery-1.jpg';
import g2 from '@assets/images/gallery-2.jpg';
import g3 from '@assets/images/gallery-3.jpg';
import g4 from '@assets/images/gallery-4.jpg';
import g5 from '@assets/images/gallery-5.jpg';
import g6 from '@assets/images/gallery-6.jpg';
import g7 from '@assets/images/gallery-7.jpg';
import g8 from '@assets/images/gallery-8.jpg';
import g9 from '@assets/images/gallery-9.jpg';
import g10 from '@assets/images/gallery-10.jpg';
import g11 from '@assets/images/gallery-11.jpg';
import g12 from '@assets/images/gallery-12.jpg';
import '../styles/Gallery.css';

const photos = [
  { src: g1, caption: 'Storytime giggles' },
  { src: g2, caption: 'Painting the day away' },
  { src: g3, caption: 'New friends, new adventures' },
  { src: g4, caption: 'Outdoor explorers' },
  { src: g5, caption: 'Building together' },
  { src: g6, caption: 'Tiny chefs in action' },
  { src: g7, caption: 'Music & movement' },
  { src: g8, caption: 'Garden discoveries' },
  { src: g9, caption: 'Show & tell' },
  { src: g10, caption: 'Rainy-day fun' },
  { src: g11, caption: 'Festival celebrations' },
  { src: g12, caption: 'Big smiles, small humans' },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = e => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive(i => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setActive(i => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div className="gallery">
      <div className="relative mx-auto max-w-6xl px-4 pt-6 md:pt-8">
          <div className="news-marquee">
            <div className="news-marquee__label" aria-label="Latest">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2zm6 11l.9 2.7 2.7.9-2.7.9-.9 2.7-.9-2.7-2.7-.9 2.7-.9.9-2.7zM5 14l.7 2.1 2.1.7-2.1.7L5 19.6l-.7-2.1-2.1-.7 2.1-.7L5 14z"/>
              </svg>
            </div>
            <div className="news-marquee__track" aria-label="Summer camp announcement">
              <div className="news-marquee__content">
                <span>Summer Camp starts 18 May onward</span>
                <span>Creative activities, stories, music, movement and outdoor play</span>
                <span>Admissions open for ages 2 to 7</span>
              </div>
              <div className="news-marquee__content" aria-hidden="true">
                <span>Summer Camp starts 18 May onward</span>
                <span>Creative activities, stories, music, movement and outdoor play</span>
                <span>Admissions open for ages 2 to 7</span>
              </div>
            </div>
            <a href="tel:+918287839782" className="news-marquee__call">
              82878 39782
            </a>
            <a href="tel:+918287839782" className="news-marquee__call-mobile" aria-label="Call 82878 39782">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>
      <section className="gallery__hero">
        <span className="eyebrow">Gallery</span>
        <h1>Little moments, big memories.</h1>
        <p>A peek into the bright, busy, beautifully ordinary days at Tiny Bubble.</p>
      </section>

      <section className="gallery__grid">
        {photos.map((p, i) => (
          <button
            key={p.src}
            className="gallery__tile"
            onClick={() => setActive(i)}
            aria-label={`Open photo: ${p.caption}`}
          >
            <img src={p.src} alt={p.caption} loading="lazy" />
            <span className="gallery__caption">{p.caption}</span>
          </button>
        ))}
      </section>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <button
            className="lightbox__close"
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); setActive(null); }}
          >×</button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setActive(i => (i - 1 + photos.length) % photos.length); }}
          >‹</button>
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={photos[active].src} alt={photos[active].caption} />
            <figcaption>{photos[active].caption}</figcaption>
          </figure>
          <button
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setActive(i => (i + 1) % photos.length); }}
          >›</button>
        </div>
      )}
    </div>
  );
}
