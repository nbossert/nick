import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // auto-create the table (runs once, then is instant)
    await sql`
      CREATE TABLE IF NOT EXISTS tate_clicks (
        id serial PRIMARY KEY,
        clicked_at timestamptz DEFAULT now()
      );
    `;

    await sql`INSERT INTO tate_clicks DEFAULT VALUES`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
