import React, { useState } from 'react';
import { MapPin, Navigation, Phone, MessageCircle, Instagram, Facebook, ExternalLink, Plus, Minus } from 'lucide-react';
import { POUSADA_INFO } from '../../data/pousadaData';

export const LocationContact: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const openGoogleMaps = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Rua+Canjos+Jardim+Britania+Caraguatatuba+SP',
      '_blank'
    );
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${POUSADA_INFO.phoneClean}?text=${encodeURIComponent(POUSADA_INFO.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="localizacao" className="py-7 sm:py-9 lg:py-10 bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Lado Esquerdo: Informações de Localização */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
            <div>
              {/* Kicker Dourado */}
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="h-[1.5px] w-5 bg-[#b48a3c]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b48a3c]">
                  NOSSA LOCALIZAÇÃO
                </span>
              </div>

              {/* Título */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0c2f33] tracking-tight mb-2">
                Estamos em Caraguatatuba
              </h2>

              {/* Endereço com Ícone de Pin */}
              <div className="flex items-center gap-2.5 text-slate-600 mb-3.5">
                <div className="w-8 h-8 rounded-full bg-[#124d45]/10 text-[#124d45] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-slate-800 leading-tight">
                    {POUSADA_INFO.address}
                  </p>
                </div>
              </div>

              {/* Botão Ver no Google Maps */}
              <button
                onClick={openGoogleMaps}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-sm transition-all cursor-pointer"
              >
                {/* Ícone Google Maps Oficial */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
                </svg>
                <span>Ver no Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Centro: Visualização Estilizada do Mapa de Caraguatatuba (Menos Alto e Panorâmico) */}
          <div className="lg:col-span-5 h-[210px] sm:h-[225px] lg:h-[235px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm relative bg-[#e5e3df] flex flex-col">
            {/* Header do Card no Mapa (Estilo Google Maps) */}
            <div className="absolute top-2.5 left-2.5 right-12 z-10 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block text-[11px] leading-tight">Pousada Vila de Santa Marina</span>
                <span className="text-[9px] text-slate-500">Caraguatatuba - SP</span>
              </div>
              <button
                onClick={openGoogleMaps}
                className="text-[10px] text-sky-600 hover:text-sky-800 font-semibold underline ml-2 whitespace-nowrap"
              >
                Ver mapa ampliado
              </button>
            </div>

            {/* Controles de Zoom do Mapa */}
            <div className="absolute bottom-2.5 right-2.5 z-10 flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
                className="p-1.5 hover:bg-slate-100 text-slate-700 transition-colors"
                title="Aproximar"
              >
                <Plus className="w-3 h-3" />
              </button>
              <div className="h-[1px] bg-slate-200" />
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                className="p-1.5 hover:bg-slate-100 text-slate-700 transition-colors"
                title="Afastar"
              >
                <Minus className="w-3 h-3" />
              </button>
            </div>

            {/* Representação Gráfica do Mapa com Ruas e Mar de Caraguatatuba */}
            <div
              className="flex-1 w-full h-full relative overflow-hidden transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg className="w-full h-full" viewBox="0 0 500 240" fill="none" preserveAspectRatio="xMidYMid slice">
                {/* Oceano Atlântico / Baía de Caraguatatuba */}
                <path
                  d="M260 0 C280 60, 310 120, 245 175 C215 205, 230 240, 220 240 L500 240 L500 0 Z"
                  fill="#b9daf5"
                />

                {/* Linha da Costa */}
                <path
                  d="M260 0 C280 60, 310 120, 245 175 C215 205, 230 240, 220 240"
                  stroke="#8bb8e4"
                  strokeWidth="3.5"
                  fill="none"
                />

                {/* Terreno / Cidade */}
                <path
                  d="M0 0 L260 0 C280 60, 310 120, 245 175 C215 205, 230 240, 220 240 L0 240 Z"
                  fill="#f4f3f0"
                />

                {/* Principais Ruas e Rodovias (SP-055 / Rio-Santos) */}
                <path d="M0 55 Q140 70 270 65 Q335 90 355 145" stroke="#fbd38d" strokeWidth="6" fill="none" />
                <path d="M0 55 Q140 70 270 65 Q335 90 355 145" stroke="#ecc94b" strokeWidth="3" fill="none" />

                <path d="M90 0 L105 240" stroke="#ffffff" strokeWidth="4" />
                <path d="M170 0 Q175 120 160 240" stroke="#ffffff" strokeWidth="3.5" />
                <path d="M0 135 L245 130" stroke="#ffffff" strokeWidth="3.5" />
                <path d="M0 185 L220 180" stroke="#ffffff" strokeWidth="2.5" />

                {/* Bairros e Ruas Secundárias */}
                <line x1="50" y1="85" x2="220" y2="85" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="60" y1="110" x2="210" y2="110" stroke="#e2e8f0" strokeWidth="1.5" />
                <line x1="80" y1="160" x2="220" y2="160" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Rótulo: Praia do Indaiá */}
                <circle cx="275" cy="60" r="3.5" fill="#3182ce" />
                <text x="284" y="64" fontSize="9" fontWeight="bold" fill="#2b6cb0">Praia do Indaiá</text>

                {/* Rótulo: Praia Martim de Sá */}
                <circle cx="340" cy="150" r="3.5" fill="#3182ce" />
                <text x="350" y="154" fontSize="9" fontWeight="bold" fill="#2b6cb0">Praia Martim de Sá</text>

                {/* Rótulo: Centro de Caraguatatuba */}
                <text x="175" y="130" fontSize="9.5" fontWeight="600" fill="#718096">Caraguatatuba</text>

                {/* PONTO CENTRAL: Pousada Vila de Santa Marina */}
                <g transform="translate(150, 95)">
                  {/* Círculo pulsante */}
                  <circle cx="0" cy="0" r="11" fill="#e53e3e" opacity="0.25" className="animate-ping" />
                  {/* Pin vermelho estilo Google Maps */}
                  <path
                    d="M0 -18 C-5.5 -18 -9.5 -14 -9.5 -8 C-9.5 -1.5 0 3 0 3 C0 3 9.5 -1.5 9.5 -8 C9.5 -14 5.5 -18 0 -18 Z"
                    fill="#e53e3e"
                  />
                  <circle cx="0" cy="-9.5" r="3" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>

          {/* Lado Direito: Fale Conosco & Redes Sociais */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0c2f33] tracking-tight mb-2.5">
                Fale Conosco
              </h3>

              {/* Botão / Link WhatsApp Direto */}
              <div
                onClick={openWhatsApp}
                className="flex items-center gap-2.5 cursor-pointer group mb-3"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors block leading-tight">
                    {POUSADA_INFO.phone}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Atendimento pelo WhatsApp
                  </span>
                </div>
              </div>

              {/* Redes Sociais Compactas */}
              <div className="flex items-center gap-2 mb-1.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <span className="text-[11px] text-slate-500 leading-tight ml-1">
                  Siga nossas redes sociais e acompanhe nossas novidades
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
