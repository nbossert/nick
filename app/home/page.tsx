"use client";
import { useState } from "react";

export default function Home() {
  const [label1, setLabel1] = useState("Welcome to my world");
  const [label2, setLabel2] = useState("Tate");

  async function clickWorld() {
    await fetch("/api/nick-click", { method: "POST" });
    setLabel1("Thanks for visiting!");
  }

  async function clickTate() {
    await fetch("/api/tate-click", { method: "POST" });
    setLabel2("Clicked!");
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <button
        onClick={clickWorld}
        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        {label1}
      </button>

      <button
        onClick={clickTate}
        className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
      >
        {label2}
      </button>
    </main>
  );
}
