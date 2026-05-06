import {
  FaInstagram, FaWhatsapp,
  FaShieldAlt, FaLock, FaRegCheckCircle, FaCcVisa, FaCcMastercard
} from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { IoMdMail, IoMdTime } from "react-icons/io";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-zinc-200 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 text-left">

          {/* COLUNA 1: ATENDIMENTO */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-800">Atendimento</h4>
            <div className="text-zinc-500 text-[11px] leading-loose">
              <p className="flex items-center gap-2"><IoMdTime size={14} /> Seg a Sex 09h-18h30 | Sáb 9h-13h</p>
              <p className="flex items-center gap-2"><FaWhatsapp size={14} /> (67) 99223-3599</p>
              <p className="flex items-center gap-2"><IoMdMail size={14} /> falecom@santamaria.com.br</p>
            </div>
            {/* REDES SOCIAIS */}
            <div className="flex gap-5 mt-2">
              <a
                href="https://www.instagram.com/santamariacg"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram Santa Maria"
              >
                <FaInstagram size={20} className="text-zinc-400 hover:text-black transition cursor-pointer" />
              </a>
              <a
                href="https://wa.me/5567992233599"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Santa Maria"
              >
                <FaWhatsapp size={20} className="text-zinc-400 hover:text-[#25D366] transition cursor-pointer" />
              </a>
            </div>
          </div>

          {/* COLUNA 2: INSTITUCIONAL */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-800">Institucional</h4>
            <nav className="flex flex-col gap-3 text-zinc-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              <Link href="/" className="hover:text-black transition">Início</Link>
              <Link href="/shop" className="hover:text-black transition">Coleções</Link>
              <Link href="/sobre" className="hover:text-black transition">Sobre Nós</Link>
              <Link href="/politica-de-privacidade" className="hover:text-black transition">Privacidade</Link>
              <Link href="/politica-de-trocas" className="hover:text-black transition">Trocas e Devoluções</Link>
            </nav>
          </div>

          {/* COLUNA 3: SEGURANÇA E PAGAMENTO */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-800 mb-4">Compre com Segurança</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 bg-white p-2 border border-zinc-100 rounded shadow-sm">
                  <FaShieldAlt size={16} className="text-black" />
                  <span className="text-[8px] font-bold leading-tight">ANTIFRAUDE</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 border border-zinc-100 rounded shadow-sm">
                  <FaLock size={16} className="text-black" />
                  <span className="text-[8px] font-bold leading-tight">SSL 100%</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 border border-zinc-100 rounded shadow-sm">
                  <SiGooglecloud size={16} className="text-zinc-600" />
                  <span className="text-[8px] font-bold leading-tight">GOOGLE SAFE</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 border border-zinc-100 rounded shadow-sm">
                  <FaRegCheckCircle size={16} className="text-green-600" />
                  <span className="text-[8px] font-bold leading-tight">VERIFICADO</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-0.1em text-zinc-400 mb-3">Formas de Pagamento</h4>
              <div className="flex gap-4 text-zinc-500 items-center">
                <FaCcVisa size={26} />
                <FaCcMastercard size={26} />
                <div className="border border-zinc-300 px-2 py-0.5 rounded text-[9px] font-black italic tracking-tighter">PIX</div>
              </div>
            </div>
          </div>
        </div>

        {/* RODAPÉ FINAL */}
        <div className="pt-12 border-t border-zinc-200 text-center">
          <h3 className="font-serif text-2xl mb-4 italic text-zinc-800">Loja Santa Maria</h3>
          <p className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] mb-4">
            &copy; 2026 SANTA MARIA. TODOS OS DIREITOS RESERVADOS
          </p>
          <p className="text-zinc-300 text-[9px] leading-relaxed">
            Rua Paz, Nº 638, Campo Grande - Brazil
          </p>
        </div>
      </div>
    </footer>
  );
}