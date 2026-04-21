"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext"; 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart(); 
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      router.push(`/shop?q=${encodeURIComponent(value)}`);
    } else {
      router.push(`/shop`);
    }
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-zinc-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          <div className="flex items-center">
            {/* BOTÃO HAMBÚRGUER (MOBILE) */}
            <button 
              className="md:hidden p-2 text-zinc-600 mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </button>

            {/* LINKS DESKTOP */}
            <div className="hidden md:flex gap-10">
              <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-zinc-800 hover:text-[#8C7355] transition font-medium">Início</Link>
              <Link href="/shop" className="text-[10px] uppercase tracking-[0.3em] text-zinc-800 hover:text-[#8C7355] transition font-medium">Coleções</Link>
              <Link href="/sobre" className="text-[10px] uppercase tracking-[0.3em] text-zinc-800 hover:text-[#8C7355] transition font-medium">Sobre Nós</Link>
            </div>
          </div>

          {/* LADO DIREITO: BUSCA (DESKTOP) + SACOLA */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center relative border-b border-zinc-300 focus-within:border-black transition-all mr-4">
              <Search size={14} className="text-zinc-500 absolute left-0" strokeWidth={2} />
              <input 
                type="text"
                placeholder="O que você está buscando?"
                value={searchTerm}
                onChange={handleSearch}
                className="pl-7 pr-2 py-1 bg-transparent text-[11px] text-zinc-800 focus:outline-none w-44 lg:w-64 placeholder:text-zinc-400 placeholder:italic font-light"
              />
            </div>

            <button 
              onClick={openCart} 
              className="p-2 hover:opacity-60 transition relative group"
            >
              <ShoppingBag size={20} strokeWidth={1.2} className="text-zinc-800 group-hover:text-[#8C7355] transition" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-[#8C7355] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MENU E BUSCA MOBILE */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-zinc-100 absolute w-full left-0 animate-in slide-in-from-top duration-300 shadow-xl">
            <div className="px-8 py-8 flex flex-col gap-6">
              
              {/* CAMPO DE BUSCA NO MOBILE */}
              <div className="flex items-center relative border-b border-zinc-300 pb-2">
                <Search size={16} className="text-zinc-500 absolute left-0" strokeWidth={2} />
                <input 
                  type="text"
                  placeholder="O que você está buscando?"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-8 w-full bg-transparent text-[12px] text-zinc-800 focus:outline-none placeholder:text-zinc-400 italic"
                />
              </div>

              {/* LINKS NO MOBILE */}
              <div className="flex flex-col gap-6 mt-4">
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[11px] uppercase tracking-[0.3em] text-zinc-800 font-medium"
                >
                  Início
                </Link>
                <Link 
                  href="/shop" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[11px] uppercase tracking-[0.3em] text-zinc-800 font-medium"
                >
                  Coleções
                </Link>
                <Link 
                  href="/sobre" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[11px] uppercase tracking-[0.3em] text-zinc-800 font-medium"
                >
                  Sobre Nós
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <CartDrawer />
    </>
  );
}