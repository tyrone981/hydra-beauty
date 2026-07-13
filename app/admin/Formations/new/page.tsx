// app/admin/Formations/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewFormationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    details: "",
    duration: "",
    price: "",
    category: "Formation",
    available: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/Formations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.price === "" ? null : Number(form.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create formation");
      }

      router.push("/admin/Formations");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Nouvelle Formation</h1>
            <p className="mt-1 text-sm text-gray-400">
              Créez une nouvelle formation pour vos clients.
            </p>
          </div>
          <Link
            href="/admin/Formations"
            className="rounded-lg border border-[#b89a6e]/30 px-4 py-2 text-sm text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
          >
            Retour
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[#b89a6e]/25 bg-[#111f22] p-6 shadow-sm">
          <input
            name="title"
            placeholder="Titre de la formation"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#b89a6e]/25 bg-[#0d1a1c] px-4 py-3 text-[#f0e8dd] placeholder:text-gray-500 focus:border-[#b89a6e] focus:outline-none"
            required
          />

          <input
            name="slug"
            placeholder="Slug (ex: formation-soin-visage)"
            value={form.slug}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#b89a6e]/25 bg-[#0d1a1c] px-4 py-3 text-[#f0e8dd] placeholder:text-gray-500 focus:border-[#b89a6e] focus:outline-none"
            required
          />

          <input
            name="category"
            placeholder="Catégorie"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#b89a6e]/25 bg-[#0d1a1c] px-4 py-3 text-[#f0e8dd] placeholder:text-gray-500 focus:border-[#b89a6e] focus:outline-none"
          />

          <input
            name="duration"
            placeholder="Durée (ex: 3 jours, 12 heures)"
            value={form.duration}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#b89a6e]/25 bg-[#0d1a1c] px-4 py-3 text-[#f0e8dd] placeholder:text-gray-500 focus:border-[#b89a6e] focus:outline-none"
          />

          <input
            name="price"
            type="number"
            placeholder="Prix (FCFA)"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#b89a6e]/25 bg-[#0d1a1c] px-4 py-3 text-[#f0e8dd] placeholder:text-gray-500 focus:border-[#b89a6e] focus:outline-none"
          />

          <textarea
            name="description"
            placeholder="Brève description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="min-h-[110px] w-full rounded-lg border border-[#b89a6e]/25 bg-[#0d1a1c] px-4 py-3 text-[#f0e8dd] placeholder:text-gray-500 focus:border-[#b89a6e] focus:outline-none"
            required
          />

          <textarea
            name="details"
            placeholder="Programme détaillé (séparez les modules par des virgules)"
            value={form.details}
            onChange={handleChange}
            rows={4}
            className="min-h-[140px] w-full rounded-lg border border-[#b89a6e]/25 bg-[#0d1a1c] px-4 py-3 text-[#f0e8dd] placeholder:text-gray-500 focus:border-[#b89a6e] focus:outline-none"
          />

          <label className="flex items-center gap-2 text-[#c8beb4]">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              className="h-4 w-4 rounded border-[#b89a6e]/25 bg-[#0d1a1c] text-[#b89a6e] focus:ring-[#b89a6e]"
            />
            <span>Disponible aux inscriptions</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#b89a6e] px-6 py-3 text-sm font-medium text-[#0d1a1c] hover:bg-[#d1b489] transition disabled:opacity-50"
            >
              {loading ? "Enregistrement..." : "Créer la formation"}
            </button>
            <Link
              href="/admin/Formations"
              className="rounded-lg border border-[#b89a6e]/30 px-6 py-3 text-sm text-[#b89a6e] hover:bg-[#b89a6e] hover:text-[#0d1a1c] transition"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}