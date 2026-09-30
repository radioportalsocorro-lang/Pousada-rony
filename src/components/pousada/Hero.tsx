import React from 'react';
import { Calendar, MessageCircle, MapPin, Users, ShieldCheck } from 'lucide-react';
import { POUSADA_IMAGES, POUSADA_INFO } from '../../data/pousadaData';
import { SiteSettings } from '../../services/settingsService';

interface HeroProps {
  onOpenBooking: () => void;
  settings?: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, settings }) => {
  const phoneClean = settings?.phoneClean || POUSADA_INFO.phoneClean;
  const whatsappMsg = settings?.whatsappMessage || POUSADA_INFO.whatsappMessage;
  const heroImg = settings?.heroImage || POUSADA_IMAGES.hero;
  const heroBadge = settings?.heroBadge || 'CARAGUATATUBA TE ESPERA';
  const heroTitle = settings?.heroTitleLine1 || 'Fique perto do mar com o conforto que você merece';
  const heroSub = settings?.heroSubtitle || 'Chalés completos para casais e famílias, com piscina, área gourmet e todo o conforto que você precisa, para viver dias únicos em Caraguatatuba.';

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Definição vetorial de onda perfeitamente suave (Bézier suave contínua em coordenadas proporcionais 0-1) */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="smoothWaveHero" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.92 C 0.88,0.95 0.74,0.99 0.60,0.96 C 0.44,0.92 0.32,0.98 0.18,0.99 C 0.09,1.00 0.04,0.96 0,0.94 Z" />
          </clipPath>
        </defs>
      </svg>

      <section
        id="inicio"
        className="relative min-h-[440px] sm:min-h-[480px] lg:min-h-[510px] flex items-center overflow-hidden z-20 pb-14 sm:pb-18"
        style={{
          clipPath: 'url(#smoothWaveHero)',
          WebkitClipPath: 'url(#smoothWaveHero)',
        }}
      >
        {/* Imagem de Fundo Dinâmica da Hero gerenciável pelo Dashboard */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Vista da Pousada Vila de Santa Marina em Caraguatatuba"
            className="w-full h-full object-cover object-center scale-100 transition-all duration-700"
          />
          {/* Camada de Gradiente para legibilidade perfeita do texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30" />
        </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="max-w-2xl text-left">
          {/* Tagline com Traço Dourado */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1.5px] w-6 bg-[#d4a853]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#e9bf68]">
              {heroBadge}
            </span>
            <span className="h-[1.5px] w-6 bg-[#d4a853]" />
          </div>

          {/* Título Principal em Serif Dinâmico */}
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.18] mb-3.5">
            {heroTitle}
          </h1>

          {/* Parágrafo Descritivo */}
          <p className="text-xs sm:text-sm lg:text-[15px] text-slate-200 font-normal leading-relaxed mb-6 max-w-xl">
            {heroSub}
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7">
            <button
              onClick={onOpenBooking}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>Reservar Agora</span>
            </button>

            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 hover:border-white/60 active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Fale no WhatsApp</span>
            </button>
          </div>

          {/* 3 Diferenciais de Confiança com Ícones */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15">
            <div className="flex items-center gap-2 text-xs text-white/95">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">A poucos minutos das praias</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/95">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sky-300 shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">Ideal para casais e famílias</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/95">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">Ambiente seguro e acolhedor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Flutuante no Canto Inferior Direito: Caraguatatuba - SP */}
      <div className="hidden md:flex absolute bottom-16 right-8 z-10 items-center gap-3 bg-black/45 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-2xl text-white">
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-amber-300 shrink-0">
          <MapPin className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>Caraguatatuba &middot; SP</span>
          </div>
          <div className="text-[10px] text-slate-300 flex items-center gap-1">
            <span>Belezas naturais o ano todo</span>
            <span>〰️</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
