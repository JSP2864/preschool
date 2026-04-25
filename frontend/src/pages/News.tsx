import { useEffect, useState } from "react";
import { api } from "../api/client";

type NewsItem = { id: number; title: string; body: string; published_at: string };

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<NewsItem[]>("/api/news").then((r) => {
      setItems(r.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-slate-800">News & announcements</h1>
      {loading ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-slate-500">Nothing yet — check back soon!</p>
      ) : (
        <div className="mt-8 space-y-6">
          {items.map((n) => (
            <article key={n.id} className="card">
              <h2 className="text-2xl font-bold text-slate-800">{n.title}</h2>
              <p className="mt-1 text-xs uppercase tracking-wide text-bubble-600">
                {new Date(n.published_at).toLocaleDateString()}
              </p>
              <p className="mt-3 whitespace-pre-line text-slate-700">{n.body}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
