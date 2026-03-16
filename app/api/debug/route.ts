import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("casamento");
    const collection = db.collection("contributions");

    const allDocs = await collection.find({}).toArray();

    return NextResponse.json({
      total: allDocs.length,
      documents: allDocs,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
