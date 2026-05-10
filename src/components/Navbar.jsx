import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const directionsUrl = 'https://www.google.com/maps?q=28.568299,77.398063';
const phoneNumber = '+918287839782';

function BubbleLogo() {
  return (
    <svg
      viewBox="0 0 44 44"
      className="h-9 w-9 shrink-0"
      aria-hidden="true"
    >
      <circle cx="14" cy="26" r="10" fill="none" stroke="#fb923c" strokeWidth="2.5" />
      <circle cx="29" cy="16" r="7"  fill="none" stroke="#fbbf24" strokeWidth="2.5" />
      <circle cx="26" cy="30" r="4"  fill="none" stroke="#fb923c" strokeWidth="2.5" />
      <circle cx="10" cy="14" r="2"  fill="#fbbf24" />
    </svg>
  );
}

function NavIconLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-500 hover:text-white hover:shadow-md"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}

function ContactActions() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <NavIconLink href={directionsUrl} label="Open Tiny Bubble Pre-School location">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a.92.92 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </NavIconLink>
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call Tiny Bubble Pre-School at 82878 39782"
        className="inline-flex h-10 items-center gap-2 rounded-full bg-orange-500 px-3 text-sm font-extrabold text-white shadow-sm ring-1 ring-orange-600/20 transition hover:bg-orange-600 hover:shadow-md"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
        <span>82878 39782</span>
      </a>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    [
      'inline-flex items-center rounded-full px-4 py-2 text-sm font-bold transition',
      isActive
        ? 'bg-orange-500 text-white shadow-sm'
        : 'text-slate-700 hover:text-orange-500',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fff8f3]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <BubbleLogo />
          <span className="font-display text-2xl font-extrabold tracking-tight text-orange-500">
            Tiny Bubble
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {/* Desktop nav */}
          <nav className="flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={linkClass}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <ContactActions />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-orange-100 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="border-t border-black/5 bg-[#fff8f3] px-6 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-full px-4 py-2 text-base font-semibold transition',
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-700 hover:bg-orange-100',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-black/5 pt-3">
              <ContactActions />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
