"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import GiftCard from "@/components/GiftCard";
import GiftModal from "@/components/GiftModal";
import { gifts as initialGifts } from "@/data/gifts";
import type { Gift } from "@/models/gift";

export default function PresentesPage() {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadGiftProgress = useCallback(async () => {
    try {
      const response = await fetch(`/api/gifts?t=${Date.now()}`, {
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

        // Atualiza o gift selecionado no modal também
        setSelectedGift((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            paidQuotas: paidQuotasByGift[prev.id] || 0,
          };
        });
      }
    } catch (error) {
      console.error("Erro ao carregar progresso dos presentes:", error);
    }
  }, []);

  useEffect(() => {
    loadGiftProgress();
  }, [loadGiftProgress]);

  function handlePresent(gift: Gift) {
    setSelectedGift(gift);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedGift(null);
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
          onPaymentConfirmed={loadGiftProgress}
        />
      )}
    </main>
  );
}
