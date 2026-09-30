import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/pousadaData';

interface GalleryProps {
  onOpenPhoto: (img: string, title: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenPhoto }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Transição suave em onda com fundo idêntico à seção de cima (#FAF7F2) e curva mais evidente */}
      <div className="relative -mb-[1px] z-10 pointer-events-none select-none text-[#0a2226] bg-[#FAF7F2] overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-11 sm:h-14 lg:h-18 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C360,4 720,62 1080,26 C1240,10 1370,40 1440,30 L1440,70 L0,70 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <section id="acomodacoes" className="pt-2 sm:pt-4 pb-10 sm:pb-14 bg-[#0a2226] text-white overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TEXTO NO TOPO CENTRALIZADO E MAIS JUNTO DOS CARDS */}
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          {/* Kicker Dourado */}
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="h-[1.5px] w-5 bg-[#d4a853]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#e9bf68]">
              GALERIA DA POUSADA
            </span>
            <span className="h-[1.5px] w-5 bg-[#d4a853]" />
          </div>

          {/* Título Principal */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-1.5">
            Conheça nossos chalés
          </h2>

          {/* Descrição */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ambientes aconchegantes, bem cuidados e prontos para te receber em Caraguatatuba.
          </p>
        </div>

        {/* CONTAINER DO CARROSSEL COM AS SETAS NAS LATERAIS */}
        <div className="relative group/carousel">
          {/* Seta Lateral Esquerda */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0a2226]/85 backdrop-blur-md border border-white/30 hover:border-white hover:bg-white text-white hover:text-[#0a2226] active:scale-95 shadow-2xl flex items-center justify-center transition-all cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Seta Lateral Direita */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0a2226]/85 backdrop-blur-md border border-white/30 hover:border-white hover:bg-white text-white hover:text-[#0a2226] active:scale-95 shadow-2xl flex items-center justify-center transition-all cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carrossel Horizontal de Cards de Fotos com Badges */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenPhoto(item.image, `${item.tag} - ${item.title}`)}
                className="flex-none w-[260px] sm:w-[300px] lg:w-[320px] h-[360px] sm:h-[420px] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-white/40 shadow-xl snap-start transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Foto de Fundo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradiente escuro no rodapé */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20" />

                {/* Ícone de zoom no hover */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Badge da Categoria no Rodapé (Exatamente como no design) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                  <span className="bg-white/95 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-md group-hover:bg-[#157347] group-hover:text-white transition-colors duration-200">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Transição em onda no rodapé da Galeria (conectando ao fundo #FAF7F2 com coqueiros de Depoimentos) */}
    <div className="relative -mt-[1px] z-10 pointer-events-none select-none text-[#0a2226] bg-[#FAF7F2] overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-11 sm:h-14 lg:h-18 block rotate-180"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 C360,4 720,62 1080,26 C1240,10 1370,40 1440,30 L1440,70 L0,70 Z"
          fill="currentColor"
        />
      </svg>
    </div>
    </>
  );
};
