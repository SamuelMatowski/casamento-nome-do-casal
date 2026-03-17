import type { Gift } from "../models/gift";

type GiftCardProps = {
  gift: Gift;
  onPresent: (gift: Gift) => void;
};

export default function GiftCard({ gift, onPresent }: GiftCardProps) {
  const remainingQuotas = gift.totalQuotas - gift.paidQuotas;
  const progress = (gift.paidQuotas / gift.totalQuotas) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="h-64 w-full overflow-hidden bg-gray-100">
        <img
          src={gift.image}
          alt={gift.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">{gift.name}</h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {gift.description}
        </p>

        <p className="mt-4 text-lg font-medium text-[#6a76a1]">
          R$ {gift.totalValue.toFixed(2)}
        </p>

        <p className="mt-2 text-sm text-gray-700">
          {gift.totalQuotas} cotas de R$ {gift.quotaValue.toFixed(2)}
        </p>

        <p className="mt-2 text-sm text-gray-700">
          {gift.paidQuotas}/{gift.totalQuotas} cotas confirmadas
        </p>

        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#e4e8f3]">
          <div
            className="h-full rounded-full bg-[#6a76a1] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Restam {remainingQuotas} cotas
        </p>

        <button
  onClick={() => onPresent(gift)}
  disabled={remainingQuotas <= 0}
  className="mt-6 inline-block rounded-full bg-[#6a76a1] px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-[#596493] disabled:cursor-not-allowed disabled:opacity-50"
>
  {remainingQuotas <= 0 ? "Esgotado" : "Presentear"}
</button>
      </div>
    </div>
  );
}