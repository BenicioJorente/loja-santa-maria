export default function PoliticaDeTrocasPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <header className="mb-12 space-y-1">
                <h1 className="font-serif text-2xl md:text-[26px] lg:text-[32px] italic leading-tight text-[#1A1A1A]">
                    Política de Trocas e Devoluções
                </h1>
                <p className="text-zinc-400 text-xs mt-2">Última atualização: maio de 2026</p>
            </header>

            <div className="flex flex-col gap-10 text-zinc-600 font-light leading-relaxed text-sm max-w-3xl">
                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">1. Direito de arrependimento</h2>
                    <p>
                        Conforme o Código de Defesa do Consumidor (Art. 49), você tem até <strong className="font-semibold text-[#1A1A1A]">7 dias corridos</strong> após o recebimento do produto para solicitar a devolução, sem necessidade de justificativa. O produto deve estar sem uso, com etiquetas e na embalagem original.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">2. Trocas por defeito</h2>
                    <p>
                        Caso o produto apresente defeito de fabricação, você tem até <strong className="font-semibold text-[#1A1A1A]">30 dias</strong> para solicitar a troca. Entre em contato conosco pelo WhatsApp ou e-mail com foto do defeito e número do pedido.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">3. Trocas por tamanho ou cor</h2>
                    <p>
                        Aceitamos trocas por tamanho ou cor em até <strong className="font-semibold text-[#1A1A1A]">7 dias corridos</strong> após o recebimento, sujeito à disponibilidade em estoque. O produto deve estar sem uso, com etiquetas originais. O frete de retorno fica por conta do cliente.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">4. Como solicitar</h2>
                    <p>
                        Para iniciar uma troca ou devolução, entre em contato pelos canais abaixo informando o número do pedido e o motivo:
                    </p>
                    <p>
                        E-mail: <span className="text-[#8C7355]">falecom@santamaria.com.br</span><br />
                        WhatsApp: <span className="text-[#8C7355]">(67) 99223-3599</span><br />
                        Horário: Seg a Sex 09h–18h30 | Sáb 09h–13h
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">5. Reembolso</h2>
                    <p>
                        Após recebermos e analisarmos o produto devolvido, o reembolso será processado em até <strong className="font-semibold text-[#1A1A1A]">10 dias úteis</strong> na mesma forma de pagamento utilizada na compra.
                    </p>
                </section>
            </div>
        </div>
    );
}