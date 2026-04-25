import { FormEvent, useEffect, useState } from "react";
import { api } from "../../api/client";

type NewsItem = { id: number; title: string; body: string; published_at: string };

export default function NewsManage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function load() {
    const { data } = await api.get<NewsItem[]>("/api/news");
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (editingId) {
      await api.put(`/api/news/${editingId}`, { title, body });
    } else {
      await api.post("/api/news", { title, body });
    }
    setTitle(""); setBody(""); setEditingId(null);
    load();
  }

  function edit(n: NewsItem) {
    setEditingId(n.id);
    setTitle(n.title);
    setBody(n.body);
  }

  async function remove(id: number) {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/api/news/${id}`);
    load();
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
      <form onSubmit={onSubmit} className="card space-y-4">
        <h2 className="text-xl font-bold text-slate-800">{editingId ? "Edit post" : "New post"}</h2>
        <div>
          <label className="label">Title</label>
          <input className="input" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="label">Body</label>
          <textarea className="input min-h-[160px]" required value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button className="btn-primary">{editingId ? "Save" : "Publish"}</button>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setTitle(""); setBody(""); }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {items.map((n) => (
          <article key={n.id} className="card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{n.title}</h3>
                <p className="text-xs uppercase tracking-wide text-slate-500">{new Date(n.published_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-sm font-semibold text-bubble-600 hover:underline" onClick={() => edit(n)}>Edit</button>
                <button className="text-sm font-semibold text-red-600 hover:underline" onClick={() => remove(n.id)}>Delete</button>
              </div>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">{n.body}</p>
          </article>
        ))}
        {items.length === 0 && <p className="text-slate-500">No posts yet.</p>}
      </div>
    </div>
  );
}
