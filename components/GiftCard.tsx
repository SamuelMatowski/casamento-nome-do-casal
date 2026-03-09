type GiftCardProps = {
  title: string;
  description: string;
  price: string;
  link?: string;
};

export default function GiftCard({
  title,
  description,
  price,
  link = "#",
}: GiftCardProps) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
      <p className="text-2xl font-bold text-[#6a76a1]">R$ {price}</p>

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
       className="mt-6 inline-block rounded-full bg-[#6a76a1] px-5 py-3 text-white transition duration-300 hover:bg-[#596493]"
      >
        Presentear
      </a>
    </div>
  );
}