"use client";

import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

async function getProductByHandle(handle: string) {
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: `
        query getProduct($handle: String!) {
          product(handle: $handle) {
            id
            title
            description
            productType
            variants(first: 1) {
              nodes {
                id
                price {
                  amount
                  currencyCode
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
      `,
      variables: { handle },
    }),
  });

  const json = await res.json();
  return json.data?.product;
}

export default function ProductPage() {
  const { handle } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imagemAtiva, setImagemAtiva] = useState(0);

  useEffect(() => {
    if (handle) {
      getProductByHandle(handle as string)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [handle]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif italic text-zinc-400">Carregando...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center font-serif italic text-zinc-400">Peça não encontrada.</div>;

  const variant = product.variants.nodes[0];
  const images = product.images.nodes;

  return (
    <div className="bg-white py-12 lg:py-20 px-6 flex justify-center">
      <div className="w-full max-w-4xl pt-10">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start justify-center">
          
          <div className="w-full md:w-[320px] shrink-0"> 
            <div className="aspect-3/4 overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm">
              <img src={images[imagemAtiva]?.url || "/images/placeholder.jpg"} alt={product.title} className="w-full h-full object-cover transition-all duration-700" />
            </div>
            <div className="flex gap-2 mt-4 justify-center md:justify-start">
              {images.map((img: any, idx: number) => (
                <button key={idx} onClick={() => setImagemAtiva(idx)} className={`w-10 h-14 overflow-hidden border transition-opacity ${imagemAtiva === idx ? 'border-black' : 'border-transparent opacity-40 hover:opacity-100'}`}>
                  <img src={img.url} className="w-full h-full object-cover" alt="Thumb" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-sm">
            <nav className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 mb-3 font-bold">Atelier / {product.productType || "Exclusivo"}</nav>
            <h1 className="font-serif text-3xl mb-1 text-[#1A1A1A] font-light leading-tight">{product.title}</h1>
            <p className="text-lg font-light text-zinc-900 mb-6">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: variant.price.currencyCode }).format(Number(variant.price.amount))}
            </p>
            <div className="h-1px w-full bg-zinc-100 mb-8" />
            <p className="text-zinc-500 leading-relaxed text-sm font-light mb-10 italic">{product.description}</p>

            <button 
              onClick={() => {
                addToCart({
                  variantId: variant.id, 
                  title: product.title,
                  price: variant.price.amount,
                  image: images[0]?.url,
                  quantity: 1
                });
              }}
              className="w-full bg-[#1A1A1A] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all active:scale-[0.98]"
            >
              Adicionar à Sacola
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}