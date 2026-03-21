export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-black/5 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#inicio"
          className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-wide text-[var(--primary)]"
        >
          Amanda & Nicolas
        </a>

        <div className="hidden gap-7 font-[family-name:var(--font-jost)] text-xs uppercase tracking-widest md:flex">
          <a href="#historia" className="text-gray-500 transition hover:text-[var(--primary)]">
            Nossa História
          </a>
          <a href="#casamento" className="text-gray-500 transition hover:text-[var(--primary)]">
            O Casamento
          </a>
          <a href="#presentes" className="text-gray-500 transition hover:text-[var(--primary)]">
            Presentes
          </a>
          <a href="#presenca" className="text-gray-500 transition hover:text-[var(--primary)]">
            Presença
          </a>
          <a href="#fotos" className="text-gray-500 transition hover:text-[var(--primary)]">
            Fotos
          </a>
          <a href="#local" className="text-gray-500 transition hover:text-[var(--primary)]">
            Local
          </a>
        </div>
      </nav>
    </header>
  );
}
