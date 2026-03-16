"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import GiftCard from "@/components/GiftCard";
import GiftModal from "@/components/GiftModal";
import { gifts as initialGifts } from "@/data/gifts";
import type { Gift } from "@/models/gift";

export default function PresentesPage() {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function loadGiftProgress() {
    try {
      const response = await fetch("/api/gifts", {
        cache: "no-store",
      });

      const data = await response.json();

      if (data.success) {
        const paidQuotasByGift = data.paidQuotasByGift || {};

        const updatedGifts = initialGifts.map((gift) => ({
          ...gift,
          paidQuotas: paidQuotasByGift[gift.id] || 0,
        }));

        setGifts(updatedGifts);
      }
    } catch (error) {
      console.error("Erro ao carregar progresso dos presentes:", error);
    }
  }

  useEffect(() => {
    loadGiftProgress();
  }, []);

  function handlePresent(gift: Gift) {
    setSelectedGift(gift);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedGift(null);

    // recarrega a barra quando fechar o modal
    loadGiftProgress();
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

      {selectedGift && (
  <GiftModal
    gift={selectedGift}
    isOpen={isModalOpen}
    onClose={handleCloseModal}
  />
)}
    </main>
  );
}