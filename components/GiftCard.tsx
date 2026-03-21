import type { Gift } from "../models/gift";

type GiftCardProps = {
  gift: Gift;
  onPresent: (gift: Gift) => void;
};

export default function GiftCard({ gift, onPresent }: GiftCardProps) {
  const isEsgotado = gift.forceEsgotado || gift.paidQuotas >= gift.totalQuotas;
  const remainingQuotas = isEsgotado ? 0 : gift.totalQuotas - gift.paidQuotas;
  const progress = isEsgotado ? 100 : (gift.paidQuotas / gift.totalQuotas) * 100;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Barra decorativa no topo */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#6a76a1]/40 to-transparent" />

      <div className="h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={gift.image}
          alt={gift.name}
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-snug">
          {gift.name}
        </h3>

        <p className="mt-2 font-[family-name:var(--font-jost)] text-sm leading-6 text-gray-500">
          {gift.description}
        </p>

        <p className="mt-4 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#6a76a1]">
          R$ {gift.totalValue.toFixed(2)}
        </p>

        <p className="mt-1 font-[family-name:var(--font-jost)] text-xs text-gray-400">
          {gift.totalQuotas} {gift.totalQuotas === 1 ? "cota" : "cotas"} de R$ {gift.quotaValue.toFixed(2)}
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-[family-name:var(--font-jost)] text-xs text-gray-500">
              {isEsgotado ? gift.totalQuotas : gift.paidQuotas}/{gift.totalQuotas} cotas confirmadas
            </span>
            <span className="font-[family-name:var(--font-jost)] text-xs text-gray-400">
              Restam {remainingQuotas}
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e4e8f3]">
            <div
              className="h-full rounded-full bg-[#6a76a1] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => onPresent(gift)}
          disabled={isEsgotado}
          className="mt-5 w-full rounded-full border border-[#6a76a1] px-5 py-2.5 font-[family-name:var(--font-jost)] text-sm font-medium tracking-wide text-[#6a76a1] transition duration-300 hover:bg-[#6a76a1] hover:text-white disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
        >
          {isEsgotado ? "Esgotado" : "Presentear"}
        </button>
      </div>
    </div>
  );
}
