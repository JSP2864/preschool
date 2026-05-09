import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__bubble" aria-hidden="true">🫧</span>
          <div>
            <h3>Tiny Bubble Pre-School</h3>
            <p>Where little ones learn, laugh and grow.</p>
          </div>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4>Visit Us</h4>
            <ul>
              <li>12 Sunshine Lane</li>
              <li>Greenpark, 560001</li>
              <li>Mon–Fri · 8:30 AM – 4:30 PM</li>
            </ul>
          </div>

          <div>
            <h4>Reach Out</h4>
            <ul>
              <li><a href="mailto:hello@tinybubble.school">hello@tinybubble.school</a></li>
              <li><a href="tel:+910000000000">+91 00000 00000</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__base">
        <p>© {year} Tiny Bubble Pre-School · Made with ♥ for tiny humans</p>
      </div>
    </footer>
  );
}
