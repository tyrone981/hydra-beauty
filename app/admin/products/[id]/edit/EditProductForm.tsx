"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  details?: string;
  image: string;
  badge?: string;
  inStock: boolean;
  images?: string[];
};

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: String(product.price),
    description: product.description,
    details: product.details || "",
    image: product.image,
    badge: product.badge || "",
    inStock: product.inStock,
    images: product.images || [],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product?")) return;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete product");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
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

      // Set main image and add to images array
      setForm((prev) => ({
        ...prev,
        image: data.url,
        images: Array.from(new Set([...(prev.images || []), data.url])),
      }));

      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
      {error && <p className="text-red-600">{error}</p>}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price (FCFA)"
        value={form.price}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        required
      />

      {/* Current image preview */}
      {form.image && (
        <div className="flex items-center gap-3">
          <img
            src={form.image}
            alt="Product"
            className="w-20 h-20 object-cover rounded border"
          />
          <span className="text-xs text-gray-500 break-all">{form.image}</span>
        </div>
      )}

      {/* Upload from device */}
      <div className="border rounded px-3 py-3 flex flex-col gap-2">
        <label className="text-sm font-medium">Changer l&apos;image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          type="button"
          onClick={handleUploadImage}
          disabled={uploading || !file}
          className="mt-1 inline-flex items-center justify-center rounded bg-black px-3 py-2 text-xs font-medium text-white disabled:opacity-60"
        >
          {uploading ? "Téléchargement..." : "Uploader l'image"}
        </button>
      </div>

      <input
        name="badge"
        placeholder="Badge"
        value={form.badge}
        onChange={handleChange}
        className="border rounded px-3 py-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        rows={3}
        required
      />
      <textarea
        name="details"
        placeholder="Details"
        value={form.details}
        onChange={handleChange}
        className="border rounded px-3 py-2"
        rows={3}
      />

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          name="inStock"
          checked={form.inStock}
          onChange={handleChange}
        />
        <span>In stock</span>
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="border border-red-600 text-red-600 px-4 py-2 rounded disabled:opacity-60"
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </form>
  );
}