"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Gift } from "../models/gift";
import { generatePixPayload } from "../lib/pix";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");

  useEffect(() => {
    if (gift && isOpen) {
      setQuotaQuantity(1);
      setGiverName("");
      setPixPayerName("");
      setMessage("");
      setIsSubmitting(false);
      setCopyFeedback("");
    }
  }, [gift, isOpen]);

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
  const remainingQuotas = Math.max(
    0,
    selectedGift.totalQuotas - selectedGift.paidQuotas
  );
  const totalValue = quotaQuantity * selectedGift.quotaValue;

  const pixPayload = generatePixPayload({
    pixKey: "+5541996784810",
    receiverName: "Amanda Venancio Trisotto",
    receiverCity: "Curitiba",
    amount: totalValue,
    description: `Presente ${selectedGift.name}`,
    txid: `${selectedGift.id}-${quotaQuantity}`,
  });

  function handleQuotaChange(value: string) {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      setQuotaQuantity(1);
      return;
    }

    if (numericValue < 1) {
      setQuotaQuantity(1);
      return;
    }

    if (numericValue > remainingQuotas) {
      setQuotaQuantity(remainingQuotas);
      return;
    }

    setQuotaQuantity(numericValue);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSubmitting) return;

    if (!giverName.trim()) {
      alert("Por favor, informe seu nome.");
      return;
    }

    if (quotaQuantity < 1 || quotaQuantity > remainingQuotas) {
      alert("Quantidade de cotas inválida.");
      return;
    }

    setIsSubmitting(true);

    const contribution = {
      giftId: selectedGift.id,
      giftName: selectedGift.name,
      giverName: giverName.trim(),
      pixPayerName: pixPayerName.trim(),
      message: message.trim(),
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
        console.error("Erro completo:", result);
        alert(
          `Erro: ${result.error || "Não foi possível registrar o presente."}`
        );
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar os dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyPixCode() {
    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopyFeedback("Pix copiado!");
      setTimeout(() => setCopyFeedback(""), 2000);
    } catch {
      setCopyFeedback("Não foi possível copiar.");
      setTimeout(() => setCopyFeedback(""), 2000);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={isSubmitting ? undefined : onClose}
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
            disabled={isSubmitting}
            className="rounded-full px-3 py-1 text-sm text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
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
            disabled={isSubmitting}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1] disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          <input
            type="text"
            placeholder="Nome do pagador no PIX (opcional)"
            value={pixPayerName}
            onChange={(e) => setPixPayerName(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1] disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          <textarea
            placeholder="Mensagem carinhosa"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            className="min-h-[120px] w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1] disabled:cursor-not-allowed disabled:bg-gray-100"
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
              onChange={(e) => handleQuotaChange(e.target.value)}
              required
              disabled={isSubmitting || remainingQuotas === 0}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#6a76a1] disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div className="rounded-2xl bg-[#f5f7fc] p-4">
            <p className="text-sm text-gray-700">Total a pagar</p>
            <p className="mt-1 text-2xl font-bold text-[#6a76a1]">
              R$ {totalValue.toFixed(2)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#dbe1f0] p-4">
            <p className="text-sm font-medium text-gray-700">Pague via PIX</p>

            <div className="mt-4 flex justify-center rounded-2xl bg-white p-4">
              <QRCodeSVG value={pixPayload} size={220} />
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              Escaneie o QR Code no aplicativo do banco
            </p>

            <p className="mt-2 text-center text-sm text-gray-700">
              Valor: <strong>R$ {totalValue.toFixed(2)}</strong>
            </p>

            <div className="mt-4 rounded-xl bg-[#f5f7fc] p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Pix copia e cola
              </p>
              <p className="mt-2 break-all text-xs text-gray-700">
                {pixPayload}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-600">
                {copyFeedback || "Banco Inter • Amanda Venancio Trisotto"}
              </div>

              <button
                type="button"
                onClick={copyPixCode}
                disabled={isSubmitting}
                className="rounded-lg bg-[#6a76a1] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#596493] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copiar PIX
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Favorecido: Amanda Venancio Trisotto
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Faça o PIX no valor exato para facilitar a confirmação.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || remainingQuotas === 0}
            className="w-full rounded-full bg-[#6a76a1] px-6 py-4 font-medium text-white transition duration-300 hover:bg-[#596493] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Confirmar intenção de presente"}
          </button>
        </form>
      </div>
    </div>
  );
}