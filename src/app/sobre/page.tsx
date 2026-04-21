import Link from "next/link";

export default function SobrePage() {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* SEÇÃO PRINCIPAL */}
            <section className="flex flex-col md:flex-row items-start gap-8 lg:gap-12 pt-16 md:pt-10 pb-12 overflow-hidden">

                {/* IMAGEM */}
                <div className="w-full md:w-[50%] animate-in fade-in duration-1000">
                    <div className="relative overflow-hidden bg-zinc-100 rounded-sm shadow-sm">
                        <img
                            src="/images/loja-santa-maria.png"
                            alt="Santa Maria Atelier"
                            className="w-full h-auto object-cover"
                            style={{ maxHeight: "480px" }}
                        />
                    </div>
                </div>

                {/* TEXTO À DIREITA */}
                <div className="w-full md:w-[50%] flex flex-col gap-3">
                    <header className="space-y-1">
                        <p className="text-[#8C7355] text-[9px] uppercase tracking-[0.4em] font-bold">
                            Nossa Essência
                        </p>
                        <h1 className="font-serif text-2xl md:text-[26px] lg:text-[32px] italic leading-tight text-[#1A1A1A] max-w-full">
                            Mais do que vestir, é se reconhecer.
                        </h1>
                    </header>

                    <div className="flex flex-col gap-3 text-zinc-600 font-light leading-relaxed text-xs lg:text-sm">
                        <p>
                            A Santa Maria nasceu do amor pela moda e do desejo de valorizar a beleza única de cada mulher.
                            Há mais de 10 anos, nos dedicamos a oferecer peças que unem elegância, qualidade e personalidade — sempre acompanhando as tendências, mas sem abrir mão do estilo atemporal.
                        </p>
                        <p>
                            Acreditamos que vestir-se vai muito além de roupa: é sobre se sentir confiante, bonita e segura em qualquer ocasião. Por isso, cada peça da nossa loja é escolhida com cuidado, pensando na mulher real, moderna e cheia de atitude.
                            Aqui, prezamos por um atendimento próximo, acolhedor e verdadeiro. Queremos que cada cliente se sinta especial, como se estivesse sendo atendida por amigas.
                            Mais do que uma loja, somos um espaço de conexão, estilo e autoestima.
                        </p>
                        <p className="italic font-serif text-[#1A1A1A] text-base mt-1">
                            "Santa Maria - feita para mulheres que sabem o seu valor."
                        </p>
                    </div>

                    <div className="mt-2">
                        <Link
                            href="/shop"
                            className="inline-block bg-[#1A1A1A] text-white px-8 py-4 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#8C7355] transition-all"
                        >
                            Conheça as Coleções
                        </Link>
                    </div>
                </div>
            </section>

            {/* SEÇÃO DE VISITA */}
            <section className="mt-24 py-16 border-t border-zinc-100 flex flex-col md:flex-row justify-between gap-12">
                <div className="max-w-xs">
                    <h4 className="font-serif italic text-2xl text-[#1A1A1A] mb-4">Visite nossa loja</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed font-light">
                        Venha vivenciar a experiência Santa Maria de perto. Um espaço dedicado ao autocuidado e à beleza feminina, onde cada detalhe foi pensado para você se sentir em casa enquanto descobre o que melhor expressa a sua essência.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8C7355]">Localização</span>
                        <address className="not-italic text-sm text-zinc-600 font-light leading-relaxed">
                            Rua Paz, 638<br />
                            Centro<br />
                            Campo Grande - MS
                        </address>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#8C7355]">Funcionamento</span>
                        <p className="text-sm text-zinc-600 font-light leading-relaxed">
                            Segunda a Sexta — 09h às 18h30<br />
                            Sábado — 09h às 13h
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}