import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbw4aDqb07zcrQ4eUhh77PhCmw9eNIt5nwPZYQ0umLsV-_sHED7V6EoYnOjNpGC7rcaw4w/exec";

    const params = new URLSearchParams({
      giftId: body.giftId || "",
      giftName: body.giftName || "",
      giverName: body.giverName || "",
      pixPayerName: body.pixPayerName || "",
      message: body.message || "",
      quotaQuantity: String(body.quotaQuantity || ""),
      totalValue: String(body.totalValue || ""),
      status: body.status || "pendente",
    });

    // Envia como query params na URL para evitar perda no redirect do Google Script
    const response = await fetch(`${scriptUrl}?${params.toString()}`, {
      method: "POST",
      redirect: "follow",
    });

    const text = await response.text();

    console.log("Resposta bruta do Google Script:", text);
    console.log("Params enviados:", Object.fromEntries(params));

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { success: false, error: text };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Erro na API:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
