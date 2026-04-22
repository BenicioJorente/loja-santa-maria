import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";
import { Metadata } from "next"; // Importe o tipo Metadata

// Adicione este bloco de Metadata aqui:
export const metadata: Metadata = {
  title: "Santa Maria",
  description: "Curadoria Exclusiva",
  icons: {
    icon: "/images/favicon-sm.png", // Caminho para sua pasta public/images
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-[#FAF9F6] antialiased">
        <CartProvider>
          <Suspense fallback={<div className="h-20 w-full bg-white" />}>
            <Navbar />
          </Suspense>

          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}