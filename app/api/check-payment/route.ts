import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("id");

    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: "ID do pagamento não informado." },
        { status: 400 }
      );
    }

    const token = process.env.MP_ACCESS_TOKEN?.trim();
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token não configurado." },
        { status: 500 }
      );
    }

    const mpRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    const data = await mpRes.json();

    return NextResponse.json({
      success: true,
      status: data.status,
      statusDetail: data.status_detail,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Erro interno." },
      { status: 500 }
    );
  }
}
