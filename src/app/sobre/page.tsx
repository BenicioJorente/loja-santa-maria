import Link from "next/link";

export default function SobrePage() {
    return (
        <div className="max-w-6xl mx-auto px-6">
            {/* SEÇÃO PRINCIPAL - MANTIDA EXATAMENTE COMO ESTÁ */}
            <section className="flex flex-col md:flex-row items-start gap-10 md:gap-16 pt-20 md:pt-10 pb-16">

                {/* IMAGEM */}
                <div className="w-full md:w-[20%] animate-in fade-in duration-1000">
                    <div
                        className="relative overflow-hidden bg-zinc-100 rounded-sm shadow-lg"
                        style={{ maxHeight: "500px" }}
                    >
                        <img
                            src="/images/loja-santa-maria.png"
                            alt="Santa Maria Atelier"
                            className="w-full h-full object-cover object-top"
                            style={{ maxHeight: "500px" }}
                        />
                    </div>
                </div>

                {/* TEXTO À DIREITA */}
                <div className="w-full md:w-[80%] flex flex-col gap-6">
                    <header className="space-y-2">
                        <p className="text-[#8C7355] text-[9px] uppercase tracking-[0.4em] font-bold">
                            Nossa Essência
                        </p>
                        <h1 className="font-serif text-3xl md:text-5xl italic leading-[1.1] text-[#1A1A1A]">
                            Onde a tradição encontra o contemporâneo.
                        </h1>
                    </header>

                    <div className="flex flex-col gap-5 text-zinc-600 font-light leading-relaxed text-sm md:text-base max-w-xl">
                        <p>
                            Fundado sob o olhar atento à sofisticação, o Santa Maria Atelier nasceu do desejo de
                            oferecer mais do que vestuário: oferecemos memórias tecidas em fios nobres.
                        </p>
                        <p>
                            Cada peça em nossa coleção passa por uma curadoria rigorosa,
                            priorizando cortes que valorizam a silhueta e um acabamento
                            artesanal que resiste ao tempo.
                        </p>
                        <p className="italic font-serif text-[#1A1A1A] text-xl mt-2">
                            "A verdadeira elegância não é sobre ser notada, mas sobre ser lembrada."
                        </p>
                    </div>

                    <div className="mt-4">
                        <Link
                            href="/shop"
                            className="inline-block bg-[#1A1A1A] text-white px-8 py-4 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#8C7355] transition-all"
                        >
                            Conheça as Coleções
                        </Link>
                    </div>
                </div>
            </section>

            {/* NOVA SEÇÃO DE VISITA - SUBSTITUINDO OS VALORES COM ESPAÇAMENTO MAIOR */}
            <section className="mt-24 py-16 border-t border-zinc-100 flex flex-col md:flex-row justify-between gap-12">
                <div className="max-w-xs">
                    <h4 className="font-serif italic text-2xl text-[#1A1A1A] mb-4">Visite nosso Atelier</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed font-light">
                        Vivencie a experiência Santa Maria pessoalmente. Atendimento exclusivo e consultoria de estilo em um ambiente acolhedor.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8C7355]">Localização</span>
                        <address className="not-italic text-sm text-zinc-600 font-light leading-relaxed">
                            Rua Exemplo de Luxo, 123<br />
                            Bairro Elegante<br />
                            Cidade - UF
                        </address>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8C7355]">Funcionamento</span>
                        <p className="text-sm text-zinc-600 font-light leading-relaxed">
                            Segunda a Sexta — 09h às 18h<br />
                            Sábado — 09h às 13h
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}