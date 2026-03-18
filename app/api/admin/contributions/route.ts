import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("casamento");
    const contributions = await db
      .collection("contributions")
      .find({ status: "confirmado" })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, contributions });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
