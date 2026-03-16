"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Presenca() {
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

  return (
    <main>
      <Navbar />

      <section className="px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">sua presença</h1>

       <form
  onSubmit={handleRsvpSubmit}
  className="mt-10 space-y-4 rounded-3xl bg-white p-8 text-left shadow-sm"
>
  <input
    type="text"
    placeholder="Seu nome"
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
      </section>
    </main>
  );
}