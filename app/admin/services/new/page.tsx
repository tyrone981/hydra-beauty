"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    slug: "",
    name: "",
    description: "",
    details: "",
    image: "",
    duration: "",
    price: "",
    category: "",
    available: true,
  });

  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.image) {
      setError("L'image du service est obligatoire.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.price === "" ? null : Number(form.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create service");
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const imageMissing = !form.image;

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">New service</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-xl  p-6">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
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
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="rounded-lg border px-4 py-3"
        />

        <input
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          className="rounded-lg border px-4 py-3"
        />

        <input
          name="price"
          type="number"
          placeholder="Price (FCFA)"
          value={form.price}
          onChange={handleChange}
          className="rounded-lg border px-4 py-3"
        />

        {/* current image preview */}
        {form.image && (
          <div className="flex items-center gap-3">
            <img
              src={form.image}
              alt="Service"
              className="w-20 h-20 object-cover rounded border"
            />
            <span className="text-xs text-gray-500 break-all">{form.image}</span>
          </div>
        )}

        {/* upload block */}
        <div className="border rounded px-3 py-3 flex flex-col gap-2">
          <label className="text-sm font-medium">
            Image du service <span className="text-red-500">*</span>
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
          placeholder="Short description"
          value={form.description}
          onChange={handleChange}
          className="min-h-[110px] rounded-lg border px-4 py-3"
          required
        />

        <textarea
          name="details"
          placeholder="Detailed content"
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
          <span>Available</span>
        </label>

        <button
          type="submit"
          disabled={loading || imageMissing}
          className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-60"
        >
          {loading ? "Saving..." : "Create service"}
        </button>
      </form>
    </main>
  );
}