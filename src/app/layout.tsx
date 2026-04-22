import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";
import { Metadata } from "next"; 
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Santa Maria",
  description: "Santa Maria - feita para mulheres que sabem o seu valor.",
  icons: {
    icon: "/images/favicon-sm.png", 
  },
  openGraph: {
    title: "Santa Maria",
    description: "Santa Maria - feita para mulheres que sabem o seu valor.",
    url: "https://loja-santa-maria.vercel.app/", 
    siteName: "Santa Maria",
    images: [
      {
        url: "/images/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Santa Maria - Curadoria de Moda",
      },
    ],
    locale: "pt_BR",
    type: "website",
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

          <WhatsAppButton />

        </CartProvider>
      </body>
    </html>
  );
}