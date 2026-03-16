import clientPromise from "@/lib/mongodb";

export default async function AdminRsvpsPage() {
  const client = await clientPromise;
  const db = client.db();

  const rsvps = await db
    .collection("rsvps")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <main className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Confirmações de presença</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-4">Nome</th>
              <th className="p-4">Telefone</th>
              <th className="p-4">CPF</th>
              <th className="p-4">Mensagem</th>
              <th className="p-4">Data</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((item: any) => (
              <tr key={String(item._id)} className="border-t border-gray-200">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.cpf}</td>
                <td className="p-4">{item.message}</td>
                <td className="p-4">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString("pt-BR")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}