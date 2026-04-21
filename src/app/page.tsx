"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
          collection(handle: "frontpage") {
            products(first: 10) {
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
        }
      `,
    }),
  });

  const json = await res.json();

  return json.data.collection?.products?.nodes || [];
}

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col w-full mt-0 pt-0">

      {/* HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-white">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={800}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-hero'
          }}
          navigation={false}
          className="h-full w-full custom-hero-swiper relative"
        >
          <SwiperSlide className="relative w-full h-full flex items-center justify-center bg-white">
            <img
              src="images/hero-santa-maria.png"
              className="hero-logo-force z-10 md:absolute md:inset-0 md:w-full md:h-full md:object-contain md:p-20"
              alt="Santa Maria Logo"
            />
          </SwiperSlide>

          <SwiperSlide className="relative w-full h-full">
            <img
              src="images/carrossel2.jpg"
              className="w-full h-full object-cover object-[center_35%]"
              alt="Nova Coleção"
            />
          </SwiperSlide>

          <SwiperSlide className="relative w-full h-full">
            <img
              src="images/carrossel3.jpg"
              className="w-full h-full object-cover object-[center_35%]"
              alt="Destaques de Verão"
            />
          </SwiperSlide>
          
          <div className="swiper-pagination-hero absolute bottom-8 left-0 right-0 z-50 flex justify-center gap-2"></div>
        </Swiper>
      </section>

      {/* SECTION VITRINE */}
      <section className="pt-8 pb-24 px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 md:gap-4 text-center md:text-left">
          <div>
            <h3 className="font-serif text-3xl italic text-[#1A1A1A]">Destaques</h3>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] mt-2 font-bold">Peças limitadas</p>
          </div>
          <Link href="/shop" className="text-[10px] uppercase tracking-[0.3em] border-b border-black pb-1 font-bold hover:text-zinc-500 transition">
            Ver catálogo completo
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((prod) => (
            <div key={prod.id} className="group flex flex-col">

              <div className="relative aspect-2/3 overflow-hidden bg-[#F9F9F9] mb-3">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={true}
                  pagination={{ clickable: true }}
                  className="h-full w-full inner-product-swiper"
                >
                  {prod.images.nodes.map((img: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Link href={`/product/${prod.handle}`} className="block w-full h-full">
                        <img
                          src={img.url || "/images/placeholder.jpg"}
                          alt={`${prod.title} - ${index}`}
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>

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

              <button
                onClick={() => addToCart({
                  variantId: prod.variants.nodes[0].id,
                  title: prod.title,
                  price: prod.priceRange.minVariantPrice.amount,
                  image: prod.images.nodes[0]?.url,
                  quantity: 1
                })}
                className="md:hidden w-full bg-[#1A1A1A] text-white text-[9px] uppercase tracking-[0.2em] py-3 mb-3 font-bold active:scale-95 transition-all"
              >
                Adicionar à Sacola
              </button>

              <div className="flex flex-col pt-2">
                <div className="flex gap-1.5 mb-2">
                  {Array.from(
                    new Set(
                      prod.variants.nodes.flatMap((v: any) =>
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

                <Link href={`/product/${prod.handle}`}>
                  <h3 className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1 hover:text-black transition-colors font-normal leading-tight">
                    {prod.title}
                  </h3>
                </Link>

                <p className="text-[13px] font-bold text-[#1A1A1A]">
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