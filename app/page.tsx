"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName]   = useState("");
  const [msg,  setMsg]    = useState("");
  const router            = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setMsg("Name required");

    const res = await fetch(`/api/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();

    if (!data.ok) {
      setMsg(mode === "signin" ? "User not found" : "Signup failed");
      return;
    }

    // persist session locally & go to the game page
    localStorage.setItem("nickUser", name);
    router.push("/home");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-center">
          {mode === "signin" ? "Sign in" : "Sign up"}
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="rounded border px-3 py-2"
        />

        <button className="rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
          {mode === "signin" ? "Sign in" : "Sign up"}
        </button>

        {msg && <p className="text-center text-red-600">{msg}</p>}

        <p
          className="cursor-pointer text-center text-sm text-gray-600 underline"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setMsg("");
          }}
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Have an account? Sign in"}
        </p>
      </form>
    </main>
  );
}
