import React from 'react';
import { MessageCircle, ArrowRight, Clock, ShieldCheck, Heart } from 'lucide-react';
import { POUSADA_IMAGES, POUSADA_INFO } from '../../data/pousadaData';

interface CtaBannerProps {
  bannerImage?: string;
  phoneClean?: string;
  whatsappMessage?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ 
  bannerImage, 
  phoneClean, 
  whatsappMessage 
}) => {
  const bgImg = bannerImage || POUSADA_IMAGES.sunnyBeach;
  const cleanNum = phoneClean || POUSADA_INFO.phoneClean;
  const msg = whatsappMessage || POUSADA_INFO.whatsappMessage;

  const openWhatsApp = () => {
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative py-11 sm:py-14 lg:py-16 overflow-hidden">
      {/* Imagem de Fundo Panorâmica da Praia com Mar Azul e Coqueiros (Estilo Ensolarado) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImg}
          alt="Praia tropical de Caraguatatuba com mar azul turquesa e montanhas"
          className="w-full h-full object-cover object-center"
        />
        {/* Camada luminosa com gradiente suave para leitura perfeita do texto sem escurecer a praia */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/35 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          {/* Lado Esquerdo: Textos do Banner */}
          <div className="max-w-2xl drop-shadow-md">
            {/* Kicker Dourado */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-[1.5px] w-5 bg-[#d4a853]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#f3ca77] drop-shadow-sm">
                SUA PRÓXIMA VIAGEM COMEÇA AQUI
              </span>
            </div>

            {/* Título Principal com quebra organizada */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
              Transforme sua próxima viagem <br className="hidden sm:inline" />
              em boas memórias.
            </h2>
          </div>

          {/* Lado Direito: Botão Verde WhatsApp e Selos */}
          <div className="flex flex-col sm:items-end gap-3.5">
            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 shadow-xl shadow-slate-950/50 transition-all cursor-pointer w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Reservar Agora no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 3 Selos de Confiança alinhados e discretos com sombra para leitura */}
            <div className="flex flex-wrap items-center justify-start sm:justify-end gap-3 text-[11px] sm:text-xs font-medium text-slate-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-800" />
                <span>Atendimento rápido</span>
              </div>
              <span className="text-slate-500">&middot;</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />
                <span>Reserva segura</span>
              </div>
              <span className="text-slate-500">&middot;</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-slate-800" />
                <span>Sua viagem mais especial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
