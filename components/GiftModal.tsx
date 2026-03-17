"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Gift } from "@/models/gift";

type GiftModalProps = {
  gift: Gift;
  isOpen: boolean;
  onClose: () => void;
  onPaymentConfirmed?: () => void;
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
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalAmount = useMemo(() => {
    return quotaQuantity * gift.quotaValue;
  }, [quotaQuantity, gift.quotaValue]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

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
    setPaymentConfirmed(false);
    stopPolling();
  }, [isOpen, gift.id, maxAvailableQuotas, stopPolling]);

  useEffect(() => {
    if (!isOpen) stopPolling();
  }, [isOpen, stopPolling]);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

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
      setPaymentConfirmed(false);

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

      if (quotaQuantity < 1 || quotaQuantity > maxAvailableQuotas) {
        setError("Quantidade de cotas inválida.");
        return;
      }

      setPixData({
        success: true,
        status: "manual_pix",
      });
    } catch (err) {
      console.error("Erro ao preparar PIX manual:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao abrir instruções do PIX.");
      }
    } finally {
      setLoadingPix(false);
    }
  };

  const handleCopyManualPix = async () => {
    try {
      await navigator.clipboard.writeText(
        "0a002fe6-2ec8-43f6-8219-1da41cce3568"
      );
      alert("Chave PIX copiada!");
    } catch (err) {
      console.error(err);
      alert("Não foi possível copiar a chave PIX.");
    }
  };

  const handleClose = () => {
    stopPolling();
    setPixData(null);
    setError("");
    setPaymentConfirmed(false);
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
                    className="h-full rounded-full bg-[#6a76a1] transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {paymentConfirmed && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e4e8f3]">
                <svg
                  className="h-10 w-10 text-[#6a76a1]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#6a76a1]">
                Pagamento confirmado!
              </h3>
              <p className="text-gray-600">
                Obrigado por presentear o casal com{" "}
                <span className="font-semibold">{gift.name}</span>.
              </p>
              <p className="text-sm text-gray-500">
                Sua contribuição foi registrada com sucesso. 🎉
              </p>
              <button
                onClick={handleClose}
                className="mt-4 rounded-full bg-[#6a76a1] px-8 py-3 font-semibold text-white transition hover:bg-[#596493]"
              >
                Fechar
              </button>
            </div>
          )}

          {!pixData && !paymentConfirmed && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nome do convidado
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#6a76a1]"
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
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#6a76a1]"
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
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#6a76a1]"
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
                  className="min-h-[100px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#6a76a1]"
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
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#6a76a1] disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>

              <div className="rounded-2xl bg-[#e4e8f3] p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Resumo:</span> {quotaQuantity}{" "}
                  cota(s) × R$ {gift.quotaValue.toFixed(2)}
                </p>
                <p className="mt-1 text-lg font-bold text-[#6a76a1]">
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
                className="w-full rounded-2xl bg-[#6a76a1] px-5 py-3 font-semibold text-white transition hover:bg-[#596493] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingPix ? "Abrindo instruções..." : "Gerar PIX"}
              </button>
            </div>
          )}

          {pixData && !paymentConfirmed && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#e4e8f3] p-4">
                <p className="text-sm font-semibold text-[#6a76a1]">
                  QR Code temporariamente indisponível
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  Para concluir o presente, faça a transferência via chave PIX
                  abaixo.
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-semibold">Presente:</span> {gift.name}
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  <span className="font-semibold">Total:</span> R${" "}
                  {totalAmount.toFixed(2)}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Chave PIX
                </label>
                <textarea
                  readOnly
                  value="0a002fe6-2ec8-43f6-8219-1da41cce3568"
                  className="min-h-[100px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
                />
                <button
                  onClick={handleCopyManualPix}
                  className="mt-3 w-full rounded-2xl bg-[#6a76a1] px-5 py-3 font-semibold text-white transition hover:bg-[#596493]"
                >
                  Copiar chave PIX
                </button>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Favorecida:</span> Amanda
                  Venancio Trisotto
                </p>
                <p className="mt-2">
                  Após o pagamento, envie o comprovante para os noivos para
                  confirmação.
                </p>
              </div>

              <button
                onClick={() => {
                  stopPolling();
                  setPixData(null);
                  setError("");
                }}
                className="w-full rounded-2xl bg-gray-100 px-5 py-3 font-medium text-gray-800 transition hover:bg-gray-200"
              >
                Voltar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}