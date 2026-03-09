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

         <button
  className="mt-6 w-full rounded-full bg-[#6a76a1] px-6 py-4 text-white transition duration-300 hover:bg-[#596493]"
>
  Confirmar presença
</button>
        </form>
      </section>
    </main>
  );
}