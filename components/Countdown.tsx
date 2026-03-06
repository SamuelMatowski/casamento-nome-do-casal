"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown() {
  const weddingDate = new Date("2026-04-11T19:00:00").getTime();

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
  }, [weddingDate]);

  return (
    <section className="bg-[#f8f5ef] px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#9a7b4f]">
          Contagem regressiva
        </p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">
          Faltam poucos momentos para o nosso grande dia
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold">{timeLeft.days}</p>
            <span className="mt-2 block text-sm text-gray-600">Dias</span>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold">{timeLeft.hours}</p>
            <span className="mt-2 block text-sm text-gray-600">Horas</span>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold">{timeLeft.minutes}</p>
            <span className="mt-2 block text-sm text-gray-600">Minutos</span>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold">{timeLeft.seconds}</p>
            <span className="mt-2 block text-sm text-gray-600">Segundos</span>
          </div>
        </div>
      </div>
    </section>
  );
}