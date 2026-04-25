import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import { localPhotos, localVideos } from "../media";

type ApiImage = { id: number; filename: string; caption: string | null; url: string };

type MediaItem =
  | { kind: "photo"; src: string; caption?: string | null; key: string }
  | { kind: "video"; src: string; caption?: string | null; key: string };

type Filter = "all" | "photos" | "videos";

export default function Gallery() {
  const [apiImages, setApiImages] = useState<ApiImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<ApiImage[]>("/api/gallery")
      .then((r) => setApiImages(r.data))
      .catch(() => setApiImages([]))
      .finally(() => setLoading(false));
  }, []);

  const items = useMemo<MediaItem[]>(() => {
    const photos: MediaItem[] = localPhotos.map((src, i) => ({
      kind: "photo",
      src,
      key: `local-photo-${i}`,
    }));
    const videos: MediaItem[] = localVideos.map((src, i) => ({
      kind: "video",
      src,
      key: `local-video-${i}`,
    }));
    const apiPhotos: MediaItem[] = apiImages.map((img) => ({
      kind: "photo",
      src: img.url,
      caption: img.caption,
      key: `api-${img.id}`,
    }));

    // Interleave photos with videos so the page feels lively
    const merged: MediaItem[] = [];
    const allPhotos = [...apiPhotos, ...photos];
    let vi = 0;
    for (let i = 0; i < allPhotos.length; i++) {
      merged.push(allPhotos[i]);
      if ((i + 1) % 7 === 0 && vi < videos.length) {
        merged.push(videos[vi++]);
      }
    }
    while (vi < videos.length) merged.push(videos[vi++]);
    return merged;
  }, [apiImages]);

  const visible = useMemo(() => {
    if (filter === "photos") return items.filter((m) => m.kind === "photo");
    if (filter === "videos") return items.filter((m) => m.kind === "video");
    return items;
  }, [items, filter]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? null : (i - 1 + visible.length) % visible.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, visible.length]);

  const photoCount = items.filter((m) => m.kind === "photo").length;
  const videoCount = items.filter((m) => m.kind === "video").length;

  return (
    <div>
      {/* HEADER */}
      <section className="bg-gradient-to-br from-bubble-100 via-white to-sky-soft">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <span className="inline-flex rounded-full bg-white/80 px-4 py-1 text-sm font-semibold text-bubble-600 shadow-sm ring-1 ring-bubble-200">
            📸 Gallery
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-800 md:text-5xl">
            Little moments,{" "}
            <span className="bg-gradient-to-r from-bubble-500 to-pink-500 bg-clip-text text-transparent">
              big smiles
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">
            A peek into a day at Little Bubble — songs, art, snacks and so much giggling.
          </p>

          {/* Filters */}
          <div className="mx-auto mt-8 inline-flex rounded-full bg-white p-1 shadow-md ring-1 ring-black/5">
            {(
              [
                { id: "all", label: `All (${items.length})` },
                { id: "photos", label: `Photos (${photoCount})` },
                { id: "videos", label: `Videos (${videoCount})` },
              ] as { id: Filter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  filter === tab.id
                    ? "bg-gradient-to-r from-bubble-500 to-pink-500 text-white shadow"
                    : "text-slate-600 hover:text-bubble-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        {loading && items.length === 0 ? (
          <p className="text-center text-slate-500">Loading…</p>
        ) : visible.length === 0 ? (
          <p className="text-center text-slate-500">No items in this filter yet.</p>
        ) : (
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:_balance]">
            {visible.map((item, i) => (
              <button
                key={item.key}
                onClick={() => setLightbox(i)}
                className="group mb-4 block w-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:shadow-xl"
              >
                {item.kind === "photo" ? (
                  <img
                    src={item.src}
                    alt={item.caption ?? ""}
                    className="w-full transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative">
                    <video
                      src={item.src}
                      className="w-full"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white/90 p-3 shadow-lg transition group-hover:scale-110">
                        <svg
                          className="h-6 w-6 text-bubble-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">
                      ▶ Video
                    </div>
                  </div>
                )}
                {item.caption && (
                  <div className="px-3 py-2 text-left text-sm text-slate-600">
                    {item.caption}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && visible[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-3xl text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                (i) => (i! - 1 + visible.length) % visible.length,
              );
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-3xl text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! + 1) % visible.length);
            }}
            aria-label="Next"
          >
            ›
          </button>

          <div
            className="max-h-[90vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {visible[lightbox].kind === "photo" ? (
              <img
                src={visible[lightbox].src}
                alt=""
                className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
            ) : (
              <video
                src={visible[lightbox].src}
                className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            )}
            <div className="mt-3 text-center text-sm text-white/70">
              {lightbox + 1} / {visible.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
