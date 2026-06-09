
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d1a1c] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[#b89a6e]/30 bg-[#111f22] p-6"
      >
        <h1 className="mb-4 text-xl font-semibold text-[#f0e8dd]">
          Admin login
        </h1>
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-3 w-full rounded-lg border border-[#b89a6e]/30 bg-transparent px-3 py-2 text-sm text-[#f0e8dd]"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border border-[#b89a6e]/30 bg-transparent px-3 py-2 text-sm text-[#f0e8dd]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#b89a6e] px-4 py-2 text-sm font-medium text-[#0d1a1c] disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}