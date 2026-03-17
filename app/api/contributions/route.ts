import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("casamento");
    const collection = db.collection("contributions");

    const contribution = {
      giftId: body.giftId || "",
      giftName: body.giftName || "",
      giverName: body.giverName || "",
      pixPayerName: body.pixPayerName || "",
      message: body.message || "",
      quotaQuantity: Number(body.quotaQuantity) || 0,
      totalValue: Number(body.totalValue) || 0,
      status: body.status || "pendente",
      paymentId: body.paymentId || "",
      createdAt: new Date(),
    };

    // Evita duplicata: só insere se não existir contribuição com esse paymentId
    if (body.paymentId) {
      const existing = await collection.findOne({
        paymentId: String(body.paymentId),
      });
      if (existing) {
        return NextResponse.json({
          success: true,
          message: "Contribuição já registrada anteriormente.",
          id: existing._id,
          duplicate: true,
        });
      }
    }

    const result = await collection.insertOne(contribution);

    return NextResponse.json({
      success: true,
      message: "Contribuição registrada com sucesso.",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Erro ao salvar contribuição:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
