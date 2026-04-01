"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

// Função para buscar todos os produtos do Shopify
async function getAllProducts() {
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 50) {
            nodes {
              id
              title
              handle
              productType
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                nodes {
                  id
                }
              }
              images(first: 1) {
                nodes {
                  url
                }
              }
            }
          }
        }
      `,
    }),
  });

  const json = await res.json();
  return json.data.products.nodes;
}

const CATEGORIAS = ["Todos", "Festa", "Casual", "Noite"];

export default function ShopPage() {
  const [vestidos, setVestidos] = useState<any[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [termoBusca, setTermoBusca] = useState("");
  const { addToCart } = useCart();

  // Busca os produtos ao carregar a página
  useEffect(() => {
    getAllProducts().then(setVestidos).catch(console.error);
  }, []);

  const vestidosFiltrados = vestidos.filter((item) => {
    const atendeCategoria = filtroAtivo === "Todos" || item.productType === filtroAtivo;
    const atendeBusca = item.title.toLowerCase().includes(termoBusca.toLowerCase());
    return atendeCategoria && atendeBusca;
  });

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-4xl mb-4 italic tracking-tight font-light text-[#1A1A1A]">A Coleção de Vestidos</h1>
        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.5em] font-bold">Curadoria Santa Maria Atelier</p>
      </header>

      {/* FILTROS E BUSCA */}
      <div className="flex flex-col items-center gap-8 mb-20">
        <div className="w-full max-w-sm relative">
          <input 
            type="text"
            placeholder="Buscar por cor, modelo..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full bg-transparent border-b border-zinc-200 py-2 text-sm focus:outline-none focus:border-black transition-colors font-light text-center placeholder:italic placeholder:text-zinc-300"
          />
        </div>

        <div className="flex justify-center gap-10 border-b border-zinc-500/10 pb-6 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltroAtivo(cat)}
              className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-300 relative pb-2 ${
                filtroAtivo === cat ? "text-black font-bold" : "text-zinc-400 hover:text-black"
              }`}
            >
              {cat}
              {filtroAtivo === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {vestidosFiltrados.map((item) => (
          <div key={item.id} className="group flex flex-col">
            
            {/* CONTAINER DA IMAGEM */}
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-4 shadow-sm">
              <Link href={`/product/${item.handle}`} className="relative block w-full h-full z-0">
                <img 
                  src={item.images.nodes[0]?.url || "/images/placeholder.jpg"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
              </Link>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({
                    variantId: item.variants.nodes[0].id,
                    title: item.title,
                    price: item.priceRange.minVariantPrice.amount,
                    image: item.images.nodes[0]?.url,
                    quantity: 1
                  });
                }}
                className="hidden md:block absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-black text-[9px] uppercase tracking-[0.2em] py-4 z-30 font-bold hover:bg-black hover:text-white transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
              >
                Adicionar à Sacola
              </button>
            </div>

            {/* BOTÃO MOBILE */}
            <button 
              onClick={() => addToCart({
                variantId: item.variants.nodes[0].id,
                title: item.title,
                price: item.priceRange.minVariantPrice.amount,
                image: item.images.nodes[0]?.url,
                quantity: 1
              })}
              className="md:hidden w-full bg-[#1A1A1A] text-white text-[9px] uppercase tracking-[0.2em] py-4 mb-4 font-bold active:scale-95 transition-all"
            >
              Adicionar à Sacola
            </button>
            
            {/* INFO DO PRODUTO */}
            <div className="flex justify-between items-start pt-3 border-t border-zinc-100">
              <div>
                <Link href={`/product/${item.handle}`}>
                  <h3 className="font-serif text-lg tracking-tight text-[#1A1A1A] hover:italic transition-all cursor-pointer">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-zinc-400 text-[9px] uppercase tracking-widest mt-1 font-medium italic">
                  {item.productType || 'Atelier'} — Peça Exclusiva
                </p>
              </div>
              <p className="font-light text-zinc-900 text-sm tracking-wide">
                {new Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: item.priceRange.minVariantPrice.currencyCode 
                }).format(Number(item.priceRange.minVariantPrice.amount))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}