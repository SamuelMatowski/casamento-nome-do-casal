export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <div className="absolute inset-0">
        <img
          src="/casal.jpg"
          alt="Foto do casal"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#6a76a1]/60"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl animate-[fadeUp_1s_ease-out] text-center text-white">
        <p className="mb-4 text-sm uppercase tracking-[0.35em]">
          Estamos nos casando
        </p>

        <h1 className="text-5xl font-semibold md:text-7xl">
          Nicolas & Amanda
        </h1>

        <p className="mt-5 text-lg md:text-2xl">12 de Abril de 2026</p>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
          Com imensa alegria, convidamos vocês para compartilhar conosco o início
          deste capítulo de nossas vidas.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#presenca"
            className="rounded-full bg-[#6a76a1] px-8 py-4 font-medium text-white transition duration-300 hover:bg-[#596493]"
          >
            Confirmar presença
          </a>

          <a
            href="#presentes"
           className="rounded-full bg-[#6a76a1] px-8 py-4 font-medium text-white transition duration-300 hover:bg-[#596493]"
          >
            Lista de presentes
          </a>
        </div>
      </div>
    </section>
  );
}