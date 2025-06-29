import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // ➊ Ensure the table exists (runs instantly after the first time)
    await sql`
      CREATE TABLE IF NOT EXISTS nick_clicks (
        id serial PRIMARY KEY,
        clicked_at timestamptz DEFAULT now()
      );
    `;

    // ➋ Log this click
    await sql`INSERT INTO nick_clicks DEFAULT VALUES`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
