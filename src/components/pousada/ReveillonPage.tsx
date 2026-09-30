import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  MessageCircle, 
  Calendar, 
  Waves, 
  Users, 
  ShieldCheck, 
  Clock, 
  Check, 
  ChevronRight,
  Palmtree,
  Heart,
  Star,
  MapPin,
  UtensilsCrossed,
  Car,
  Wind,
  CookingPot,
  Tv,
  Eye,
  Sliders
} from 'lucide-react';
import { POUSADA_IMAGES, POUSADA_INFO } from '../../data/pousadaData';
import { Amenities } from './Amenities';
import { Gallery } from './Gallery';
import { LocationContact } from './LocationContact';
import { Footer } from './Footer';
import reveillonHeroImg from '../../assets/images/reveillon_beach_sunset_1790457038977.jpg';

interface ReveillonPageProps {
  onBackToSite: () => void;
  onOpenBooking: () => void;
  onOpenDashboard?: () => void;
  onOpenPhoto: (img: string, title: string) => void;
  phoneClean?: string;
  whatsappMessage?: string;
}

export const ReveillonPage: React.FC<ReveillonPageProps> = ({
  onBackToSite,
  onOpenBooking,
  onOpenDashboard,
  onOpenPhoto,
  phoneClean = POUSADA_INFO.phoneClean,
  whatsappMessage = 'Olá! Gostaria de consultar os pacotes e reservar meu chalé para o Réveillon / Final de Ano 2026 na Pousada Vila de Santa Marina.'
}) => {
  const [activeNav, setActiveNav] = useState('inicio');

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const scrollTo = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#157347] selection:text-white flex flex-col">
      {/* 1. BARRA SUPERIOR EXCLUSIVA DO PACOTE FINAL DE ANO */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs py-3 px-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Voltar para a Home Principal"
            >
              <ArrowLeft className="w-5 h-5 text-[#157347]" />
            </button>

            <div className="leading-tight">
              <span className="block text-[10px] tracking-[0.2em] font-semibold text-slate-500 uppercase">
                POUSADA
              </span>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0c2f33] leading-none">
                Vila de Santa Marina
              </span>
              <span className="block text-[9px] tracking-[0.25em] font-bold text-[#b48a3c] uppercase mt-0.5">
                CARAGUATATUBA &middot; SP
              </span>
            </div>
          </div>

          {/* Links da Barra Superior */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-slate-600 mr-auto ml-8">
            <button 
              onClick={onBackToSite}
              className="hover:text-[#0c2f33] font-semibold text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Voltar para a Página Inicial (Home)"
            >
              <span>Início</span>
            </button>
            <button 
              onClick={() => scrollTo('reveillon-pousada')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              A Pousada
            </button>
            <button 
              onClick={() => scrollTo('reveillon-chales')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Chalés
            </button>
            <button 
              onClick={() => scrollTo('reveillon-estrutura')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Estrutura
            </button>
            <button 
              onClick={() => scrollTo('reveillon-galeria')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Galeria
            </button>
          </nav>

          {/* Botões de Ação na Direita */}
          <div className="flex items-center gap-3 ml-auto pl-4">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 cursor-pointer"
                title="Abrir Painel Admin"
              >
                <Sliders className="w-3.5 h-3.5 text-[#157347]" />
                <span>Painel Admin</span>
              </button>
            )}

            <button
              onClick={openWhatsApp}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Reserve no WhatsApp &rarr;</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO PRINCIPAL: "FINAL DE ANO NA PRAIA - RÉVEILLON 2026" */}
      <section id="reveillon-hero" className="relative min-h-[600px] sm:min-h-[680px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
        {/* Imagem de Fundo Panorâmica Exata: Praia com Fogos de Artifício, Cabanas e Pôr do Sol */}
        <div className="absolute inset-0 z-0">
          <img
            src={reveillonHeroImg}
            alt="Final de Ano na Praia em Caraguatatuba"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay suave para legibilidade do texto no lado esquerdo sem apagar os fogos e a praia à direita */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
        </div>

        {/* Folhagens de Palmeira Tropicais decorando o canto superior esquerdo e direito como na imagem de referência */}
        <div className="absolute top-0 left-0 w-48 sm:w-64 lg:w-80 pointer-events-none z-10 opacity-75 select-none transform -scale-x-100 -rotate-12 origin-top-left">
          <svg viewBox="0 0 300 200" fill="none" className="w-full h-auto text-emerald-900/60 drop-shadow-xl">
            <path d="M0,0 C60,40 120,60 200,40 C140,80 80,120 0,140 Z" fill="currentColor"/>
            <path d="M0,20 C80,60 160,80 260,50 C180,110 100,150 0,180 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-48 sm:w-64 lg:w-80 pointer-events-none z-10 opacity-75 select-none rotate-12 origin-top-right">
          <svg viewBox="0 0 300 200" fill="none" className="w-full h-auto text-emerald-900/60 drop-shadow-xl">
            <path d="M0,0 C60,40 120,60 200,40 C140,80 80,120 0,140 Z" fill="currentColor"/>
            <path d="M0,20 C80,60 160,80 260,50 C180,110 100,150 0,180 Z" fill="currentColor"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-2xl text-white space-y-6">
            {/* Kicker Dourado */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs sm:text-[13px] font-bold tracking-widest uppercase backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>RÉVEILLON 2026</span>
            </div>

            {/* Título Principal */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-md">
              Final de Ano <br />
              <span className="text-amber-300 italic font-normal font-serif">na Praia</span>
            </h1>

            {/* Descrição */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-light drop-shadow-xs">
              Viva dias inesquecíveis em <strong>Caraguatatuba</strong>, com todo o conforto, lazer e tranquilidade que você e sua família merecem para celebrar a virada.
            </p>

            {/* 3 Diferenciais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 text-xs text-slate-100">
                <Waves className="w-4 h-4 text-amber-300 shrink-0" />
                <span>A poucos metros da praia</span>
              </div>
              <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 text-xs text-slate-100">
                <Users className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Ideal para casais e famílias</span>
              </div>
              <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 text-xs text-slate-100">
                <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Ambiente seguro e acolhedor</span>
              </div>
            </div>

            {/* Botão de Fechamento */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/30 transition-all cursor-pointer group"
              >
                <Calendar className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>Reserve seu chalé agora &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selo Manuscrito Flutuante */}
        <div className="hidden lg:block absolute bottom-12 right-12 z-10 text-right select-none">
          <span className="font-script text-3xl xl:text-4xl text-amber-300 drop-shadow-md block">
            Celebre Novos Começos
          </span>
          <span className="font-script text-xl xl:text-2xl text-white/90 drop-shadow-md">
            em Caraguatatuba
          </span>
        </div>
      </section>

      {/* 3. SEÇÃO: "SUA ESTADIA DE FINAL DE ANO - CONFORTO, LAZER E BOAS LEMBRANÇAS" */}
      <section id="reveillon-pousada" className="relative py-16 sm:py-20 bg-[#FAF7F2] overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Lado Esquerdo: Mosaico Polaroid com fotos dos chalés e piscina */}
            <div className="lg:col-span-7 relative pt-2 pb-6">
              <div className="grid grid-cols-12 gap-3 sm:gap-4 relative z-10">
                <div 
                  onClick={() => onOpenPhoto(POUSADA_IMAGES.chalets, 'Fachada e Jardim')}
                  className="col-span-5 row-span-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-200 cursor-pointer transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all"
                >
                  <img src={POUSADA_IMAGES.chalets} alt="Chalés" className="w-full h-72 sm:h-96 object-cover rounded-xl" />
                </div>
                <div 
                  onClick={() => onOpenPhoto(POUSADA_IMAGES.hero, 'Área Externa')}
                  className="col-span-3 bg-white p-2.5 rounded-2xl shadow-lg border border-slate-200 cursor-pointer transform rotate-1 hover:rotate-0 hover:scale-105 transition-all"
                >
                  <img src={POUSADA_IMAGES.hero} alt="Pátio" className="w-full h-34 sm:h-46 object-cover rounded-xl" />
                </div>
                <div 
                  onClick={() => onOpenPhoto(POUSADA_IMAGES.pool, 'Piscina')}
                  className="col-span-4 bg-white p-2.5 rounded-2xl shadow-lg border border-slate-200 cursor-pointer transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all"
                >
                  <img src={POUSADA_IMAGES.pool} alt="Piscina" className="w-full h-34 sm:h-46 object-cover rounded-xl" />
                </div>
                <div 
                  onClick={() => onOpenPhoto(POUSADA_IMAGES.gourmet, 'Área Gourmet')}
                  className="col-span-3 bg-white p-2.5 rounded-2xl shadow-lg border border-slate-200 cursor-pointer transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all"
                >
                  <img src={POUSADA_IMAGES.gourmet} alt="Churrasqueira" className="w-full h-34 sm:h-46 object-cover rounded-xl" />
                </div>
                <div 
                  onClick={() => onOpenPhoto(POUSADA_IMAGES.room, 'Quarto')}
                  className="col-span-4 bg-white p-2.5 rounded-2xl shadow-lg border border-slate-200 cursor-pointer transform rotate-2 hover:rotate-0 hover:scale-105 transition-all"
                >
                  <img src={POUSADA_IMAGES.room} alt="Quartos" className="w-full h-34 sm:h-46 object-cover rounded-xl" />
                </div>
              </div>

              {/* Selo Manuscrito */}
              <div className="absolute -bottom-3 left-6 sm:left-10 z-30 select-none">
                <span className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-[#A87B2E] tracking-wide drop-shadow-sm block transform -rotate-6">
                  Conforto em cada detalhe
                </span>
                <div className="h-0.5 w-24 bg-[#A87B2E]/60 ml-2 mt-0.5 rounded-full transform -rotate-6" />
              </div>
            </div>

            {/* Lado Direito: Textos do Réveillon */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="h-[1.5px] w-6 bg-[#b48a3c]" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#b48a3c]">
                    SUA ESTADIA DE FINAL DE ANO
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33] leading-tight">
                  Conforto, lazer e boas lembranças
                </h2>
              </div>

              <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-md">
                <p>
                  Nossos chalés oferecem o equilíbrio perfeito entre conforto e lazer. Com opções para casais e também para famílias maiores, cada acomodação conta com <strong className="text-[#0c2f33]">cozinha equipada</strong>, utensílios domésticos, geladeira, fogão, <strong className="text-[#0c2f33]">TV com SKY</strong> e <strong className="text-[#0c2f33]">ar-condicionado</strong>.
                </p>
                <p>
                  Tudo para garantir que sua <strong>virada de ano em Caraguatatuba</strong> seja prática, aconchegante e cheia de momentos especiais.
                </p>
              </div>

              {/* 3 Diferenciais */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Palmtree className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#0c2f33]">Pertinho do mar</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#0c2f33]">Ambiente familiar</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#0c2f33]">Conforto em detalhes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOSSA ESTRUTURA */}
      <div id="reveillon-estrutura">
        <Amenities />
      </div>

      {/* 5. GALERIA DOS CHALÉS */}
      <div id="reveillon-galeria">
        <Gallery onOpenPhoto={onOpenPhoto} />
      </div>

      {/* 6. BANNER DE FECHAMENTO DE FINAL DE ANO */}
      <section className="relative py-16 bg-[#0c2f33] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={reveillonHeroImg} alt="Banner" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-300 block">
              GARANTA SUA ESTADIA
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Faça sua reserva e viva um Réveillon inesquecível!
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-400" /> Atendimento rápido</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Reserva segura</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-pink-400" /> Sua viagem mais especial</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Reservar Agora no WhatsApp &rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. LOCALIZAÇÃO E CONTATO (IGUAL À HOME) */}
      <LocationContact />

      {/* 8. RODAPÉ */}
      <Footer onOpenDashboard={onOpenDashboard} onGoHome={onBackToSite} />
    </div>
  );
};
