import programsImage from '@assets/images/programs.jpg';
import '../styles/Programs.css';

const programs = [
  {
    name: 'Tiny Tots',
    age: '1.5 – 2.5 yrs',
    color: 'bubbles',
    blurb: 'Gentle parent-supported play, sensory exploration and lots of cuddles.',
    points: ['Half-day program', 'Sensory & motor play', 'Music & rhymes', 'Story time'],
  },
  {
    name: 'Sprouts',
    age: '2.5 – 3.5 yrs',
    color: 'sprouts',
    blurb: 'A first taste of independence — sharing, exploring, and lots of giggles.',
    points: ['Half / full day', 'Art & messy play', 'Outdoor time', 'Early concepts'],
  },
  {
    name: 'Sunbeams',
    age: '3.5 – 4.5 yrs',
    color: 'sunbeams',
    blurb: 'Confident little learners exploring letters, numbers, and big ideas.',
    points: ['Full-day program', 'Phonics & numeracy', 'Storytelling', 'Group projects'],
  },
  {
    name: 'Stars',
    age: '4.5 – 5 yrs',
    color: 'stars',
    blurb: 'Kindergarten-readiness with curiosity, kindness, and a love for learning.',
    points: ['Full-day program', 'Reading & writing', 'STEM play', 'School-readiness'],
  },
];

const day = [
  { time: '8:30', label: 'Soft arrival & hellos' },
  { time: '9:00', label: 'Activity time & songs' },
  { time: '9:45', label: 'Theme of the day' },
  { time: '10:30', label: 'Snack & free play' },
  { time: '11:30', label: 'Outdoor adventure' },
  { time: '12:30', label: 'Lunch & quiet time' },
  { time: '14:00', label: 'Story & art' },
  { time: '15:30', label: 'Wrap-up & goodbyes' },
];

export default function Programs() {
  return (
    <div className="programs">
      <div className="relative mx-auto max-w-6xl px-4 pt-6 md:pt-8">
          <div className="news-marquee">
            <div className="news-marquee__label">Latest</div>
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
          </div>
        </div>
      <section className="programs__hero">
        <div className="programs__hero-copy">
          <span className="eyebrow">Programs</span>
          <h1>A program for every little stage.</h1>
          <p>
            Our four age-graded programs grow with your child — each one designed by
            early-childhood educators to balance play, structure and pure joy.
          </p>
        </div>
        <div className="programs__hero-media">
          <img src={programsImage} alt="Children working with shapes and colours" />
        </div>
      </section>

      <section className="program-grid">
        {programs.map(p => (
          <article key={p.name} className={`program-card program-card--${p.color}`}>
            <div className="program-card__head">
              <h3>{p.name}</h3>
              <span className="program-card__age">{p.age}</span>
            </div>
            <p className="program-card__blurb">{p.blurb}</p>
            <ul>
              {p.points.map(pt => <li key={pt}>{pt}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="day">
        <h2>A day at Tiny Bubble</h2>
        <ol className="day__timeline">
          {day.map(d => (
            <li key={d.time}>
              <span className="day__time">{d.time}</span>
              <span className="day__label">{d.label}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
