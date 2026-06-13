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
            <a
              href="https://www.google.com/maps?q=28.568299,77.398063"
              target="_blank"
              rel="noreferrer"
              className="news-marquee__label"
              aria-label="Open Tiny Bubble Pre-School location"
              title="Open location"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a.92.92 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </a>
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
            <a href="tel:+918287839782" className="news-marquee__call-mobile" aria-label="Call 82878 39782">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
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
