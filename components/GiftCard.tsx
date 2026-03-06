type GiftCardProps = {
  name: string;
  price: string;
};

export default function GiftCard({ name, price }: GiftCardProps) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold">{name}</h3>

      <p className="mt-4 text-lg text-gray-700">R$ {price}</p>

      <button className="mt-4 rounded-full bg-[#9a7b4f] px-5 py-2 text-white">
        Presentear
      </button>
    </div>
  );
}