"use client";
import { useState } from "react";

export default function Home() {
  const [label, setLabel] = useState("Welcome to my world");

  async function handleClick() {
    await fetch("/api/nick-click", { method: "POST" });
    setLabel("Thanks for visiting!");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <button
        onClick={handleClick}
        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        {label}
      </button>
    </main>
  );
}
