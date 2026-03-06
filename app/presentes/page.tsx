import Navbar from "@/components/Navbar";
import GiftCard from "@/components/GiftCard";

export default function Presentes() {
  return (
    <main>
      <Navbar />

      <section className="px-6 py-16">
        <h1 className="mb-10 text-center text-4xl font-bold">
          Lista de Presentes
        </h1>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GiftCard name="Jantar romântico" price="150,00" />
          <GiftCard name="Passeio especial" price="200,00" />
          <GiftCard name="Jogo de panelas" price="300,00" />
          <GiftCard name="Lua de mel" price="500,00" />
          
        </div>
      </section>
    </main>
  );
}