import DirectionLink from '../components/DirectionLink';

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
            ✉️ Get in touch
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-800 md:text-5xl">
            Say hi to Tiny Bubble.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Admissions and summer camp enquiries are open. Call us or visit the campus
            during school hours.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Visit us
              </div>
              <p className="mt-1 text-slate-700">
                SK-137, Sec-116 Noida
              </p>
              <DirectionLink className="mt-2" />
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Hours
              </div>
              <p className="mt-1 text-slate-700">Monday - Saturday · 8:30 AM - 2:00 PM</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Reach out
              </div>
              <p className="mt-1 text-slate-700">
                <a className="hover:text-orange-500" href="mailto:contact@tinybubblepreschool.com">
                  contact@tinybubblepreschool.com
                </a>
                <br />
                <a className="hover:text-orange-500" href="tel:+918287839782">
                  +91 82878 39782
                </a>
              </p>
            </div>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-pink-500 to-amber-400 p-8 text-white shadow-2xl ring-1 ring-black/5">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/15 blur-2xl" />

          <div className="relative">
            <span className="inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-bold ring-1 ring-white/30">
              Summer Camp 2026
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
              Summer camp starts 18 May onward
            </h2>
            <p className="mt-4 text-lg text-white/90">
              A bright summer program with activity time, creative play, stories,
              movement, outdoor fun and joyful learning for young children.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Creative activities',
                'Music & movement',
                'Story sessions',
                'Outdoor play',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/15 px-4 py-3 font-bold ring-1 ring-white/20">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 text-slate-800 shadow-lg">
              <div className="text-sm font-bold uppercase tracking-wide text-orange-500">
                For registration
              </div>
              <a
                className="mt-2 block text-3xl font-extrabold text-slate-900 hover:text-orange-600"
                href="tel:+918287839782"
              >
                +91 82878 39782
              </a>
              <p className="mt-2 text-sm text-slate-600">
                Seats are limited. Call during school hours for details.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
