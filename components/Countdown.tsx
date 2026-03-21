"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown() {
  const weddingDate = new Date("2026-04-12T12:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = weddingDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <section className="bg-[var(--soft-bg)] px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">

        {/* Label decorativo */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-[#6a76a1]/40" />
          <p className="font-[family-name:var(--font-jost)] text-xs uppercase tracking-[0.3em] text-[var(--primary)]">
            Contagem regressiva
          </p>
          <div className="h-px w-10 bg-[#6a76a1]/40" />
        </div>

        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
          Faltam poucos dias para o nosso grande momento
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {units.map(({ value, label }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-2xl bg-white px-4 py-8 shadow-sm"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-[#6a76a1]/30" />
              <p className="font-[family-name:var(--font-playfair)] text-5xl font-semibold text-[var(--primary)]">
                {String(value).padStart(2, "0")}
              </p>
              <span className="mt-2 block font-[family-name:var(--font-jost)] text-xs uppercase tracking-widest text-gray-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
