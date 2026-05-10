const directionsUrl = 'https://www.google.com/maps?q=28.568299,77.398063';

export default function DirectionLink({ className = '' }) {
  return (
    <a
      href={directionsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Open directions to Tiny Bubble Pre-School"
      title="Open directions"
      className={[
        'inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition hover:bg-orange-500 hover:text-white',
        className,
      ].join(' ')}
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
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a.92.92 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </a>
  );
}
