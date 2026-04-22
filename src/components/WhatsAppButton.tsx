import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "5567992233599";
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre a coleção da Santa Maria.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-999 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 active:scale-95 md:bottom-10 md:right-10"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={30} fill="currentColor" />
      
      {/* Pequeno pulso sutil para chamar atenção sem ser irritante */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
    </a>
  );
}