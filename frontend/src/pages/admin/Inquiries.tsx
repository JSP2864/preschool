import { useEffect, useState } from "react";
import { api } from "../../api/client";

type Status = "new" | "contacted" | "closed";
type Inquiry = {
  id: number;
  parent_name: string;
  email: string;
  phone: string | null;
  child_name: string;
  child_age: number;
  message: string | null;
  status: Status;
  created_at: string;
};

const statusColors: Record<Status, string> = {
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-sky-100 text-sky-800",
  closed: "bg-slate-200 text-slate-700",
};

export default function Inquiries() {
  const [items, setItems] = useState<Inquiry[]>([]);

  async function load() {
    const { data } = await api.get<Inquiry[]>("/api/inquiries");
    setItems(data);
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id: number, status: Status) {
    await api.patch(`/api/inquiries/${id}`, { status });
    load();
  }

  return (
    <div className="space-y-4">
      {items.map((i) => (
        <div key={i.id} className="card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-slate-800">{i.parent_name} <span className="text-slate-500">— parent of {i.child_name} ({i.child_age})</span></p>
              <p className="text-sm text-slate-600">
                <a className="text-bubble-600 hover:underline" href={`mailto:${i.email}`}>{i.email}</a>
                {i.phone && <> · {i.phone}</>}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{new Date(i.created_at).toLocaleString()}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[i.status]}`}>{i.status}</span>
          </div>
          {i.message && <p className="mt-3 whitespace-pre-line text-slate-700">{i.message}</p>}
          <div className="mt-4 flex gap-2">
            {(["new", "contacted", "closed"] as Status[]).map((s) => (
              <button
                key={s}
                disabled={s === i.status}
                onClick={() => setStatus(i.id, s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  s === i.status ? "cursor-not-allowed opacity-40" : "border border-slate-300 hover:bg-slate-100"
                }`}
              >
                Mark {s}
              </button>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-slate-500">No inquiries yet.</p>}
    </div>
  );
}
