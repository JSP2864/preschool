export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-slate-800">About Little Bubble</h1>
      <p className="mt-4 text-lg text-slate-600">
        Founded by a team of early-childhood educators, Little Bubble is a neighborhood preschool
        built around wonder, kindness and play. Our teachers are trained in Reggio-inspired and
        Montessori approaches, and we believe every child arrives with their own unique spark.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-2xl font-bold text-bubble-600">Our philosophy</h2>
          <p className="mt-2 text-slate-600">
            Children are natural explorers. We follow their curiosity while gently building the
            habits that help them thrive — listening, sharing, and trying again.
          </p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold text-bubble-600">Our space</h2>
          <p className="mt-2 text-slate-600">
            Two sun-filled classrooms, a garden with a mud kitchen, a cozy reading nook, and an
            art studio where spills are part of the fun.
          </p>
        </div>
      </div>
    </div>
  );
}
