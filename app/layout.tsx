import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "./context/CartContext"
import CartDrawer from "./components/CartDrawer"
import Toast from "./components/Toast"

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geist = Geist({
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hydra Beauty Institute",
  description: "Institut de beauté — Akwa & New-Bell, Douala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
      <body className="antialiased">  {/* ← Removed geist.variable */}
        <CartProvider>
         <CartDrawer />
          <Toast />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}