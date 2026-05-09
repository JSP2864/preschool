const posts = [
  {
    tag: 'Admissions',
    date: 'May 06, 2026',
    title: 'Open house — meet the Tiny Bubble team',
    excerpt:
      'Join us for a Friday morning tour, meet our teachers, and watch a circle-time song or two.',
    color: 'from-orange-100 to-orange-50',
  },
  {
    tag: 'Calendar',
    date: 'Apr 28, 2026',
    title: 'Summer wonder camp — registrations now open',
    excerpt:
      'Two playful weeks of art, garden walks, water-day fun and very tiny picnics.',
    color: 'from-amber-100 to-amber-50',
  },
  {
    tag: 'Classroom',
    date: 'Apr 14, 2026',
    title: 'Our new reading nook is here!',
    excerpt:
      'Soft cushions, a fresh shelf of picture books, and a little window to watch the rain.',
    color: 'from-rose-100 to-rose-50',
  },
  {
    tag: 'Community',
    date: 'Mar 30, 2026',
    title: 'Earth-day garden day with the Sunbeams',
    excerpt:
      'Tiny gloves, big shovels, and a whole lot of compost. Photos inside.',
    color: 'from-emerald-100 to-emerald-50',
  },
];

export default function News() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
          📰 News & updates
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-800 md:text-5xl">
          Little stories from Tiny Bubble.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Classroom moments, upcoming events, and gentle reminders for our families.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <article
            key={p.title}
            className={`rounded-3xl bg-gradient-to-br ${p.color} p-8 shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-orange-600">
              <span className="rounded-full bg-white/70 px-3 py-1">{p.tag}</span>
              <span className="text-slate-500">{p.date}</span>
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-800">{p.title}</h2>
            <p className="mt-2 text-slate-600">{p.excerpt}</p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700"
            >
              Read more <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
