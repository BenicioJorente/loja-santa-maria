"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext"; 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart(); 

  return (
    <>
      <nav className="w-full bg-white border-b border-zinc-100 sticky top-0 z-[90]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* LADO ESQUERDO: MENU MOBILE + LINKS DESKTOP */}
          <div className="flex items-center">
            {/* BOTÃO HAMBÚRGUER (MOBILE) */}
            <button 
              className="md:hidden p-2 text-zinc-600 mr-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </button>

            {/* LINKS (DESKTOP) */}
            <div className="hidden md:flex gap-10">
              <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-zinc-800 hover:text-[#8C7355] transition font-medium">Início</Link>
              <Link href="/shop" className="text-[10px] uppercase tracking-[0.3em] text-zinc-800 hover:text-[#8C7355] transition font-medium">Coleções</Link>
              <Link href="/sobre" className="text-[10px] uppercase tracking-[0.3em] text-zinc-800 hover:text-[#8C7355] transition font-medium">Sobre Nós</Link>
            </div>
          </div>

          {/* LADO DIREITO: SACOLA */}
          <div className="flex items-center">
            <button 
              onClick={openCart} 
              className="p-2 hover:opacity-60 transition relative group"
            >
              <ShoppingBag size={20} strokeWidth={1.2} className="text-zinc-800 group-hover:text-[#8C7355] transition" />
              
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-[#8C7355] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MENU MOBILE EXPANSÍVEL */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-zinc-50 py-8 px-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="text-[11px] uppercase tracking-[0.4em] font-medium py-2 border-b border-zinc-50"
            >
              Início
            </Link>
            <Link 
              href="/shop" 
              onClick={() => setIsMenuOpen(false)}
              className="text-[11px] uppercase tracking-[0.4em] font-medium py-2 border-b border-zinc-50"
            >
              Coleções
            </Link>
            <Link 
              href="/sobre" 
              onClick={() => setIsMenuOpen(false)}
              className="text-[11px] uppercase tracking-[0.4em] font-medium py-2 border-b border-zinc-50"
            >
              Sobre
            </Link>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  );
}