import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-bubble-600">
          <span aria-hidden>🫧</span>
          <span>Little Bubble</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-1 md:gap-2">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    isActive ? "bg-bubble-500 text-white" : "text-slate-700 hover:bg-bubble-100"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
