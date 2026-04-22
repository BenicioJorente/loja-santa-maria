"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 1. FUNÇÃO DE BUSCA (Mantida no mesmo arquivo)
async function getAllProducts() {
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    next: { revalidate: 0 },
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
              variants(first: 10) {
                nodes {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                }
              }
              images(first: 5) {
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
  return json.data?.products?.nodes || [];
}

const CATEGORIAS = ["Todos", "Festa", "Casual", "Noite"];

// 2. COMPONENTE DE CONTEÚDO (Lógica cliente)
function ShopClientContent() {
  const [initialProducts, setInitialProducts] = useState<any[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const termoBusca = searchParams.get("q") || "";

  useEffect(() => {
    getAllProducts().then(setInitialProducts).catch(console.error);
  }, []);

  const vestidosFiltrados = initialProducts.filter((item) => {
    const atendeCategoria = filtroAtivo === "Todos" || item.productType === filtroAtivo;
    const atendeBusca = item.title.toLowerCase().includes(termoBusca.toLowerCase());
    return atendeCategoria && atendeBusca;
  });

  return (
    <div className="max-w-7xl mx-auto px-8 pt-4 pb-20" style={{ backgroundColor: '#FAF9F6', color: '#171717' }}>
      <header className="mb-6 text-center">
        <h1 className="font-serif text-4xl mb-4 italic tracking-tight font-light text-[#1A1A1A]">
          Nossa coleção
        </h1>
        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.5em] font-bold">
          Loja Santa Maria
        </p>
      </header>

      <div className="flex flex-col items-center gap-4 mb-8">
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
                <span className="absolute bottom-0 left-0 w-full h-1px bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {vestidosFiltrados.length > 0 ? (
          vestidosFiltrados.map((item) => (
            <div key={item.id} className="group flex flex-col">
              <div className="relative aspect-2/3 overflow-hidden bg-[#F9F9F9] mb-3">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={true}
                  pagination={{ clickable: true }}
                  className="h-full w-full inner-product-swiper"
                >
                  {item.images.nodes.map((img: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Link href={`/product/${item.handle}`} className="block w-full h-full">
                        <img
                          src={img.url || "/images/placeholder.jpg"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                          alt={`${item.title} - ${index}`}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      variantId: item.variants.nodes[0].id,
                      title: item.title,
                      price: item.priceRange.minVariantPrice.amount,
                      image: item.images.nodes[0]?.url,
                      quantity: 1,
                    });
                  }}
                  className="hidden md:block absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-black text-[9px] uppercase tracking-[0.2em] py-4 z-30 font-bold hover:bg-black hover:text-white transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  Adicionar à Sacola
                </button>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    variantId: item.variants.nodes[0].id,
                    title: item.title,
                    price: item.priceRange.minVariantPrice.amount,
                    image: item.images.nodes[0]?.url,
                    quantity: 1,
                  })
                }
                className="md:hidden w-full bg-[#1A1A1A] text-white text-[9px] uppercase tracking-[0.2em] py-3 mb-3 font-bold active:scale-95 transition-all"
              >
                Adicionar à Sacola
              </button>

              <div className="flex flex-col pt-2">
                <div className="flex gap-1.5 mb-2">
                  {Array.from(
                    new Set(
                      item.variants.nodes.flatMap((v: any) =>
                        v.selectedOptions
                          .filter((opt: any) => opt.name.toLowerCase() === "cor" || opt.name.toLowerCase() === "color")
                          .map((opt: any) => opt.value)
                      )
                    )
                  ).map((cor: any) => (
                    <div
                      key={cor}
                      className="w-2.5 h-2.5 rounded-full border border-zinc-200"
                      style={{
                        backgroundColor:
                          cor.toLowerCase() === 'preto' ? '#000' :
                          cor.toLowerCase() === 'branco' ? '#fff' :
                          cor.toLowerCase() === 'nude' ? '#e3bc9a' :
                          cor 
                      }}
                      title={cor}
                    />
                  ))}
                </div>

                <Link href={`/product/${item.handle}`}>
                  <h3 className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1 hover:text-black transition-colors font-normal leading-tight">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-[13px] font-bold text-[#1A1A1A]">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: item.priceRange.minVariantPrice.currencyCode,
                  }).format(Number(item.priceRange.minVariantPrice.amount))}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-zinc-400 italic">Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. EXPORTAÇÃO PRINCIPAL (Envolvida em Suspense para o build)
export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 italic text-zinc-400">Carregando coleção...</div>}>
      <ShopClientContent />
    </Suspense>
  );
}