import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function getPaymentFromMP(paymentId: string) {
  const token = process.env.MP_ACCESS_TOKEN?.trim();
  const res = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  return res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const topic = body.type || body.topic;
    const paymentId =
      body.data?.id || body.id || String(body.resource || "").split("/").pop();

    if (topic !== "payment" || !paymentId) {
      return NextResponse.json({ received: true });
    }

    const payment = await getPaymentFromMP(String(paymentId));

    if (payment.status === "approved") {
      const meta = payment.metadata || {};

      const client = await clientPromise;
      const db = client.db("casamento");
      const collection = db.collection("contributions");

      // Evita duplicata: só insere se não existir contribuição com esse paymentId
      const existing = await collection.findOne({
        paymentId: String(paymentId),
      });

      if (!existing) {
        await collection.insertOne({
          giftId: meta.gift_id || "",
          giftName: meta.gift_name || payment.description || "",
          giverName: meta.guest_name || "",
          pixPayerName: payment.payer?.first_name || "",
          message: meta.message || "",
          quotaQuantity: Number(meta.quota_quantity) || 1,
          totalValue: Number(payment.transaction_amount) || 0,
          status: "confirmado",
          paymentId: String(paymentId),
          createdAt: new Date(),
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ received: true });
  }
}
