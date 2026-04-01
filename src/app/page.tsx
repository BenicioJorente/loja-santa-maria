"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

// Estilos obrigatórios do Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Função para buscar produtos do Shopify
async function getProducts() {
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 3) {
            nodes {
              id
              title
              handle
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

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col w-full mt-0 pt-0">

      {/* HERO SECTION COM CARROSSEL */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-white">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          className="h-full w-full"
        >
          {/* Slide 1 - Logo Centralizado */}
          <SwiperSlide className="relative w-full h-full flex items-center justify-center bg-white">
            <img
              src="images/hero-santa-maria.png"
              className="hero-logo-force z-10 md:absolute md:inset-0 md:w-full md:h-full md:object-contain md:p-20"
              alt="Santa Maria Logo"
            />
            
          </SwiperSlide>

        </Swiper>
      </section>

      {/* SECTION VITRINE */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h3 className="font-serif text-3xl italic text-[#1A1A1A]">Curadoria de Verão</h3>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] mt-2 font-bold">Peças limitadas e artesanais</p>
          </div>
          <Link href="/shop" className="text-[10px] uppercase tracking-[0.3em] border-b border-black pb-1 font-bold hover:text-zinc-500 transition">
            Ver catálogo completo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {products.map((prod) => (
            <div key={prod.id} className="group flex flex-col">

              {/* ÁREA DA IMAGEM */}
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-4 shadow-sm">
                <Link href={`/product/${prod.handle}`} className="block w-full h-full">
                  <img
                    src={prod.images.nodes[0]?.url || "/images/placeholder.jpg"}
                    alt={prod.title}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                  />
                </Link>

                {/* BOTÃO ADICIONAR (Desktop) */}
                <button
                  onClick={() => addToCart({
                    variantId: prod.variants.nodes[0].id,
                    title: prod.title,
                    price: prod.priceRange.minVariantPrice.amount,
                    image: prod.images.nodes[0]?.url,
                    quantity: 1
                  })}
                  className="hidden md:block absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-black text-[9px] uppercase tracking-[0.2em] py-4 z-20 font-bold hover:bg-black hover:text-white transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  Adicionar à Sacola
                </button>
              </div>

              {/* BOTÃO MOBILE */}
              <button
                onClick={() => addToCart({
                  variantId: prod.variants.nodes[0].id,
                  title: prod.title,
                  price: prod.priceRange.minVariantPrice.amount,
                  image: prod.images.nodes[0]?.url,
                  quantity: 1
                })}
                className="md:hidden w-full bg-[#1A1A1A] text-white text-[9px] uppercase tracking-[0.2em] py-4 mb-4 font-bold active:scale-95 transition-all"
              >
                Adicionar à Sacola
              </button>

              <div className="flex justify-between items-start pt-2 border-t border-zinc-100">
                <Link href={`/product/${prod.handle}`}>
                  <h4 className="font-serif text-lg text-[#1A1A1A] hover:italic transition-all">
                    {prod.title}
                  </h4>
                </Link>
                <p className="text-zinc-500 text-sm font-light">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: prod.priceRange.minVariantPrice.currencyCode
                  }).format(Number(prod.priceRange.minVariantPrice.amount))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}