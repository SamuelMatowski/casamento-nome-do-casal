import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("casamento");
    const collection = db.collection("contributions");

    // Soma as cotas confirmadas agrupadas por giftId
    const pipeline = [
      { $match: { status: "confirmado" } },
      {
        $group: {
          _id: "$giftId",
          totalQuotas: { $sum: "$quotaQuantity" },
        },
      },
    ];

    const results = await collection.aggregate(pipeline).toArray();

    const paidQuotasByGift: Record<string, number> = {};
    for (const row of results) {
      if (row._id) {
        paidQuotasByGift[row._id] = row.totalQuotas;
      }
    }

    return NextResponse.json(
      { success: true, paidQuotasByGift },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Erro ao buscar presentes:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
