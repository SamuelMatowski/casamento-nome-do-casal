"use client";

import { useState } from "react";

export default function PresencaForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

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

      setFeedback("Presença confirmada com sucesso!");
      setName("");
      setPhone("");
      setCpf("");
      setMessage("");
    } catch (error: any) {
      setFeedback(error.message || "Erro ao confirmar presença.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone" />
      <input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mensagem opcional" />

      {feedback && <p>{feedback}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Confirmar presença"}
      </button>
    </form>
  );
}