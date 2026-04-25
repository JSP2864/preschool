import { FormEvent, useState } from "react";
import { api } from "../api/client";

export default function Contact() {
  const [form, setForm] = useState({
    parent_name: "",
    email: "",
    phone: "",
    child_name: "",
    child_age: 3,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await api.post("/api/inquiries", form);
      setStatus("sent");
      setForm({ parent_name: "", email: "", phone: "", child_name: "", child_age: 3, message: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.response?.data?.detail ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-slate-800">Come visit us</h1>
      <p className="mt-3 text-lg text-slate-600">
        Tell us a little about your child — we'll get back to you within 2 business days to schedule a tour.
      </p>

      {status === "sent" ? (
        <div className="card mt-8 border border-green-200 bg-green-50 text-green-800">
          Thanks! Your inquiry was received. We'll be in touch soon.
          <button className="ml-3 underline" onClick={() => setStatus("idle")}>Send another</button>
        </div>
      ) : (
        <form className="card mt-8 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="label">Your name</label>
            <input className="input" required value={form.parent_name}
              onChange={(e) => setForm({ ...form, parent_name: e.target.value })} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="label">Phone (optional)</label>
              <input className="input" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Child's name</label>
              <input className="input" required value={form.child_name}
                onChange={(e) => setForm({ ...form, child_name: e.target.value })} />
            </div>
            <div>
              <label className="label">Child's age</label>
              <input type="number" min={0} max={12} className="input" required value={form.child_age}
                onChange={(e) => setForm({ ...form, child_age: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="label">Anything we should know?</label>
            <textarea className="input min-h-[120px]" value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
