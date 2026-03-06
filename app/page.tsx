import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import GiftCard from "@/components/GiftCard";

export default function Home() {
  return (
    <main className="bg-[#fcfaf7] text-[#2b2b2b]">
      <Navbar />
      <Hero />
      <Countdown />

      <section id="historia" className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#9a7b4f]">
              Nossa História
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Um amor construído com carinho, parceria e muitos momentos
              especiais
            </h2>
            <p className="mt-6 leading-8 text-gray-700">
              Nossa história começou de uma forma simples, mas cheia de
              significado. Entre conversas, risadas e momentos inesquecíveis,
              fomos construindo algo muito especial.
            </p>
            <p className="mt-4 leading-8 text-gray-700">
              Depois de tudo o que vivemos juntos, decidimos dar o próximo passo
              e celebrar esse grande dia com as pessoas que amamos.
            </p>
          </div>

          <div>
            <img
              src="/foto1.jpg"
              alt="Foto do casal"
              className="h-[500px] w-full rounded-3xl object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      <section id="casamento" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#9a7b4f]">
              O Casamento
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Informações importantes
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-[#f8f5ef] p-6">
              <h3 className="text-xl font-semibold">Cerimônia</h3>
              <p className="mt-3 text-gray-700">11 de Abril de 2026</p>
              <p className="text-gray-700">19:00</p>
            </div>

            <div className="rounded-2xl bg-[#f8f5ef] p-6">
              <h3 className="text-xl font-semibold">Recepção</h3>
              <p className="mt-3 text-gray-700">Logo após a cerimônia</p>
            </div>

            <div className="rounded-2xl bg-[#f8f5ef] p-6">
              <h3 className="text-xl font-semibold">Local</h3>
              <p className="mt-3 text-gray-700">Espaço Garden Eventos</p>
              <p className="text-gray-700">Rua Exemplo, 123</p>
            </div>

            <div className="rounded-2xl bg-[#f8f5ef] p-6">
              <h3 className="text-xl font-semibold">Traje</h3>
              <p className="mt-3 text-gray-700">Esporte fino</p>
            </div>
          </div>
        </div>
      </section>

      <section id="presentes" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#9a7b4f]">
              Lista de Presentes
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Sugestões para nos presentear
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-700">
              Criamos algumas sugestões com muito carinho. Os presentes são
              simbólicos e nos ajudarão a viver esse novo capítulo com ainda
              mais alegria.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GiftCard name="Jantar romântico" price="150,00" />
<GiftCard name="Passeio especial" price="200,00" />
<GiftCard name="Jogo de panelas" price="300,00" />
<GiftCard name="Lua de mel" price="500,00" />
<GiftCard name="Sofá novo" price="1000,00" />
<GiftCard name="Garrafa de vinho" price="120,00" />
<GiftCard name="Passagem de Avião" price="3000,00" /> 
<GiftCard name="Passeios Turísticos" price="200,00" />
<GiftCard name="Kit de Peças da KitchenAid" price="550,00" />
<GiftCard name="Geladeira " price="4000,00" />
<GiftCard name="Ayr Frier" price="400,00" />
<GiftCard name="Kit de Talheres" price="200,00" />
          </div>
        </div>
      </section>

      <section id="fotos" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#9a7b4f]">
              Fotos
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Alguns momentos especiais
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <img
              src="/foto1.jpg"
              alt="Foto 1"
              className="h-80 w-full rounded-3xl object-cover"
            />
            <img
              src="/foto2.jpg"
              alt="Foto 2"
              className="h-80 w-full rounded-3xl object-cover"
            />
            <img
              src="/foto3.jpg"
              alt="Foto 3"
              className="h-80 w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      <section id="presenca" className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#9a7b4f]">
            Presença
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Confirme sua presença
          </h2>
          <p className="mt-4 leading-7 text-gray-700">
            Ficaremos muito felizes em celebrar esse momento com você.
          </p>

          <form className="mt-10 space-y-4 rounded-3xl bg-white p-8 text-left shadow-sm">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#9a7b4f]"
            />
            <input
              type="text"
              placeholder="Telefone"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#9a7b4f]"
            />
            <input
              type="number"
              placeholder="Quantas pessoas irão?"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#9a7b4f]"
            />
            <textarea
              placeholder="Mensagem opcional"
              className="min-h-[140px] w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#9a7b4f]"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-[#9a7b4f] px-6 py-4 font-medium text-white transition hover:opacity-90"
            >
              Confirmar presença
            </button>
          </form>
        </div>
      </section>

      <section id="local" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#9a7b4f]">
              Local
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Como chegar
            </h2>
            <p className="mt-4 text-gray-700">Espaço Garden Eventos</p>
            <p className="text-gray-700">Rua Exemplo, 123 - Cidade / Estado</p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-[#9a7b4f] px-6 py-3 font-medium text-[#9a7b4f] transition hover:bg-[#9a7b4f] hover:text-white"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#2b2b2b] px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="text-2xl font-semibold">Nicolas & Amanda</h3>
          <p className="mt-3 text-white/80">11 de Abril de 2026</p>
          <p className="mt-4 text-white/80">
            Estamos ansiosos para celebrar esse momento com vocês.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <a href="#historia">Nossa História</a>
            <a href="#casamento">O Casamento</a>
            <a href="#presentes">Presentes</a>
            <a href="#presenca">Presença</a>
            <a href="#local">Local</a>
          </div>
        </div>
      </footer>
    </main>
  );
}