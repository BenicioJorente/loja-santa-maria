"use client";

import { useState } from "react";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useCart();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    setIsRedirecting(true);
    
    try {
      // Extrai os IDs das variantes e monta a URL do checkout
      const itemsParam = cartItems.map(item => {
        // Extrai o número do ID da variante
        const variantIdNumber = item.variantId?.split('/').pop();
        return `${variantIdNumber}:${item.quantity}`;
      }).join(',');
      
      // URL direta para o checkout da Shopify
      const checkoutUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${itemsParam}`;
      
      console.log("🚀 Redirecionando para:", checkoutUrl);
      
      // Redireciona diretamente
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro. Tente novamente.");
      setIsRedirecting(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500" 
        onClick={closeCart} 
      />
      
      <div className="relative w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
        
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-serif text-2xl italic text-[#1A1A1A]">Sua Sacola</h2>
          <button onClick={closeCart} className="hover:rotate-90 transition-transform duration-300">
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.variantId} className="flex gap-4 mb-8 group animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-24 h-32 bg-zinc-200 overflow-hidden shrink-0">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={item.title}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-serif text-base uppercase tracking-tight text-[#1A1A1A]">{item.title}</h4>
                    <div className="flex items-center gap-3 mt-3">
                      <button 
                        onClick={() => updateQuantity(item.variantId, -1)}
                        className="w-5 h-5 flex items-center justify-center border border-zinc-200 text-zinc-400 hover:text-black hover:border-black transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-[10px] font-bold text-zinc-600 w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.variantId, 1)}
                        className="w-5 h-5 flex items-center justify-center border border-zinc-200 text-zinc-400 hover:text-black hover:border-black transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <p className="text-sm font-medium tracking-tight text-[#8C7355]">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.price))}
                    </p>
                    <button 
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-zinc-300 hover:text-red-900 transition-colors p-1"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-zinc-400 font-serif italic mb-4">Sua sacola está vazia.</p>
              <button 
                onClick={closeCart}
                className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:text-zinc-500 transition-colors"
              >
                Continuar explorando
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 pt-8 mt-auto">
          <div className="flex justify-between mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Subtotal</span>
            <span className="font-serif text-xl text-[#1A1A1A]">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
            </span>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || isRedirecting}
            className="w-full bg-[#1A1A1A] text-white py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-lg active:scale-95 disabled:bg-zinc-100 disabled:text-zinc-300 disabled:cursor-not-allowed font-bold"
          >
            {isRedirecting ? "Redirecionando..." : "Finalizar Compra"}
          </button>
        </div>
      </div>
    </div>
  );
}