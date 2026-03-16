import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw4aDqb07zcrQ4eUhh77PhCmw9eNIt5nwPZYQ0umLsV-_sHED7V6EoYnOjNpGC7rcaw4w/exec";

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

async function saveContributionToSheets(data: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }
  await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: formData });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Mercado Pago envia topic=payment quando um pagamento é atualizado
    const topic = body.type || body.topic;
    const paymentId =
      body.data?.id || body.id || String(body.resource || "").split("/").pop();

    if (topic !== "payment" || !paymentId) {
      return NextResponse.json({ received: true });
    }

    const payment = await getPaymentFromMP(String(paymentId));

    if (payment.status === "approved") {
      // Busca os metadados salvos pelo create-payment
      const meta = payment.metadata || {};

      await saveContributionToSheets({
        giftId: meta.gift_id || "",
        giftName: meta.gift_name || payment.description || "",
        giverName: meta.guest_name || "",
        pixPayerName: payment.payer?.first_name || "",
        message: meta.message || "",
        quotaQuantity: String(meta.quota_quantity || "1"),
        totalValue: String(payment.transaction_amount || ""),
        status: "confirmado",
        paymentId: String(paymentId),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Erro no webhook:", error);
    // Sempre retorna 200 para o MP não retentar indefinidamente
    return NextResponse.json({ received: true });
  }
}
