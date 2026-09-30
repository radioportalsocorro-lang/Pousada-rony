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
  Sliders,
  Sun,
  Umbrella
} from 'lucide-react';
import { POUSADA_IMAGES, POUSADA_INFO } from '../../data/pousadaData';
import { Amenities } from './Amenities';
import { Gallery } from './Gallery';
import { LocationContact } from './LocationContact';
import { Footer } from './Footer';

interface VeraoPageProps {
  onBackToSite: () => void;
  onOpenBooking: () => void;
  onOpenDashboard?: () => void;
  onOpenPhoto: (img: string, title: string) => void;
  phoneClean?: string;
  whatsappMessage?: string;
}

export const VeraoPage: React.FC<VeraoPageProps> = ({
  onBackToSite,
  onOpenBooking,
  onOpenDashboard,
  onOpenPhoto,
  phoneClean = POUSADA_INFO.phoneClean,
  whatsappMessage = 'Olá! Gostaria de consultar tarifas e disponibilidade para as Férias de Verão na Pousada Vila de Santa Marina.'
}) => {
  const [activeNav, setActiveNav] = useState('inicio');

  const openWhatsApp = (customText?: string) => {
    const text = customText || whatsappMessage;
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
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
      {/* 1. BARRA SUPERIOR EXCLUSIVA DO PACOTE VERÃO & FÉRIAS */}
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
              onClick={() => scrollTo('verao-pacotes')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Férias de Verão
            </button>
            <button 
              onClick={() => scrollTo('verao-chales')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Chalés
            </button>
            <button 
              onClick={() => scrollTo('verao-estrutura')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Estrutura & Lazer
            </button>
            <button 
              onClick={() => scrollTo('verao-galeria')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Galeria de Fotos
            </button>
            <button 
              onClick={() => scrollTo('localizacao')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Localização
            </button>
          </nav>

          {/* Botões do Topo */}
          <div className="flex items-center gap-2.5">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                title="Acessar Painel Administrativo"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span>Painel Admin</span>
              </button>
            )}

            <button
              onClick={() => openWhatsApp()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Reservar Verão</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION VERÃO & ALTA TEMPORADA */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center text-white overflow-hidden">
        {/* Imagem de Fundo Ensolarada / Praia & Verão */}
        <div className="absolute inset-0 z-0">
          <img 
            src={POUSADA_IMAGES.sunnyBeach} 
            alt="Verão e Férias em Caraguatatuba" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Overlay gradiente suave para leitura excelente */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Tag Especial Verão */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Sun className="w-4 h-4 text-amber-300" />
              <span>ALTA TEMPORADA DE VERÃO &bull; CARAGUATATUBA &bull; SP</span>
            </div>

            {/* Título Principal */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white drop-shadow-md">
              O Melhor do Verão em Caraguatatuba: Sol, Piscina e Descanso Merecido.
            </h1>

            {/* Descrição */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed drop-shadow-sm font-normal">
              Aproveite os dias mais quentes do ano no paraíso do Litoral Norte! Chalés completos com ar-condicionado e cozinha equipada, perfeitos para quem busca economia, praticidade e momentos inesquecíveis em família.
            </p>

            {/* Botões de Ação */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => openWhatsApp('Olá! Gostaria de consultar tarifas para as Férias de Verão na Pousada Vila de Santa Marina.')}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Consultar Tarifas no WhatsApp</span>
              </button>

              <button
                onClick={() => scrollTo('verao-chales')}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm transition-all cursor-pointer"
              >
                <span>Conhecer Chalés</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Destaques Rápidos */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dias de Sol e Praia</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Waves className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Piscina para Crianças e Adultos</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CookingPot className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cozinha Completa</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Car className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Estacionamento Fechado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PACOTES E DIÁRIAS DE VERÃO */}
      <section id="verao-pacotes" className="py-14 sm:py-18 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">
              DIÁRIAS & PACOTES PROMOCIONAIS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0c2f33]">
              Planeje Suas Férias de Verão
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Escolha o período ideal para sua viagem: finais de semana de sol, semanas completas de férias ou estadias prolongadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Opção 1: Finais de Semana */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  Sexta a Domingo
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0c2f33]">
                  Fim de Semana de Sol
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Ideal para fugir da rotina e recarregar as energias com praias deslumbrantes e piscina.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Check-in na sexta e check-out no domingo</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Chalés equipados com ar-condicionado</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Cozinha prática para refeições rápidas</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Piscina e solarium liberados</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Estacionamento privativo gratuito</li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de consultar valores para o Fim de Semana no Verão.')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0c2f33] hover:bg-[#157347] active:scale-95 text-white font-bold text-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Fim de Semana</span>
                </button>
              </div>
            </div>

            {/* Opção 2: Semana Completa (Destaque) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl relative flex flex-col justify-between group transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Melhor Custo-Benefício</span>
              </div>

              <div className="space-y-4 pt-1">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  Pacote 5 a 7 Dias
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0c2f33]">
                  Férias em Família
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Descontos especiais para estadias de 5 noites ou mais. O descanso que sua família merece.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Tarifa diária promocional reduzida</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Chalé espaçoso para até 4 ou 6 pessoas</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Cozinha completa: economize nas refeições</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Wi-Fi fibra rápida em toda a pousada</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Localização estratégica perto das praias</li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de consultar valores do Pacote de Férias em Família (5 a 7 dias) no Verão.')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Garantir Pacote de Férias</span>
                </button>
              </div>
            </div>

            {/* Opção 3: Meio de Semana */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold border border-cyan-200">
                  Segunda a Sexta
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0c2f33]">
                  Verão Tranquilo
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Praias calmas, trânsito livre e as melhores tarifas da temporada para quem viaja em dias úteis.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Tarifas de meio de semana mais acessíveis</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Silêncio e paz para relaxar ou home office</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Piscina quase exclusiva</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Chalés com TV SKY e ar-condicionado</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Atendimento direto e personalizado</li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de consultar valores para estadias de Segunda a Sexta no Verão.')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0c2f33] hover:bg-[#157347] active:scale-95 text-white font-bold text-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Meio de Semana</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHALÉS & ACOMODAÇÕES DETALHES */}
      <section id="verao-chales" className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Coluna Fotos */}
            <div className="grid grid-cols-2 gap-3.5">
              <div 
                onClick={() => onOpenPhoto(POUSADA_IMAGES.chalets, 'Chalés em Meio à Natureza')}
                className="h-52 sm:h-64 rounded-3xl overflow-hidden cursor-pointer group relative shadow-md"
              >
                <img src={POUSADA_IMAGES.chalets} alt="Chalés" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#0c2f33] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Chalés Individuais
                </span>
              </div>

              <div 
                onClick={() => onOpenPhoto(POUSADA_IMAGES.pool, 'Piscina da Pousada')}
                className="h-52 sm:h-64 rounded-3xl overflow-hidden cursor-pointer group relative shadow-md"
              >
                <img src={POUSADA_IMAGES.pool} alt="Piscina" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#0c2f33] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Piscina & Solarium
                </span>
              </div>

              <div 
                onClick={() => onOpenPhoto(POUSADA_IMAGES.gourmet, 'Área Gourmet e Churrasqueira')}
                className="col-span-2 h-56 sm:h-72 rounded-3xl overflow-hidden cursor-pointer group relative shadow-md"
              >
                <img src={POUSADA_IMAGES.gourmet} alt="Área Gourmet" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#0c2f33] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Área Gourmet com Churrasqueiras
                </span>
              </div>
            </div>

            {/* Coluna Texto */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">
                SUA CASA DE PRAIA NO VERÃO
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33] leading-tight">
                Espaço, Liberdade e Tranquilidade no Litoral Norte
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Nossos chalés proporcionam a sensação de estar em sua própria casa na praia. Com cozinha totalmente equipada (geladeira, fogão, utensílios), você tem total liberdade de horários e praticidade para curtir as férias com quem ama.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200">
                  <Waves className="w-5 h-5 text-[#157347] mb-2" />
                  <h4 className="font-bold text-sm text-[#0c2f33]">Piscina para Refrescar</h4>
                  <p className="text-xs text-slate-500 mt-1">Água limpa e espreguiçadeiras para tomar sol.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200">
                  <Wind className="w-5 h-5 text-[#157347] mb-2" />
                  <h4 className="font-bold text-sm text-[#0c2f33]">Ar-Condicionado</h4>
                  <p className="text-xs text-slate-500 mt-1">Clima perfeito para repor as energias após o mar.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de consultar valores para o Verão na Pousada Vila de Santa Marina.')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Falar com Atendimento no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOSSA ESTRUTURA */}
      <div id="verao-estrutura">
        <Amenities />
      </div>

      {/* 6. GALERIA DOS CHALÉS */}
      <div id="verao-galeria">
        <Gallery onOpenPhoto={onOpenPhoto} />
      </div>

      {/* 7. BANNER DE CONVERSÃO (IGUAL À HOME) */}
      <section className="relative py-11 sm:py-14 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={POUSADA_IMAGES.sunnyBeach}
            alt="Praia tropical de Caraguatatuba"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/35 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl drop-shadow-md">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="h-[1.5px] w-5 bg-[#d4a853]" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#f3ca77] drop-shadow-sm">
                  SUA PRÓXIMA VIAGEM COMEÇA AQUI
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                Transforme sua viagem de verão <br className="hidden sm:inline" />
                em boas memórias.
              </h2>
            </div>

            <div className="flex flex-col sm:items-end gap-3.5">
              <button
                onClick={() => openWhatsApp('Olá! Gostaria de reservar meu chalé para as férias de Verão na Pousada Vila de Santa Marina.')}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Reservar Agora no WhatsApp &rarr;</span>
              </button>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 drop-shadow-sm">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-300" /> Atendimento rápido</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Reserva segura</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-pink-300" /> Sua viagem mais especial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCALIZAÇÃO E CONTATO (IGUAL À HOME) */}
      <LocationContact />

      {/* 9. RODAPÉ */}
      <Footer onOpenDashboard={onOpenDashboard} onGoHome={onBackToSite} />
    </div>
  );
};
