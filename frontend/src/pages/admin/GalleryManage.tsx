import { FormEvent, useEffect, useState } from "react";
import { api } from "../../api/client";

type Image = { id: number; filename: string; caption: string | null; url: string };

export default function GalleryManage() {
  const [images, setImages] = useState<Image[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await api.get<Image[]>("/api/gallery");
    setImages(data);
  }

  useEffect(() => { load(); }, []);

  async function onUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    if (caption) fd.append("caption", caption);
    await api.post("/api/gallery", fd);
    setFile(null); setCaption("");
    (document.getElementById("file-input") as HTMLInputElement | null)?.value && ((document.getElementById("file-input") as HTMLInputElement).value = "");
    setBusy(false);
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this image?")) return;
    await api.delete(`/api/gallery/${id}`);
    load();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onUpload} className="card grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <div>
          <label className="label">Image</label>
          <input id="file-input" type="file" accept="image/*" required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm" />
        </div>
        <div>
          <label className="label">Caption (optional)</label>
          <input className="input" value={caption} onChange={(e) => setCaption(e.target.value)} />
        </div>
        <button className="btn-primary" disabled={busy}>{busy ? "Uploading…" : "Upload"}</button>
      </form>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <figure key={img.id} className="overflow-hidden rounded-2xl bg-white shadow">
            <img src={img.url} alt={img.caption ?? ""} className="h-40 w-full object-cover" />
            <figcaption className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="text-slate-600">{img.caption || "—"}</span>
              <button className="text-red-600 hover:underline" onClick={() => remove(img.id)}>Delete</button>
            </figcaption>
          </figure>
        ))}
        {images.length === 0 && <p className="text-slate-500">No images yet.</p>}
      </div>
    </div>
  );
}
