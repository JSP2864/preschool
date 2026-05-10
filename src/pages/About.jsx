import aboutImage from '@assets/images/about.jpg';
import DirectionLink from '../components/DirectionLink';
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
            <p>
              SK-137, Sec-116 Noida<br />
              <DirectionLink className="mt-2" />
            </p>
          </div>
          <div>
            <h4>Hours</h4>
            <p>Monday - Saturday<br />8:30 AM - 2:00 PM</p>
          </div>
          <div>
            <h4>Reach out</h4>
            <p>
              <a href="mailto:contact@tinybubblepreschool.com">contact@tinybubblepreschool.com</a><br />
              <a href="tel:+918287839782">+91 82878 39782</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
