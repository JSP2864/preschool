import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteName = 'Tiny Bubble Pre-School & Daycare';

const pages = {
  '/': {
    title: 'Tiny Bubble Pre-School & Daycare | Preschool in Sector 116 Noida',
    description:
      'Tiny Bubble Pre-School & Daycare in Sector 116 Noida offers play-based preschool, daycare, summer camp, outdoor play, music, stories and early learning for ages 2 to 7.',
  },
  '/about': {
    title: 'About Tiny Bubble Pre-School & Daycare | Sector 116 Noida',
    description:
      'Learn about Tiny Bubble Pre-School & Daycare, a warm early-learning home in Sector 116 Noida focused on kindness, curiosity, safety and purposeful play.',
  },
  '/programs': {
    title: 'Preschool Programs in Noida | Tiny Bubble Pre-School & Daycare',
    description:
      'Explore Tiny Bubble preschool and daycare programs for young children, including play-based learning, sensory play, phonics, numeracy, outdoor time and school readiness.',
  },
  '/gallery': {
    title: 'Tiny Bubble Gallery | Preschool Activities in Noida',
    description:
      'See classroom moments, creative activities, outdoor play, music, movement and daily learning at Tiny Bubble Pre-School & Daycare in Sector 116 Noida.',
  },
  '/contact': {
    title: 'Contact Tiny Bubble Pre-School & Daycare | Admissions in Noida',
    description:
      'Contact Tiny Bubble Pre-School & Daycare in Sector 116 Noida for preschool admissions, daycare enquiries and summer camp registration. Call +91 82878 39782.',
  },
};

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    const nameMatch = selector.match(/name="([^"]+)"/);
    const propertyMatch = selector.match(/property="([^"]+)"/);

    if (nameMatch) element.setAttribute('name', nameMatch[1]);
    if (propertyMatch) element.setAttribute('property', propertyMatch[1]);

    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
}

function canonicalFor(pathname) {
  const siteUrl = window.location.pathname.startsWith('/preschool')
    ? `${window.location.origin}/preschool`
    : window.location.origin;
  const path = pathname === '/' ? '' : pathname;
  return `${siteUrl}${path}`;
}

export default function SEO() {
  const { pathname } = useLocation();
  const page = pages[pathname] || pages['/'];
  const canonical = canonicalFor(pathname);

  useEffect(() => {
    document.title = page.title;

    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', page.description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:site_name"]', 'content', siteName);
    setMeta('meta[name="twitter:title"]', 'content', page.title);
    setMeta('meta[name="twitter:description"]', 'content', page.description);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
  }, [canonical, page.description, page.title]);

  return null;
}
