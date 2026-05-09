import aboutImage from '@assets/images/about.jpg';
import '../styles/About.css';

const values = [
  { title: 'Kindness first', text: 'Empathy is the foundation of every classroom moment.' },
  { title: 'Wonder always', text: 'We protect curiosity and let questions lead the day.' },
  { title: 'Safe to grow', text: 'Mistakes are welcome — that’s where learning lives.' },
  { title: 'Play with purpose', text: 'Every game, song and story is a tiny lesson in disguise.' },
];

export default function About() {
  return (
    <div className="about">
      <section className="about__hero">
        <div className="about__hero-copy">
          <span className="eyebrow">About us</span>
          <h1>Little world. Big hearts.</h1>
          <p>
            Tiny Bubble Pre-School is a warm, family-run early-learning home where every
            child is seen, heard and gently encouraged to bloom at their own pace.
          </p>
        </div>
        <div className="about__hero-media">
          <img src={aboutImage} alt="Children laughing in the Tiny Bubble classroom" />
        </div>
      </section>

      <section className="mission">
        <span className="eyebrow">Our mission</span>
        <h2>To make every child feel like the most important person in the room.</h2>
        <p>
          We believe early childhood deserves the gentlest, most thoughtful start. Our
          teachers spend years training in early childhood development — and decades
          loving the children in their care. Together, we craft a space where small
          minds feel big, and big feelings feel safe.
        </p>
      </section>

      <section className="values">
        <h2>What we stand for</h2>
        <div className="values__grid">
          {values.map(v => (
            <div key={v.title} className="value-card">
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="visit">
        <h2>Come visit us</h2>
        <div className="visit__grid">
          <div>
            <h4>Address</h4>
            <p>12 Sunshine Lane<br />Greenpark, 560001</p>
          </div>
          <div>
            <h4>Hours</h4>
            <p>Monday – Friday<br />8:30 AM – 4:30 PM</p>
          </div>
          <div>
            <h4>Reach out</h4>
            <p>
              <a href="mailto:hello@tinybubble.school">hello@tinybubble.school</a><br />
              <a href="tel:+910000000000">+91 00000 00000</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
