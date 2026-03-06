export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="text-xl font-semibold tracking-wide">
          Nicolas & Amanda
        </a>

        <div className="hidden gap-6 text-sm md:flex">
          <a href="#historia" className="hover:opacity-70">Nossa História</a>
          <a href="#casamento" className="hover:opacity-70">O Casamento</a>
          <a href="#presentes" className="hover:opacity-70">Presentes</a>
          <a href="#presenca" className="hover:opacity-70">Presença</a>
          <a href="#fotos" className="hover:opacity-70">Fotos</a>
          <a href="#local" className="hover:opacity-70">Local</a>
        </div>
      </nav>
    </header>
  );
}