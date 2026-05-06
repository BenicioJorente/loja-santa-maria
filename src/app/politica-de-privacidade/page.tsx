export default function PoliticaDePrivacidadePage() {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <header className="mb-12 space-y-1">
                <h1 className="font-serif text-2xl md:text-[26px] lg:text-[32px] italic leading-tight text-[#1A1A1A]">
                    Política de Privacidade
                </h1>
                <p className="text-zinc-400 text-xs mt-2">Última atualização: maio de 2026</p>
            </header>

            <div className="flex flex-col gap-10 text-zinc-600 font-light leading-relaxed text-sm max-w-3xl">
                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">1. Informações que coletamos</h2>
                    <p>
                        Ao realizar uma compra ou navegar em nosso site, podemos coletar informações como nome, endereço de e-mail, endereço de entrega, telefone e dados de pagamento. Essas informações são utilizadas exclusivamente para processar seus pedidos e melhorar sua experiência conosco.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">2. Uso das informações</h2>
                    <p>
                        As informações coletadas são utilizadas para processar pedidos, enviar atualizações sobre entregas, responder dúvidas e, caso você autorize, enviar novidades e promoções da Santa Maria. Nunca compartilhamos seus dados com terceiros para fins comerciais.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">3. Segurança</h2>
                    <p>
                        Adotamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou alteração. Todas as transações são realizadas em ambiente seguro com criptografia SSL.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">4. Cookies</h2>
                    <p>
                        Utilizamos cookies para melhorar a navegação e personalizar sua experiência. Você pode desativar os cookies nas configurações do seu navegador, mas isso pode afetar algumas funcionalidades do site.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">5. Seus direitos</h2>
                    <p>
                        Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito de acessar, corrigir ou solicitar a exclusão dos seus dados pessoais. Para exercer esses direitos, entre em contato pelo e-mail <span className="text-[#8C7355]">falecom@santamaria.com.br</span>.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[#1A1A1A] font-serif italic text-lg">6. Contato</h2>
                    <p>
                        Dúvidas sobre esta política? Entre em contato conosco pelo e-mail <span className="text-[#8C7355]">falecom@santamaria.com.br</span> ou pelo WhatsApp <span className="text-[#8C7355]">(67) 99223-3599</span>.
                    </p>
                </section>
            </div>
        </div>
    );
}