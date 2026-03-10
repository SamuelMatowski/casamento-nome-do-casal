import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const scriptUrl = "https://script.google.com/macros/s/AKfycbw4aDqb07zcrQ4eUhh77PhCmw9eNIt5nwPZYQ0umLsV-_sHED7V6EoYnOjNpGC7rcaw4w/exec";

    const formData = new FormData();
    formData.append("giftId", body.giftId || "");
    formData.append("giftName", body.giftName || "");
    formData.append("giverName", body.giverName || "");
    formData.append("pixPayerName", body.pixPayerName || "");
    formData.append("message", body.message || "");
    formData.append("quotaQuantity", String(body.quotaQuantity || ""));
    formData.append("totalValue", String(body.totalValue || ""));
    formData.append("status", body.status || "pendente");

    const response = await fetch(scriptUrl, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();

    console.log("Resposta bruta do Google Script:", text);

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