"use client";

import { useEffect, useState } from "react";
import { Gift } from "../models/gift";

type GiftModalProps = {
  gift: Gift | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function GiftModal({
  gift,
  isOpen,
  onClose,
}: GiftModalProps) {
  const [giverName, setGiverName] = useState("");
  const [pixPayerName, setPixPayerName] = useState("");
  const [message, setMessage] = useState("");
  const [quotaQuantity, setQuotaQuantity] = useState(1);

  useEffect(() => {
    if (gift) {
      setQuotaQuantity(1);
      setGiverName("");
      setPixPayerName("");
      setMessage("");
    }
  }, [gift]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !gift) return null;

  const selectedGift = gift;
  const remainingQuotas = selectedGift.totalQuotas - selectedGift.paidQuotas;
  const totalValue = quotaQuantity * selectedGift.quotaValue;

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const contribution = {
    giftId: selectedGift.id,
    giftName: selectedGift.name,
    giverName,
    pixPayerName,
    message,
    quotaQuantity,
    totalValue,
    status: "pendente",
  };

  try {
    const response = await fetch("/api/contributions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contribution),
    });

    const result = await response.json();

    if (result.success) {
      alert(
        `Pedido registrado!\n\nPresente: ${selectedGift.name}\nNome: ${giverName}\nCotas: ${quotaQuantity}\nTotal: R$ ${totalValue.toFixed(
          2
        )}`
      );

      onClose();
    } else {
      alert("Não foi possível registrar o presente.");
     console.error("Erro completo:", result);
alert(`Erro: ${result.error || JSON.stringify(result)}`);
    }
  } catch (error) {
    alert("Erro ao enviar os dados. Tente novamente.");
    console.error(error);
  }
}

  async function copyPixKey() {
    const pixKey = "email@exemplo.com"; // troque pelo PIX real

    try {
      await navigator.clipboard.writeText(pixKey);
      alert("Chave PIX copiada!");
    } catch {
      alert("Não foi possível copiar a chave PIX.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#6a76a1]">
              Presentear
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{selectedGift.name}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-gray-500 transition hover:bg-gray-100"
          >
            Fechar
          </button>
        </div>

        <p className="mt-4 text-gray-600">{selectedGift.description}</p>

        <div className="mt-6 rounded-2xl bg-[#f5f7fc] p-4">
          <p className="text-sm text-gray-700">
            Valor da cota:{" "}
            <strong>R$ {selectedGift.quotaValue.toFixed(2)}</strong>
          </p>
          <p className="mt-1 text-sm text-gray-700">
            Cotas disponíveis: <strong>{remainingQuotas}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Seu nome"
            value={giverName}
            onChange={(e) => setGiverName(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1]"
          />

          <input
            type="text"
            placeholder="Nome do pagador no PIX (opcional)"
            value={pixPayerName}
            onChange={(e) => setPixPayerName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1]"
          />

          <textarea
            placeholder="Mensagem carinhosa"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1]"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Quantidade de cotas
            </label>
            <input
              type="number"
              min={1}
              max={remainingQuotas}
              value={quotaQuantity}
              onChange={(e) => setQuotaQuantity(Number(e.target.value))}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1]"
            />
          </div>

          <div className="rounded-2xl bg-[#f5f7fc] p-4">
            <p className="text-sm text-gray-700">Total a pagar</p>
            <p className="mt-1 text-2xl font-bold text-[#6a76a1]">
              R$ {totalValue.toFixed(2)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#dbe1f0] p-4">
            <p className="text-sm font-medium text-gray-700">
              PIX para pagamento
            </p>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="break-all text-sm text-gray-600">
                email@exemplo.com
              </span>

              <button
                type="button"
                onClick={copyPixKey}
                className="rounded-lg bg-[#6a76a1] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#596493]"
              >
                Copiar
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Favorecido: Nicolas e Amanda
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Faça o PIX no valor exato para facilitar a confirmação.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#6a76a1] px-6 py-4 font-medium text-white transition duration-300 hover:bg-[#596493]"
          >
            Confirmar intenção de presente
          </button>
        </form>
      </div>
    </div>
  );
}