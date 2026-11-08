export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-svh w-full items-center justify-center bg-[#F5EAD4]"
      id="main-content"
      role="status"
    >
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-3"
      >
        {[0, 1, 2].map((index) => (
          <span
            className="ink-dot h-3 w-3 rounded-full bg-[#800020]"
            key={index}
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}
      </div>
      <span className="sr-only">Loading page content</span>
    </main>
  );
}
