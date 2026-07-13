"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormationType = {
  id: string;
  slug: string;
  title: string;  // ← Changed from 'name' to 'title'
  description: string;
  details?: string;
  image: string;
  duration?: string;
  price?: number | null;
  category?: string;
  available: boolean;
};

export default function EditFormationForm({ formation }: { formation: FormationType }) {
  const router = useRouter();

  const [form, setForm] = useState({
    slug: formation.slug || "",
    title: formation.title || "",  // ← Changed from 'name' to 'title'
    description: formation.description || "",
    details: formation.details || "",
    image: formation.image || "",
    duration: formation.duration || "",
    price: formation.price != null ? String(formation.price) : "",
    category: formation.category || "Formation",
    available: !!formation.available,
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const handleUploadImage = async () => {
    if (!file) {
      alert("Choisissez un fichier d'abord.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors du téléchargement");
      }

      setForm((prev) => ({
        ...prev,
        image: data.url,
      }));

      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.image) {
      setError("L'image de la formation est obligatoire.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/Formations/${formation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.price === "" ? null : Number(form.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update formation");
      }

      router.push("/admin/Formations");  // ← Changed to capital F
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer cette formation définitivement ?")) return;

    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/Formations/${formation.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete formation");
      }

      router.push("/admin/Formations");  // ← Changed to capital F
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setDeleting(false);
    }
  };

  const imageMissing = !form.image;

  return (
    <form onSubmit={handleUpdate} className="grid gap-4 rounded-xl p-6 border bg-white shadow-sm">
      {error && <p className="text-red-600">{error}</p>}

      <input
        name="title"  // ← Changed from 'name' to 'title'
        placeholder="Titre de la formation"
        value={form.title}  // ← Changed from form.name to form.title
        onChange={handleChange}
        className="rounded-lg border px-4 py-3"
        required
      />

      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
        className="rounded-lg border px-4 py-3"
        required
      />

      <input
        name="category"
        placeholder="Catégorie"
        value={form.category}
        onChange={handleChange}
        className="rounded-lg border px-4 py-3"
      />

      <input
        name="duration"
        placeholder="Durée"
        value={form.duration}
        onChange={handleChange}
        className="rounded-lg border px-4 py-3"
      />

      <input
        name="price"
        type="number"
        placeholder="Prix (FCFA)"
        value={form.price}
        onChange={handleChange}
        className="rounded-lg border px-4 py-3"
      />

      {form.image && (
        <div className="flex items-center gap-3">
          <img
            src={form.image}
            alt="Formation"
            className="w-20 h-20 object-cover rounded border"
          />
          <span className="text-xs text-gray-500 break-all">{form.image}</span>
        </div>
      )}

      <div className="border rounded px-3 py-3 flex flex-col gap-2">
        <label className="text-sm font-medium">
          Image de la formation <span className="text-red-500">*</span>
        </label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          type="button"
          onClick={handleUploadImage}
          disabled={uploading || !file}
          className="mt-1 inline-flex items-center justify-center rounded bg-black px-3 py-2 text-xs font-medium text-white disabled:opacity-60"
        >
          {uploading ? "Téléchargement..." : "Uploader l'image"}
        </button>
        {imageMissing && (
          <p className="mt-1 text-xs text-red-500">
            Veuillez uploader une image avant d&apos;enregistrer.
          </p>
        )}
      </div>

      <textarea
        name="description"
        placeholder="Brève description"
        value={form.description}
        onChange={handleChange}
        className="min-h-[110px] rounded-lg border px-4 py-3"
        required
      />

      <textarea
        name="details"
        placeholder="Programme détaillé"
        value={form.details}
        onChange={handleChange}
        className="min-h-[140px] rounded-lg border px-4 py-3"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={handleChange}
        />
        <span>Disponible</span>
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || imageMissing}
          className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-60"
        >
          {loading ? "Enregistrement..." : "Sauvegarder les modifications"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg border border-red-500 px-5 py-3 text-red-600 disabled:opacity-60"
        >
          {deleting ? "Suppression..." : "Supprimer"}
        </button>
      </div>
    </form>
  );
}