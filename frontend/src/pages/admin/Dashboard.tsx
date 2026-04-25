import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthContext";

type Counts = { news: number; images: number; inquiries_new: number };

export default function Dashboard() {
  const { logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    Promise.all([
      api.get("/api/news"),
      api.get("/api/gallery"),
      api.get("/api/inquiries"),
    ]).then(([n, g, i]) => {
      setCounts({
        news: n.data.length,
        images: g.data.length,
        inquiries_new: i.data.filter((x: any) => x.status === "new").length,
      });
    });
  }, [loc.pathname]);

  const isIndex = loc.pathname === "/admin" || loc.pathname === "/admin/";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-800">Admin</h1>
        <div className="flex gap-2">
          <Link to="/" className="btn-secondary">View site</Link>
          <button className="btn-secondary" onClick={() => { logout(); nav("/admin/login"); }}>Log out</button>
        </div>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2">
        <Link to="/admin" className="rounded-full bg-white px-4 py-2 font-semibold text-slate-700 shadow">Overview</Link>
        <Link to="/admin/news" className="rounded-full bg-white px-4 py-2 font-semibold text-slate-700 shadow">News</Link>
        <Link to="/admin/gallery" className="rounded-full bg-white px-4 py-2 font-semibold text-slate-700 shadow">Gallery</Link>
        <Link to="/admin/inquiries" className="rounded-full bg-white px-4 py-2 font-semibold text-slate-700 shadow">Inquiries</Link>
      </nav>

      <div className="mt-8">
        {isIndex ? (
          <div className="grid gap-6 md:grid-cols-3">
            <Stat label="News posts" value={counts?.news} to="/admin/news" />
            <Stat label="Gallery images" value={counts?.images} to="/admin/gallery" />
            <Stat label="New inquiries" value={counts?.inquiries_new} to="/admin/inquiries" highlight />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, to, highlight }: { label: string; value: number | undefined; to: string; highlight?: boolean }) {
  return (
    <Link to={to} className={`card flex flex-col gap-2 transition hover:-translate-y-0.5 ${highlight && value ? "ring-2 ring-bubble-500" : ""}`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-4xl font-extrabold text-bubble-600">{value ?? "—"}</p>
    </Link>
  );
}
