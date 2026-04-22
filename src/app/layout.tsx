import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" data-theme="light" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body className="bg-#FAF9F6 antialiased" style={{ backgroundColor: '#FAF9F6', color: '#171717' }}>
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