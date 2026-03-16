"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Gift } from "@/models/gift";

type GiftModalProps = {
  gift: Gift;
  isOpen: boolean;
  onClose: () => void;
};

type PixResponse = {
  success: boolean;
  paymentId?: string | number;
  qr_code?: string;
  qr_code_base64?: string;
  ticket_url?: string;
  status?: string;
  message?: string;
};

export default function GiftModal({
  gift,
  isOpen,
  onClose,
}: GiftModalProps) {
  const maxAvailableQuotas = Math.max(gift.totalQuotas - gift.paidQuotas, 0);

  const [guestName, setGuestName] = useState("");
  const [payerName, setPayerName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [quotaQuantity, setQuotaQuantity] = useState(1);

  const [loadingPix, setLoadingPix] = useState(false);
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [error, setError] = useState("");

  const totalAmount = useMemo(() => {
    return quotaQuantity * gift.quotaValue;
  }, [quotaQuantity, gift.quotaValue]);

  useEffect(() => {
    if (!isOpen) return;

    setGuestName("");
    setPayerName("");
    setMessage("");
    setEmail("");
    setQuotaQuantity(maxAvailableQuotas > 0 ? 1 : 0);
    setLoadingPix(false);
    setPixData(null);
    setError("");
  }, [isOpen, gift.id, maxAvailableQuotas]);

  if (!isOpen) return null;

  const handleQuotaChange = (value: number) => {
    if (Number.isNaN(value)) return;

    if (maxAvailableQuotas <= 0) {
      setQuotaQuantity(0);
      return;
    }

    if (value < 1) {
      setQuotaQuantity(1);
      return;
    }

    if (value > maxAvailableQuotas) {
      setQuotaQuantity(maxAvailableQuotas);
      return;
    }

    setQuotaQuantity(value);
  };

  const handleGeneratePix = async () => {
    try {
      setError("");
      setLoadingPix(true);
      setPixData(null);

      if (maxAvailableQuotas <= 0) {
        setError("Este presente já teve todas as cotas preenchidas.");
        return;
      }

      if (!guestName.trim()) {
        setError("Informe o nome do convidado.");
        return;
      }

      if (!payerName.trim()) {
        setError("Informe o nome do pagador no PIX.");
        return;
      }

      if (!email.trim()) {
        setError("Informe o e-mail do pagador.");
        return;
      }

      if (quotaQuantity < 1 || quotaQuantity > maxAvailableQuotas) {
        setError("Quantidade de cotas inválida.");
        return;
      }

      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          description: `${gift.name} - ${quotaQuantity} cota(s)`,
          name: payerName.trim(),
          email: email.trim(),
          guestName: guestName.trim(),
          message: message.trim(),
          giftId: gift.id,
          quotaQuantity,
        }),
      });

      const data: PixResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Não foi possível gerar o PIX.");
      }

      setPixData(data);
    } catch (err) {
      console.error("Erro ao gerar PIX:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao gerar o PIX. Tente novamente.");
      }
    } finally {
      setLoadingPix(false);
    }
  };

  const handleCopyPix = async () => {
    if (!pixData?.qr_code) return;

    try {
      await navigator.clipboard.writeText(pixData.qr_code);
      alert("Código PIX copiado com sucesso.");
    } catch (err) {
      console.error(err);
      alert("Não foi possível copiar o código PIX.");
    }
  };

  const handleClose = () => {
    setPixData(null);
    setError("");
    onClose();
  };

  const progressPercentage =
    gift.totalQuotas > 0
      ? Math.min((gift.paidQuotas / gift.totalQuotas) * 100, 100)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-gray-700 transition hover:bg-black/10"
        >
          Fechar
        </button>

        <div className="p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-5 md:flex-row">
            <div className="relative h-56 w-full overflow-hidden rounded-2xl md:h-48 md:w-72">
              <Image
                src={gift.image}
                alt={gift.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{gift.name}</h2>
              <p className="mt-2 text-sm text-gray-600">{gift.description}</p>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Valor total:</span> R${" "}
                  {gift.totalValue.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Valor por cota:</span> R${" "}
                  {gift.quotaValue.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Cotas pagas:</span>{" "}
                  {gift.paidQuotas} / {gift.totalQuotas}
                </p>
                <p>
                  <span className="font-semibold">Disponíveis:</span>{" "}
                  {maxAvailableQuotas}
                </p>
              </div>

              <div className="mt-4">
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-rose-400 transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {!pixData && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nome do convidado
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-400"
                  placeholder="Ex: João e Maria"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nome do pagador no PIX
                </label>
                <input
                  type="text"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-400"
                  placeholder="Ex: João da Silva"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  E-mail do pagador
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-400"
                  placeholder="Ex: joao@email.com"
                />
                <p className="mt-1 text-xs text-gray-500">
                  O Mercado Pago exige um e-mail no pagador.
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Mensagem
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-400"
                  placeholder="Deixe uma mensagem para o casal"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Quantidade de cotas
                </label>
                <input
                  type="number"
                  min={maxAvailableQuotas > 0 ? 1 : 0}
                  max={maxAvailableQuotas}
                  value={quotaQuantity}
                  onChange={(e) => handleQuotaChange(Number(e.target.value))}
                  disabled={maxAvailableQuotas <= 0}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-rose-400 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>

              <div className="rounded-2xl bg-rose-50 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Resumo:</span> {quotaQuantity}{" "}
                  cota(s) × R$ {gift.quotaValue.toFixed(2)}
                </p>
                <p className="mt-1 text-lg font-bold text-rose-600">
                  Total: R$ {totalAmount.toFixed(2)}
                </p>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleGeneratePix}
                disabled={loadingPix || maxAvailableQuotas <= 0}
                className="w-full rounded-2xl bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingPix ? "Gerando PIX..." : "Gerar PIX"}
              </button>
            </div>
          )}

          {pixData && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-700">
                  PIX gerado com sucesso.
                </p>
                <p className="mt-1 text-sm text-green-700">
                  Presente: {gift.name}
                </p>
                <p className="mt-1 text-sm text-green-700">
                  Total: R$ {totalAmount.toFixed(2)}
                </p>

                {pixData.status && (
                  <p className="mt-1 text-sm text-green-700">
                    Status: <span className="font-semibold">{pixData.status}</span>
                  </p>
                )}

                {pixData.paymentId && (
                  <p className="mt-1 text-xs text-green-700">
                    ID do pagamento: {pixData.paymentId}
                  </p>
                )}
              </div>

              {pixData.qr_code_base64 && (
                <div className="flex justify-center">
                  <img
                    src={`data:image/png;base64,${pixData.qr_code_base64}`}
                    alt="QR Code PIX"
                    className="h-64 w-64 rounded-2xl border border-gray-200 bg-white p-2"
                  />
                </div>
              )}

              {pixData.qr_code && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Código PIX copia e cola
                  </label>
                  <textarea
                    readOnly
                    value={pixData.qr_code}
                    className="min-h-[140px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
                  />
                  <button
                    onClick={handleCopyPix}
                    className="mt-3 w-full rounded-2xl bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-600"
                  >
                    Copiar código PIX
                  </button>
                </div>
              )}

              {pixData.ticket_url && (
                <a
                  href={pixData.ticket_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-2xl border border-gray-300 px-5 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Abrir página do pagamento
                </a>
              )}

              <button
                onClick={() => {
                  setPixData(null);
                  setError("");
                }}
                className="w-full rounded-2xl bg-gray-100 px-5 py-3 font-medium text-gray-800 transition hover:bg-gray-200"
              >
                Gerar outro PIX
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}