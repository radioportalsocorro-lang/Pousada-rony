import React from 'react';
import { ShieldCheck, ArrowLeft, MessageCircle, MapPin, Share2, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { POUSADA_INFO } from '../../data/pousadaData';

interface PrivacyPageProps {
  onBackToSite: () => void;
  pousadaName?: string;
  phone?: string;
  phoneClean?: string;
  address?: string;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onBackToSite,
  pousadaName = POUSADA_INFO.name,
  phone = POUSADA_INFO.phone,
  phoneClean = POUSADA_INFO.phoneClean,
  address = POUSADA_INFO.address,
}) => {
  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent('Olá! Gostaria de tirar uma dúvida sobre a Política de Privacidade e Atendimento.')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-800 font-sans selection:bg-[#157347] selection:text-white flex flex-col justify-between">
      {/* Barra Superior de Retorno */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#157347]" />
            <span>Voltar ao Site da Pousada</span>
          </button>

          <div className="flex items-center gap-2 text-right">
            <ShieldCheck className="w-5 h-5 text-[#157347]" />
            <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
              Segurança & Transparência
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal da Política */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14 flex-1">
        {/* Banner do Título */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-100/60 via-amber-100/40 to-transparent pointer-events-none rounded-bl-full" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transparência e Respeito com Você</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33] leading-tight">
            Política de Privacidade e Termos de Uso
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {pousadaName} &bull; Última atualização: 2026
          </p>

          <div className="mt-6 p-4.5 rounded-2xl bg-[#FAF7F2] border border-amber-200/70 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p className="font-medium text-[#0c2f33]">
              Bem-vindo(a) ao nosso site!
            </p>
            <p className="mt-1">
              A sua privacidade é importante para nós, e queremos que você saiba como tratamos as informações aqui.
            </p>
          </div>
        </div>

        {/* Tópicos da Política */}
        <div className="space-y-6">
          {/* 1. Coleta de informações */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#0c2f33] text-white flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0c2f33]">
                Coleta de informações
              </h2>
            </div>
            <div className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed pl-0 sm:pl-11">
              <p>
                Nosso site <strong>não coleta dados pessoais automaticamente</strong>.
              </p>
              <p>
                As únicas informações que você pode nos fornecer são aquelas que você decide compartilhar voluntariamente, ao entrar em contato através do WhatsApp, redes sociais ou outros meios externos.
              </p>
            </div>
          </div>

          {/* 2. Uso de dados */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#157347] text-white flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0c2f33]">
                Uso de dados
              </h2>
            </div>
            <div className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed pl-0 sm:pl-11">
              <p>
                As informações enviadas voluntariamente por você (como nome, telefone ou mensagem no WhatsApp) são usadas exclusivamente para <strong>responder seu contato e prestar atendimento</strong>.
              </p>
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-emerald-950 font-semibold text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Não compartilhamos, vendemos ou repassamos dados a terceiros.</span>
              </div>
            </div>
          </div>

          {/* 3. Links externos */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#0c2f33] text-white flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0c2f33]">
                Links externos
              </h2>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed pl-0 sm:pl-11">
              <p>
                Nosso site contém botões e links que redirecionam para:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                  <Share2 className="w-4 h-4 text-pink-600" />
                  <span>Redes sociais oficiais</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Localização no Google Maps</span>
                </div>
              </div>
              <p>
                Esses links levam você a sites externos, que possuem suas próprias políticas de privacidade e termos de uso.
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                Não temos controle sobre o conteúdo ou práticas desses sites, portanto recomendamos que você leia as políticas de cada um.
              </p>
            </div>
          </div>

          {/* 4. Responsabilidade */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#0c2f33] text-white flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0c2f33]">
                Responsabilidade
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed pl-0 sm:pl-11">
              <p>
                Nos esforçamos para manter o site atualizado e funcional, mas não nos responsabilizamos por eventuais falhas técnicas, interrupções temporárias ou conteúdos externos acessados por meio de links aqui presentes.
              </p>
            </div>
          </div>

          {/* 5. Alterações nesta política */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#0c2f33] text-white flex items-center justify-center font-bold text-sm">
                5
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0c2f33]">
                Alterações nesta política
              </h2>
            </div>
            <div className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed pl-0 sm:pl-11">
              <p>
                Podemos atualizar este texto ocasionalmente, para refletir mudanças em nossos serviços ou adequações legais.
              </p>
              <p>
                Recomendamos que você consulte esta página periodicamente.
              </p>
            </div>
          </div>

          {/* 6. Contato */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#157347] text-white flex items-center justify-center font-bold text-sm">
                6
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0c2f33]">
                Contato
              </h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed pl-0 sm:pl-11">
              <p>
                Se tiver dúvidas sobre esta Política de Privacidade e Termos de Uso, entre em contato conosco pelos canais disponíveis no site.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-800 text-sm block">
                    {pousadaName}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Telefone / WhatsApp: {phone}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    Endereço: {address}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Falar no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Retorno no Rodapé da Página */}
        <div className="mt-10 text-center">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0c2f33] hover:bg-[#103e43] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Página Principal</span>
          </button>
        </div>
      </main>

      {/* Rodapé Simples */}
      <footer className="bg-[#071d20] text-slate-400 py-6 text-center text-xs border-t border-white/10 mt-12">
        <p>&copy; 2026 {pousadaName}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
