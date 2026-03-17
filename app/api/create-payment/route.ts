import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = process.env.MP_ACCESS_TOKEN?.trim();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "MP_ACCESS_TOKEN não configurado." },
        { status: 500 }
      );
    }

    const body = await req.json();

    const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        transaction_amount: Number(body.amount),
        description: body.description,
        payment_method_id: "pix",
        external_reference: `${body.giftId}-${Date.now()}`,
        payer: {
          email: body.email,
          first_name: body.name,
        },
        metadata: {
          gift_id: body.giftId || "",
          gift_name: body.description || "",
          guest_name: body.guestName || "",
          message: body.message || "",
          quota_quantity: body.quotaQuantity || 1,
        },
      }),
    });

    const data = await mpRes.json();

    console.log("MP status:", mpRes.status);
    console.log("MP response:", data);

    if (!mpRes.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            data?.cause?.[0]?.description ||
            "Erro Mercado Pago",
          details: data,
        },
        { status: mpRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      paymentId: data.id,
      qr_code: data.point_of_interaction?.transaction_data?.qr_code || "",
      qr_code_base64:
        data.point_of_interaction?.transaction_data?.qr_code_base64 || "",
      ticket_url:
        data.point_of_interaction?.transaction_data?.ticket_url || "",
      status: data.status,
    });
  } catch (error: any) {
    console.error("Erro create-payment:", error);

    return NextResponse.json(
      { success: false, message: error?.message || "Erro interno." },
      { status: 500 }
    );
  }
}