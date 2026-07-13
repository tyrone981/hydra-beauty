"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Formation = {
  _id: string;  // ← Note: MongoDB uses _id, not id
  slug: string;
  title: string;
  available: boolean;
  category: string;
  price: number | null;
  duration: string;
  description: string;
  details: string;
  image: string;
};

export default function AdminFormationsPage() {
  const router = useRouter();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFormations = async () => {
    try {
      const res = await fetch("/api/Formations");
      const data = await res.json();
      setFormations(data);
    } catch (error) {
      console.error("Error fetching formations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!id) {
      alert("ID de formation invalide");
      return;
    }

    if (!confirm("Supprimer cette formation définitivement ?")) return;

    try {
      const res = await fetch(`/api/Formations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      fetchFormations();
      router.refresh();
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <p>Chargement...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Formations</h1>
            <p className="mt-1 text-sm text-gray-400">
              Gérer les formations affichées sur le site.
            </p>
          </div>
          <Link
            href="/admin/Formations/new"
            className="rounded-lg bg-[#b89a6e] px-4 py-2 text-sm font-medium text-[#0d1a1c] hover:bg-[#d1b489] transition"
          >
            + Nouvelle formation
          </Link>
        </div>

        {formations.length === 0 ? (
          <p className="text-sm text-gray-400">
            Aucune formation pour le moment. Créez votre première formation.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formations.map((formation) => (
              <div
                key={formation._id}  // ← Use _id from MongoDB
                className="flex flex-col rounded-xl border border-[#b89a6e]/25 bg-[#111f22] p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#b89a6e]/80">
                  {formation.category || "Formation"}
                </p>
                <h2 className="mt-1 text-base font-semibold text-[#f0e8dd]">
                  {formation.title}
                </h2>
                {formation.price != null && (
                  <p className="mt-1 text-sm text-[#c8beb4]">
                    {formation.price.toLocaleString()} FCFA
                  </p>
                )}
                {formation.duration && (
                  <p className="mt-1 text-xs text-gray-400">
                    Durée: {formation.duration}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  {formation.available ? "Disponible" : "Indisponible"}
                </p>

                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/admin/Formations/${formation._id}/edit`}  // ← Use _id
                    className="flex-1 rounded-lg border border-[#b89a6e]/50 px-3 py-2 text-center text-xs text-[#f0e8dd] hover:border-[#b89a6e]"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(formation._id)}  // ← Pass _id
                    className="flex-1 rounded-lg border border-red-500/50 px-3 py-2 text-center text-xs text-red-400 hover:border-red-500 hover:text-red-300 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}