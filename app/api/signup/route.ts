import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name } = await request.json();

  if (!name?.trim()) {
    return NextResponse.json({ ok: false, msg: "Name required" }, { status: 400 });
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name text UNIQUE NOT NULL,
        created_at timestamptz DEFAULT now()
      );
    `;
    await sql`INSERT INTO users (name) VALUES (${name}) ON CONFLICT DO NOTHING`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
