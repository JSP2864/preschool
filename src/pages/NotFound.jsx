import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__bubble" aria-hidden="true">🫧</div>
      <h1>Oops — this bubble popped!</h1>
      <p>The page you’re looking for floated away. Let’s get you back home.</p>
      <Link to="/" className="btn btn--primary">Back to Home</Link>
    </div>
  );
}
