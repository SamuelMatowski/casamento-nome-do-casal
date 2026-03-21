export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <div className="absolute inset-0">
        <img
          src="/casal.png"
          alt="Foto do casal"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#3d4a6e]/55"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <p className="mb-3 font-[family-name:var(--font-jost)] text-xs font-light uppercase tracking-[0.45em] text-white/80">
          Estamos nos casando
        </p>

        <h1 className="text-5xl font-semibold md:text-7xl">
          Amanda & Nicolas
        </h1>

        {/* Decorativo */}
        <div className="mx-auto mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-white/50" />
          <p className="font-[family-name:var(--font-jost)] text-lg font-light tracking-widest text-white/90 md:text-xl">
            12 de Abril de 2026
          </p>
          <div className="h-px w-12 bg-white/50" />
        </div>

        <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-jost)] text-base font-light leading-8 text-white/80 md:text-lg">
          Com imensa alegria, convidamos vocês para compartilhar conosco o início
          deste capítulo de nossas vidas.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#presenca"
            className="rounded-full bg-white px-8 py-3.5 font-[family-name:var(--font-jost)] text-sm font-semibold tracking-wide text-[#4a5880] transition duration-300 hover:bg-white/90"
          >
            Confirmar presença
          </a>

          <a
            href="#presentes"
            className="rounded-full border border-white/70 px-8 py-3.5 font-[family-name:var(--font-jost)] text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-white/10"
          >
            Lista de presentes
          </a>
        </div>
      </div>

      {/* Seta scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
