import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await sql`INSERT INTO nick_clicks DEFAULT VALUES`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
