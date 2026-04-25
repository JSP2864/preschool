const programs = [
  { name: "Tiny Bubbles", age: "2–3 years", desc: "Half-day, sensory play, early language & music." },
  { name: "Explorers", age: "3–4 years", desc: "Full-day, nature walks, storytelling, early literacy." },
  { name: "Kinder-Ready", age: "4–5 years", desc: "Full-day, numeracy, reading, project-based learning." },
];

export default function Programs() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-slate-800">Our programs</h1>
      <p className="mt-3 text-lg text-slate-600">Three age-appropriate classrooms designed around how young children actually learn.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {programs.map((p) => (
          <div key={p.name} className="card">
            <p className="text-sm font-semibold uppercase tracking-wide text-bubble-600">{p.age}</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-800">{p.name}</h3>
            <p className="mt-2 text-slate-600">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
