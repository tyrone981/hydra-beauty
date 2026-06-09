// app/admin/page.tsx
import Link from "next/link";
import AdminLogoutButton from "../components/AdminLogoutButton";



export const runtime = "nodejs";

export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-[#0d1a1c] text-[#f0e8dd] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Admin dashboard</h1>
          <AdminLogoutButton />
        </div>

        <p className="text-sm text-gray-400 mb-8">
          Gérez vos produits, services et formations depuis cet espace.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products"
            className="px-4 py-3 rounded-lg border border-[#b89a6e]/40 text-sm hover:border-[#b89a6e]"
          >
            Gérer les produits
          </Link>
          <Link
            href="/admin/services"
            className="px-4 py-3 rounded-lg border border-[#b89a6e]/40 text-sm hover:border-[#b89a6e]"
          >
            Gérer les services
          </Link>
          <Link
            href="/admin/formations"
            className="px-4 py-3 rounded-lg border border-[#b89a6e]/40 text-sm hover:border-[#b89a6e]"
          >
            Gérer les formations
          </Link>
        </div>
      </div>
    </main>
  );
}