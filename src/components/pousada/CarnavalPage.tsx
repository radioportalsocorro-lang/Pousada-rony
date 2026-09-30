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
  SunMedium,
  PartyPopper
} from 'lucide-react';
import { POUSADA_IMAGES, POUSADA_INFO } from '../../data/pousadaData';
import { Amenities } from './Amenities';
import { Gallery } from './Gallery';
import { LocationContact } from './LocationContact';
import { Footer } from './Footer';

interface CarnavalPageProps {
  onBackToSite: () => void;
  onOpenBooking: () => void;
  onOpenDashboard?: () => void;
  onOpenPhoto: (img: string, title: string) => void;
  phoneClean?: string;
  whatsappMessage?: string;
}

export const CarnavalPage: React.FC<CarnavalPageProps> = ({
  onBackToSite,
  onOpenBooking,
  onOpenDashboard,
  onOpenPhoto,
  phoneClean = POUSADA_INFO.phoneClean,
  whatsappMessage = 'Olá! Gostaria de consultar os pacotes e reservar meu chalé para o Carnaval 2026 na Pousada Vila de Santa Marina.'
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
      {/* 1. BARRA SUPERIOR EXCLUSIVA DO PACOTE CARNAVAL */}
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
              onClick={() => scrollTo('carnaval-pacotes')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Pacotes Carnaval
            </button>
            <button 
              onClick={() => scrollTo('carnaval-chales')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Chalés
            </button>
            <button 
              onClick={() => scrollTo('carnaval-estrutura')}
              className="hover:text-[#0c2f33] transition-colors cursor-pointer"
            >
              Estrutura & Lazer
            </button>
            <button 
              onClick={() => scrollTo('carnaval-galeria')}
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
              <span>Reservar Carnaval</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION CARNAVAL */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center text-white overflow-hidden">
        {/* Imagem de Fundo Ensolarada / Piscina & Praia */}
        <div className="absolute inset-0 z-0">
          <img 
            src={POUSADA_IMAGES.pool} 
            alt="Carnaval na Pousada Vila de Santa Marina em Caraguatatuba" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Overlay gradiente suave para realçar o texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Tag Especial Carnaval */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <PartyPopper className="w-4 h-4 text-amber-300" />
              <span>PACOTES DE CARNAVAL 2026 &bull; CARAGUATATUBA</span>
            </div>

            {/* Título Principal */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white drop-shadow-md">
              Viva a Alegria do Carnaval com Conforto, Lazer e Paz para Sua Família.
            </h1>

            {/* Descrição */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed drop-shadow-sm font-normal">
              Aproveite os dias mais animados do ano no litoral! Chalés com cozinha equipada, piscina refrescante, área de churrasqueiras e a tranquilidade que você precisa pertinho das praias mais bonitas de Caraguá.
            </p>

            {/* Botões de Ação */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => openWhatsApp('Olá! Gostaria de consultar valores do Pacote de Carnaval 2026 na Pousada Vila de Santa Marina.')}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Consultar Pacote no WhatsApp</span>
              </button>

              <button
                onClick={() => scrollTo('carnaval-chales')}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm transition-all cursor-pointer"
              >
                <span>Ver Nossos Chalés</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Destaques Rápidos */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Waves className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Piscina Liberada</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cozinha Completa</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Palmtree className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Praias Próximas</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Ambiente Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PACOTES ESPECIAIS DE CARNAVAL */}
      <section id="carnaval-pacotes" className="py-14 sm:py-18 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">
              RESERVA ANTECIPADA CARNAVAL
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0c2f33]">
              Pacotes Fechados para o Feriado de Carnaval
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Desfrute de 4 ou 5 dias inesquecíveis no Litoral Norte com tarifas promocionais para reservas garantidas pelo WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Pacote 1: Casal */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#157347] text-xs font-bold border border-emerald-200">
                  Ideal para Casais
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0c2f33]">
                  Chalé Casal Romântico
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Perfeito para curtir os dias de folia e descansar com privacidade e conforto total.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Cama queen size com roupa de cama</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Ar-condicionado split silencioso</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Cozinha compacta com frigobar e fogão</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> TV de tela plana com canais SKY</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> 1 vaga de garagem privativa inclusa</li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de consultar disponibilidade e valor para o Chalé Casal no Carnaval 2026.')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0c2f33] hover:bg-[#157347] active:scale-95 text-white font-bold text-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Chalé Casal</span>
                </button>
              </div>
            </div>

            {/* Pacote 2: Família (Destaque) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-xl relative flex flex-col justify-between group transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mais Procurado no Carnaval</span>
              </div>

              <div className="space-y-4 pt-1">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  Famílias até 4 Pessoas
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0c2f33]">
                  Chalé Família Confort
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Espaço amplo com dormitório privativo, sala, cozinha completa e área externa para relaxar.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Cama de casal + bicama confortável</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Cozinha com geladeira grande e fogão</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Pratos, copos, talheres e panelas</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Ar-condicionado e ventilador de teto</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Acesso liberado à piscina e churrasqueiras</li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de consultar disponibilidade e valor para o Chalé Família no Carnaval 2026.')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Garantir Chalé Família</span>
                </button>
              </div>
            </div>

            {/* Pacote 3: Grupo / Família Grande */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  Grupos até 6 Pessoas
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0c2f33]">
                  Chalé Master Amplo
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Acomodação com máximo espaço para reunir a família ou amigos com praticidade e economia.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Acomoda até 6 pessoas confortavelmente</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Cozinha espaçosa totalmente montada</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Sala de estar com TV SKY e Wi-Fi</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Varanda privativa com vista para jardim</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#157347] shrink-0" /> Estacionamento interno monitorado</li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de consultar disponibilidade e valor para o Chalé Master no Carnaval 2026.')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0c2f33] hover:bg-[#157347] active:scale-95 text-white font-bold text-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Chalé Master</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHALÉS & ACOMODAÇÕES DETALHES */}
      <section id="carnaval-chales" className="py-14 sm:py-18 bg-white">
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
                  Chalés Independentes
                </span>
              </div>

              <div 
                onClick={() => onOpenPhoto(POUSADA_IMAGES.room, 'Quarto Confortável com Cama e TV')}
                className="h-52 sm:h-64 rounded-3xl overflow-hidden cursor-pointer group relative shadow-md"
              >
                <img src={POUSADA_IMAGES.room} alt="Quarto" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#0c2f33] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Quartos Aconchegantes
                </span>
              </div>

              <div 
                onClick={() => onOpenPhoto(POUSADA_IMAGES.pool, 'Piscina Ensolarada')}
                className="col-span-2 h-56 sm:h-72 rounded-3xl overflow-hidden cursor-pointer group relative shadow-md"
              >
                <img src={POUSADA_IMAGES.pool} alt="Piscina da Pousada" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#0c2f33] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Piscina & Lazer Completo
                </span>
              </div>
            </div>

            {/* Coluna Texto */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">
                CONFORTO & PRATICIDADE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33] leading-tight">
                Seu Refúgio Seguro e Aconchegante no Carnaval de Caraguatatuba
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Durante o feriado de Carnaval, tenha a liberdade de preparar suas próprias refeições na cozinha equipada do seu chalé, fazer um churrasco saboroso à beira da piscina e relaxar em um ambiente familiar calmo e bem cuidado.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200">
                  <CookingPot className="w-5 h-5 text-[#157347] mb-2" />
                  <h4 className="font-bold text-sm text-[#0c2f33]">Cozinha Completa</h4>
                  <p className="text-xs text-slate-500 mt-1">Economia e conveniência para você e seus filhos.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf8f5] border border-slate-200">
                  <Wind className="w-5 h-5 text-[#157347] mb-2" />
                  <h4 className="font-bold text-sm text-[#0c2f33]">Ar-Condicionado</h4>
                  <p className="text-xs text-slate-500 mt-1">Noites frescas e repouso garantido após o dia de praia.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de consultar valores e reservar chalé para o Carnaval na Pousada Vila de Santa Marina.')}
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
      <div id="carnaval-estrutura">
        <Amenities />
      </div>

      {/* 6. GALERIA DOS CHALÉS */}
      <div id="carnaval-galeria">
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
                  GARANTA SUA ESTADIA NO CARNAVAL
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                Transforme sua viagem de Carnaval <br className="hidden sm:inline" />
                em momentos inesquecíveis.
              </h2>
            </div>

            <div className="flex flex-col sm:items-end gap-3.5">
              <button
                onClick={() => openWhatsApp('Olá! Quero reservar meu chalé para o Carnaval na Pousada Vila de Santa Marina.')}
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
