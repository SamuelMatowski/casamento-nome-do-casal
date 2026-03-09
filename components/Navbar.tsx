export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#inicio"
          className="text-xl font-semibold tracking-wide text-[var(--primary)]"
        >
          Nicolas & Amanda
        </a>

        <div className="hidden gap-6 text-sm md:flex">
          <a href="#historia" className="transition hover:text-[var(--primary)]">
            Nossa História
          </a>
          <a href="#casamento" className="transition hover:text-[var(--primary)]">
            O Casamento
          </a>
          <a href="#presentes" className="transition hover:text-[var(--primary)]">
            Presentes
          </a>
          <a href="#presenca" className="transition hover:text-[var(--primary)]">
            Presença
          </a>
          <a href="#fotos" className="transition hover:text-[var(--primary)]">
            Fotos
          </a>
          <a href="#local" className="transition hover:text-[var(--primary)]">
            Local
          </a>
        </div>
      </nav>
    </header>
  );
}