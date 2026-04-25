import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { localPhotos, localVideos } from "../media";

const heroPhotos = localPhotos.slice(0, 5);
const stripPhotos = localPhotos.slice(5, 13);

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroPhotos.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bubble-100 via-white to-sky-soft">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-bubble-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-sky-soft blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-sm font-semibold text-bubble-600 shadow-sm ring-1 ring-bubble-200">
              <span>✨</span> Now enrolling — ages 2 to 5
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-800 md:text-6xl">
              A gentle place to{" "}
              <span className="bg-gradient-to-r from-bubble-500 to-pink-500 bg-clip-text text-transparent">
                play, learn &amp; grow
              </span>
              .
            </h1>
            <p className="mt-5 text-lg text-slate-600 md:text-xl">
              Little Bubble is a warm, play-based preschool. We mix storytelling,
              music, outdoor adventures and quiet time to build confident little learners.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Enroll your child</Link>
              <Link to="/programs" className="btn-secondary">See our programs</Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
              <div>
                <div className="text-2xl font-extrabold text-slate-800">6:1</div>
                <div>child to teacher</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="text-2xl font-extrabold text-slate-800">10+</div>
                <div>caring years</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="text-2xl font-extrabold text-slate-800">300+</div>
                <div>happy bubbles</div>
              </div>
            </div>
          </div>

          {/* Hero collage */}
          <div className="relative h-[420px] md:h-[500px]">
            <div className="absolute left-0 top-6 h-64 w-44 rotate-[-6deg] overflow-hidden rounded-3xl bg-white p-2 shadow-xl ring-1 ring-black/5 md:h-80 md:w-56">
              <img
                src={heroPhotos[heroIndex % heroPhotos.length]}
                alt="Little Bubble"
                className="h-full w-full rounded-2xl object-cover transition duration-700"
              />
            </div>
            <div className="absolute right-0 top-0 h-72 w-52 rotate-[5deg] overflow-hidden rounded-3xl bg-white p-2 shadow-xl ring-1 ring-black/5 md:h-96 md:w-64">
              <img
                src={heroPhotos[(heroIndex + 1) % heroPhotos.length]}
                alt="Little Bubble"
                className="h-full w-full rounded-2xl object-cover transition duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-1/2 h-52 w-60 -translate-x-1/2 rotate-[-2deg] overflow-hidden rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-black/5 md:h-60 md:w-72">
              <img
                src={heroPhotos[(heroIndex + 2) % heroPhotos.length]}
                alt="Little Bubble"
                className="h-full w-full rounded-2xl object-cover transition duration-700"
              />
            </div>
            <div className="absolute -right-2 bottom-10 hidden rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 md:flex md:items-center md:gap-2">
              <span className="text-2xl">🌈</span>
              <span className="text-sm font-semibold text-slate-700">
                A day full of wonder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800">A peek inside our day</h2>
            <p className="mt-1 text-slate-600">Tiny moments that mean the world.</p>
          </div>
          <Link to="/gallery" className="hidden text-bubble-600 hover:underline md:inline">
            See full gallery →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {stripPhotos.map((src, i) => (
            <div
              key={src}
              className={`group overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 ${
                i % 3 === 1 ? "row-span-2" : ""
              }`}
            >
              <img
                src={src}
                alt=""
                className="h-32 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-36 lg:h-40"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO SHOWCASE */}
      <section className="bg-gradient-to-br from-sky-soft via-white to-bubble-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 md:text-4xl">
              Watch our bubbles in action
            </h2>
            <p className="mt-2 text-slate-600">
              Learning here looks a lot like joyful play — because it is.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {localVideos.map((src, i) => (
              <div
                key={src}
                className="group overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5"
              >
                <video
                  src={src}
                  className="aspect-[9/12] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
                <div className="px-4 py-3 text-sm font-semibold text-slate-700">
                  {[
                    "🎶 Circle time songs",
                    "🎨 Messy art adventures",
                    "🌳 Outdoor play",
                  ][i] || "A little moment"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              emoji: "🌱",
              title: "Play-based learning",
              body: "Children learn best through play — we design each day around it.",
              color: "from-emerald-100 to-emerald-50",
            },
            {
              emoji: "👩‍🏫",
              title: "Tiny class sizes",
              body: "6:1 child-to-teacher ratio so every bubble gets the attention it deserves.",
              color: "from-bubble-100 to-bubble-50",
            },
            {
              emoji: "🥕",
              title: "Healthy snacks",
              body: "Fresh, seasonal snacks prepared fresh each morning in our kitchen.",
              color: "from-sky-soft to-white",
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`card bg-gradient-to-br ${f.color} transition hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="text-4xl">{f.emoji}</div>
              <h3 className="mt-3 text-xl font-bold text-slate-800">{f.title}</h3>
              <p className="mt-2 text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-bubble-500 to-pink-500 p-10 text-white shadow-2xl md:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-3xl font-extrabold md:text-4xl">
                Come visit us — bring your bubble!
              </h3>
              <p className="mt-2 max-w-xl text-white/90">
                Tours every Friday morning. We'd love to show you around our cozy classrooms,
                garden and reading nook.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-bubble-600 shadow-md transition hover:scale-105"
            >
              Book a tour
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
