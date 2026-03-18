"use client";

import { useEffect, useState } from "react";
import { gifts as initialGifts } from "@/data/gifts";
import type { Gift } from "@/models/gift";

export default function AdminPresentesPage() {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [giverName, setGiverName] = useState("");
  const [quotaQuantity, setQuotaQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [contributions, setContributions] = useState<any[]>([]);

  async function loadData() {
    const res = await fetch(`/api/gifts?t=${Date.now()}`, { cache: "no-store" });
    const data = await res.json();
    if (data.success) {
      const paidQuotasByGift = data.paidQuotasByGift || {};
      setGifts(initialGifts.map((g) => ({ ...g, paidQuotas: paidQuotasByGift[g.id] || 0 })));
    }

    const res2 = await fetch(`/api/admin/contributions?t=${Date.now()}`, { cache: "no-store" });
    const data2 = await res2.json();
    if (data2.success) setContributions(data2.contributions);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleRegistrar() {
    if (!selectedGift || !giverName.trim() || quotaQuantity < 1) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId: selectedGift.id,
          giftName: selectedGift.name,
          giverName: giverName.trim(),
          quotaQuantity,
          totalValue: quotaQuantity * selectedGift.quotaValue,
          status: "confirmado",
          paymentId: `manual-${Date.now()}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Pagamento de ${giverName} registrado com sucesso!`);
        setGiverName("");
        setQuotaQuantity(1);
        setSelectedGift(null);
        loadData();
      } else {
        setMessage("❌ Erro ao registrar pagamento.");
      }
    } catch {
      setMessage("❌ Erro ao registrar pagamento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Admin — Registrar Pagamentos</h1>

      {message && (
        <div className="mb-6 rounded-xl bg-white p-4 shadow text-sm font-medium text-gray-700">
          {message}
        </div>
      )}

      {/* Formulário */}
      <div className="mb-10 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Registrar pagamento recebido</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Presente</label>
            <select
              value={selectedGift?.id || ""}
              onChange={(e) => {
                const g = gifts.find((g) => g.id === e.target.value) || null;
                setSelectedGift(g);
                setQuotaQuantity(1);
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6a76a1]"
            >
              <option value="">Selecione um presente...</option>
              {gifts.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} — {g.paidQuotas}/{g.totalQuotas} cotas pagas — R$ {g.quotaValue.toFixed(2)}/cota
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nome de quem pagou</label>
            <input
              type="text"
              value={giverName}
              onChange={(e) => setGiverName(e.target.value)}
              placeholder="Ex: João e Maria"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6a76a1]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Quantidade de cotas</label>
            <input
              type="number"
              min={1}
              max={selectedGift ? Math.max(selectedGift.totalQuotas - selectedGift.paidQuotas, 1) : 1}
              value={quotaQuantity}
              onChange={(e) => setQuotaQuantity(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6a76a1]"
            />
          </div>

          {selectedGift && (
            <div className="rounded-2xl bg-[#e4e8f3] p-4 text-sm text-gray-700">
              <p><span className="font-semibold">Total recebido:</span> R$ {(quotaQuantity * selectedGift.quotaValue).toFixed(2)}</p>
            </div>
          )}

          <button
            onClick={handleRegistrar}
            disabled={loading || !selectedGift || !giverName.trim()}
            className="w-full rounded-2xl bg-[#6a76a1] px-5 py-3 font-semibold text-white transition hover:bg-[#596493] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registrando..." : "Registrar pagamento"}
          </button>
        </div>
      </div>

      {/* Lista de contribuições */}
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Pagamentos registrados</h2>
        {contributions.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhum pagamento registrado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-3">Presente</th>
                  <th className="p-3">Quem pagou</th>
                  <th className="p-3">Cotas</th>
                  <th className="p-3">Valor</th>
                  <th className="p-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c: any) => (
                  <tr key={String(c._id)} className="border-t border-gray-200">
                    <td className="p-3">{c.giftName}</td>
                    <td className="p-3">{c.giverName || c.pixPayerName || "-"}</td>
                    <td className="p-3">{c.quotaQuantity}</td>
                    <td className="p-3">R$ {Number(c.totalValue).toFixed(2)}</td>
                    <td className="p-3">{c.createdAt ? new Date(c.createdAt).toLocaleString("pt-BR") : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
