import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name } = await request.json();
  const { rows } = await sql`SELECT 1 FROM users WHERE name = ${name} LIMIT 1`;
  const found = rows.length > 0;
  return NextResponse.json({ ok: found });
}
