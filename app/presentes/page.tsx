"use client";

import Navbar from "@/components/Navbar";
import GiftCard from "@/components/GiftCard";
import type { Gift } from "@/models/gift";

const gifts: Gift[] = [
  {
    id: "jantar-romantico",
    name: "Jantar romântico",
    description: "Um jantar especial para celebrarmos esse novo capítulo.",
    totalValue: 150,
    quotaValue: 150,
    totalQuotas: 1,
    paidQuotas: 0,
  },
  {
    id: "passeio-especial",
    name: "Passeio especial",
    description: "Um passeio inesquecível para curtirmos juntos.",
    totalValue: 200,
    quotaValue: 100,
    totalQuotas: 2,
    paidQuotas: 0,
  },
  {
    id: "jogo-de-panelas",
    name: "Jogo de panelas",
    description: "Um presente para começarmos nossa casa com carinho.",
    totalValue: 300,
    quotaValue: 100,
    totalQuotas: 3,
    paidQuotas: 0,
  },
  {
    id: "lua-de-mel",
    name: "Lua de mel",
    description: "Ajude a construir momentos especiais da nossa viagem.",
    totalValue: 500,
    quotaValue: 100,
    totalQuotas: 5,
    paidQuotas: 0,
  },
];

export default function Presentes() {
  function handlePresent(gift: Gift) {
    console.log("Presente selecionado:", gift);
  }

  return (
    <main>
      <Navbar />

      <section className="px-6 py-16">
        <h1 className="mb-10 text-center text-4xl font-bold">
          Lista de Presentes
        </h1>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onPresent={handlePresent}
            />
          ))}
        </div>
      </section>
    </main>
  );
}