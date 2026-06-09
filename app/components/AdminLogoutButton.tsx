"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs md:text-sm rounded-lg border border-red-500 px-3 py-1.5 text-red-400 hover:bg-red-500 hover:text-white transition"
    >
      Logout
    </button>
  );
}