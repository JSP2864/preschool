export default function Footer() {
  return (
    <footer className="mt-16 border-t border-bubble-100 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-600 md:flex-row">
        <p>© {new Date().getFullYear()} Little Bubble Preschool</p>
        <p>Made with care for curious little minds.</p>
      </div>
    </footer>
  );
}
