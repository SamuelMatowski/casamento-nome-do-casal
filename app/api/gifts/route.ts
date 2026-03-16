import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbw4aDqb07zcrQ4eUhh77PhCmw9eNIt5nwPZYQ0umLsV-_sHED7V6EoYnOjNpGC7rcaw4w/exec";

    const response = await fetch(scriptUrl, {
      method: "GET",
      cache: "no-store",
    });

    const text = await response.text();

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { success: false, error: text };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}