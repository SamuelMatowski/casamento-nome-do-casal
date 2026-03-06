import Navbar from "@/components/Navbar";

export default function Presenca() {
  return (
    <main>
      <Navbar />

      <section className="px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">Confirme sua presença</h1>

        <form className="mx-auto mt-10 flex max-w-md flex-col gap-4">
          <input
            type="text"
            placeholder="Seu nome"
            className="rounded-lg border p-3"
          />
          <input
            type="text"
            placeholder="Telefone"
            className="rounded-lg border p-3"
          />
          <input
            type="number"
            placeholder="Quantas pessoas vão?"
            className="rounded-lg border p-3"
          />

          <button className="rounded-lg bg-black p-3 text-white">
            Confirmar presença
          </button>
        </form>
      </section>
    </main>
  );
}