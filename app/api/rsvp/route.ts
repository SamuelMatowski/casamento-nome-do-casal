import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(); // usa o DB definido na URI

    const result = await db.collection("rsvps").insertOne({
      name: body.name,
      phone: body.phone,
      cpf: body.cpf,
      message: body.message || "",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Erro ao salvar RSVP:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao salvar confirmação de presença.",
      },
      { status: 500 }
    );
  }
}