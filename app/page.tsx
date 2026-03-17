"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import GiftCard from "@/components/GiftCard";
import GiftModal from "@/components/GiftModal";
import { gifts } from "../data/gifts";
import { Gift } from "../models/gift";

export default function Home() {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [giftList, setGiftList] = useState<Gift[]>(gifts);
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [cpf, setCpf] = useState("");
const [message, setMessage] = useState("");
const [loadingRsvp, setLoadingRsvp] = useState(false);
const [rsvpFeedback, setRsvpFeedback] = useState("");

const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoadingRsvp(true);
  setRsvpFeedback("");

  try {
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        cpf,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Erro ao confirmar presença.");
    }

    setRsvpFeedback("Presença confirmada com sucesso!");
    setName("");
    setPhone("");
    setCpf("");
    setMessage("");
  } catch (error: any) {
    setRsvpFeedback(error.message || "Erro ao confirmar presença.");
  } finally {
    setLoadingRsvp(false);
  }
};

useEffect(() => {
  const loadGiftProgress = async () => {
    try {
      const response = await fetch("/api/gifts", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) return;

      setGiftList((prev) =>
        prev.map((gift) => ({
          ...gift,
          paidQuotas: data.paidQuotasByGift[gift.id] || 0,
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar progresso dos presentes:", error);
    }
  };

  loadGiftProgress();
}, []);

  return (
    <main className="bg-[#fcfaf7] text-[#2b2b2b]">
      <Navbar />
      <Hero />
      <Countdown />

      <section id="historia" className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#6a76a1]">
              Nossa História
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Um amor construído com carinho, parceria e muitos momentos
              especiais
            </h2>
            <p className="mt-6 leading-8 text-gray-700">
              Amanda e Nicolas se conheceram no último ano do ensino médio. O que começou de forma simples, entre conversas e convivência diária, acabou se transformando em um relacionamento que já se aproxima de uma década.
Durante os anos de faculdade, os dois passaram boa parte do tempo em cidades diferentes: Amanda em Curitiba e Nicolas grande parte do período em Campo Mourão.  Mesmo com a distância e a rotina intensa dos estudos, o relacionamento seguiu firme ao longo de toda a graduação.
No dia 23 de outubro de 2024, em Maceió, durante o congresso do mestrado da Amanda, Nicolas fez o pedido de noivado.
Agora, perto de completar 10 anos de relacionamento, chega o momento de celebrar essa trajetória e iniciar oficialmente uma nova fase juntos: o casamento. Um dia preparado para reunir familiares e amigos e marcar o início de mais um capítulo dessa história.
            </p>
          </div>

          <div>
            <img
              src="/foto4.png"
              alt="Foto do casal"
              className="h-[500px] w-full rounded-3xl object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      <section id="casamento" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#6a76a1]">
              O Casamento
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Informações importantes
            </h2>
          </div>

         <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  <div className="rounded-2xl bg-[var(--soft-bg)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-xl font-semibold">Data</h3>
    <p className="mt-3 text-lg font-semibold text-[#6a76a1]">
      12 de Abril de 2026
    </p>
  </div>

  <div className="rounded-2xl bg-[var(--soft-bg)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-xl font-semibold">Horário</h3>
    <p className="mt-3 text-lg font-semibold text-[#6a76a1]">
      12:00 às 20:00
    </p>
  </div>

  <div className="rounded-2xl bg-[var(--soft-bg)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-xl font-semibold">Local</h3>
    <p className="mt-3 text-lg font-semibold text-[#6a76a1]">APCEF/PR</p>
    <p className="text-lg font-semibold text-[#6a76a1]">Salão Gourmet 11</p>
  </div>

  <div className="rounded-2xl bg-[var(--soft-bg)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
    <h3 className="text-xl font-semibold">Traje</h3>
    <p className="mt-3 text-lg font-semibold text-[#6a76a1]">Casual</p>
  </div>
</div>
        </div>
      </section>

      <section id="presentes" className="px-6 py-20">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-[#6a76a1]">
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
   {giftList.map((gift) => (
  <GiftCard key={gift.id} gift={gift} onPresent={setSelectedGift} />
))}
    </div>
  </div>
</section>

      <section id="fotos" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#6a76a1]">
              Fotos
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Alguns momentos especiais
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <img
              src="/foto1.png"
              alt="Foto 1"
              className="h-80 w-full rounded-3xl object-cover"
            />
            <img
              src="/foto2.png"
              alt="Foto 2"
              className="h-80 w-full rounded-3xl object-cover"
            />
            <img
              src="/foto3.png"
              alt="Foto 3"
              className="h-80 w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      <section id="presenca" className="px-6 py-20">
  <div className="mx-auto max-w-3xl text-center">
    <p className="text-sm uppercase tracking-[0.25em] text-[#6a76a1]">
      Presença
    </p>

    <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
      Confirme sua presença
    </h2>

    <p className="mt-4 leading-7 text-gray-700">
      Ficaremos muito felizes em celebrar esse momento com você.
    </p>

    <p className="mt-2 leading-7 text-gray-700">
      Lembre-se de inserir os dados de todos os convidados.
    </p>

    <form
      onSubmit={handleRsvpSubmit}
      className="mt-10 space-y-4 rounded-3xl bg-white p-8 text-left shadow-sm"
    >
      <input
        type="text"
        placeholder="Seu nome completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1]"
      />

      <input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1]"
      />

      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1]"
      />

      <textarea
        placeholder="Mensagem opcional"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[140px] w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1]"
      />

      {rsvpFeedback && (
        <p
          className={`text-sm ${
            rsvpFeedback.includes("sucesso")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {rsvpFeedback}
        </p>
      )}

      <button
        type="submit"
        disabled={loadingRsvp}
        className="w-full rounded-full bg-[#6a76a1] px-6 py-4 font-medium text-white transition duration-300 hover:bg-[#596493] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loadingRsvp ? "Enviando..." : "Confirmar presença"}
      </button>
    </form>
  </div>
</section>

      <section id="local" className="bg-white px-6 py-20">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-[#6a76a1]">
        Local
      </p>
      <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
        Como chegar
      </h2>

      <div className="mt-6 space-y-1 text-gray-700">
        <p className="text-lg font-semibold text-[#6a76a1]">APCEF/PR</p>
        <p>Rua Cap. Leônidas Marques, 3020 - Uberaba</p>
        <p>Curitiba/PR - Salão Gourmet 11</p>
      </div>
    </div>

    <div className="mt-10 overflow-hidden rounded-3xl shadow-sm">
      <iframe
        src="https://maps.google.com/maps?hl=pt-BR&q=-25.48869575161709,-49.2095834424517&z=17&output=embed"
        width="100%"
        height="420"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

    <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
      <a
        href="https://www.google.com/maps/search/?api=1&query=-25.48869575161709,-49.2095834424517"
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-full border border-[#6a76a1] px-6 py-3 font-medium text-[#6a76a1] transition duration-300 hover:bg-[#6a76a1] hover:text-white"
      >
        Ver entrada exata
      </a>

      <a
        href="https://www.google.com/maps/dir/?api=1&destination=-25.48869575161709,-49.2095834424517"
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-full bg-[#6a76a1] px-6 py-3 font-medium text-white transition duration-300 hover:bg-[#596493]"
      >
        Traçar rota
      </a>
    </div>
  </div>
</section>

      <footer className="bg-[#2b2b2b] px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="text-2xl font-semibold">Amanda & Nicolas</h3>
          <p className="mt-3 text-white/80">12 de Abril de 2026</p>
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

<div className="mt-10 border-t border-white/20 pt-6 text-sm text-white/60">
  <p>
    Developed by Samuel Lorenzo Matowski • Gostou do site?{" "}
    <a
      href="https://wa.me/5541996736548"
      target="_blank"
      rel="noreferrer"
      className="underline transition hover:text-white"
    >
       Fale comigo
    </a>
  </p>
</div>
        </div>
      </footer>
      {selectedGift && (
  <GiftModal
    gift={selectedGift}
    isOpen={true}
    onClose={async () => {
      setSelectedGift(null);

      try {
        const response = await fetch("/api/gifts", {
          cache: "no-store",
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setGiftList((prev) =>
            prev.map((gift) => ({
              ...gift,
              paidQuotas: data.paidQuotasByGift[gift.id] || 0,
            }))
          );
        }
      } catch (error) {
        console.error("Erro ao atualizar presentes:", error);
      }
    }}
  />
)}
    </main>
  );
}