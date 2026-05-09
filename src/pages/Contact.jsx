import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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
            Tours every Friday morning. Drop us a note and we'll find a time that works
            for you and your little one.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Visit us
              </div>
              <p className="mt-1 text-slate-700">
                12 Sunshine Lane, Greenpark, 560001
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Hours
              </div>
              <p className="mt-1 text-slate-700">Mon – Fri · 8:30 AM – 4:30 PM</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                Reach out
              </div>
              <p className="mt-1 text-slate-700">
                <a className="hover:text-orange-500" href="mailto:hello@tinybubble.school">
                  hello@tinybubble.school
                </a>
                <br />
                <a className="hover:text-orange-500" href="tel:+910000000000">
                  +91 00000 00000
                </a>
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white p-8 shadow-md ring-1 ring-black/5"
        >
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-5xl">🫧</div>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-800">
                Thanks, {form.name || 'friend'}!
              </h2>
              <p className="mt-2 text-slate-600">
                We've got your note and will be in touch very soon.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-slate-800">Book a tour</h2>
              <p className="mt-1 text-slate-600">We usually reply within a day.</p>

              <label className="mt-5 block">
                <span className="text-sm font-semibold text-slate-700">Your name</span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none ring-orange-300 transition focus:ring-2"
                />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none ring-orange-300 transition focus:ring-2"
                />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-semibold text-slate-700">Message</span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none ring-orange-300 transition focus:ring-2"
                />
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-md transition hover:bg-orange-600"
              >
                Send message
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
