import React from 'react';
import { POUSADA_IMAGES } from '../../data/pousadaData';

export const Amenities: React.FC = () => {
  const items = [
    {
      id: 'piscina',
      title: 'Piscina',
      desc: 'Espaço amplo para relaxar e se refrescar durante a sua estadia.',
      svg: (
        // Ícone idêntico: Escadinha de piscina com corrimão e 2 ondas de água embaixo
        <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 sm:w-16 sm:h-16 stroke-[#0d4f45]" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Corrimãos da piscina */}
          <path d="M14 6 C14 4 17 4 17 6 L17 28" />
          <path d="M22 6 C22 4 25 4 25 6 L25 28" />
          {/* Degraus */}
          <line x1="17" y1="13" x2="22" y2="13" />
          <line x1="17" y1="19" x2="22" y2="19" />
          <line x1="17" y1="25" x2="22" y2="25" />
          {/* Ondas de água da piscina */}
          <path d="M6 34 C10 32 14 36 18 34 C22 32 26 36 30 34 C34 32 38 36 42 34" />
          <path d="M6 40 C10 38 14 42 18 40 C22 38 26 42 30 40 C34 38 38 42 42 40" />
        </svg>
      ),
    },
    {
      id: 'area-gourmet',
      title: 'Área gourmet',
      desc: 'Ambiente completo para preparar churrascos e reunir a galera.',
      svg: (
        // Ícone idêntico: Churrasqueira redonda em tripé com vapor/fumaça saindo do topo
        <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 sm:w-16 sm:h-16 stroke-[#0d4f45]" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Fumaça / vapor saindo */}
          <path d="M19 6 C18 9 20 10 19 12" />
          <path d="M24 5 C23 8 25 9 24 12" />
          <path d="M29 6 C28 9 30 10 29 12" />
          {/* Grelha tampa / bojo da churrasqueira */}
          <line x1="10" y1="16" x2="38" y2="16" />
          <path d="M12 16 C12 25 36 25 36 16" />
          {/* Tripé de sustentação */}
          <line x1="16" y1="25" x2="11" y2="42" />
          <line x1="32" y1="25" x2="37" y2="42" />
          <line x1="24" y1="25" x2="24" y2="42" />
          {/* Travessa do tripé */}
          <line x1="14" y1="35" x2="34" y2="35" />
        </svg>
      ),
    },
    {
      id: 'estacionamento',
      title: 'Estacionamento',
      desc: 'Vagas disponíveis dentro do espaço, garantindo mais comodidade.',
      svg: (
        // Ícone idêntico: Carro frontal com teto, faróis redondos e rodas
        <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 sm:w-16 sm:h-16 stroke-[#0d4f45]" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Cabine / teto do carro */}
          <path d="M15 19 L18 11 C18.5 10 20 9 24 9 C28 9 29.5 10 30 11 L33 19" />
          {/* Para-brisa */}
          <line x1="16" y1="18" x2="32" y2="18" />
          {/* Corpo do veículo */}
          <rect x="9" y="19" width="30" height="15" rx="4" />
          {/* Faróis dianteiros */}
          <circle cx="16" cy="26" r="2.5" />
          <circle cx="32" cy="26" r="2.5" />
          {/* Para-choque / grade */}
          <line x1="21" y1="27" x2="27" y2="27" />
          {/* Pneus */}
          <rect x="11" y="34" width="6" height="5" rx="1.5" />
          <rect x="31" y="34" width="6" height="5" rx="1.5" />
        </svg>
      ),
    },
    {
      id: 'ar-condicionado',
      title: 'Ar-condicionado',
      desc: 'Todos os chalés possuem ar-condicionado para seu conforto.',
      svg: (
        // Ícone idêntico: Unidade split de ar com aletas de vento saindo por baixo
        <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 sm:w-16 sm:h-16 stroke-[#0d4f45]" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Aparelho split */}
          <rect x="7" y="12" width="34" height="15" rx="3" />
          {/* Display e linha frontal */}
          <line x1="12" y1="21" x2="28" y2="21" />
          <circle cx="34" cy="18" r="1.5" fill="#0d4f45" />
          <circle cx="37" cy="18" r="1" fill="#0d4f45" />
          {/* Fluxo de ar / vento descendo */}
          <path d="M12 32 C13 36 15 39 17 41" />
          <path d="M19 32 C20 36 21 39 22 41" />
          <path d="M26 32 C26 36 26 39 26 41" />
          <path d="M31 32 C30 36 29 39 28 41" />
          <path d="M36 32 C35 36 33 39 31 41" />
        </svg>
      ),
    },
    {
      id: 'cozinha-equipada',
      title: 'Cozinha equipada',
      desc: 'Cozinha com utensílios, fogão e geladeira para uso à vontade.',
      svg: (
        // Ícone idêntico: Chapéu de Chef Toque Blanche clássico
        <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 sm:w-16 sm:h-16 stroke-[#0d4f45]" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Base do chapéu de chef */}
          <rect x="14" y="32" width="20" height="7" rx="1.5" />
          {/* Dobras verticais da base */}
          <line x1="20" y1="32" x2="20" y2="39" />
          <line x1="24" y1="32" x2="24" y2="39" />
          <line x1="28" y1="32" x2="28" y2="39" />
          {/* Parte volumosa / fofa superior do chapéu */}
          <path d="M14 32 C10 30 8 23 12 18 C11 13 16 9 21 11 C24 7 30 7 33 11 C38 9 42 13 41 18 C44 23 42 30 34 32" />
        </svg>
      ),
    },
    {
      id: 'tv-wifi',
      title: 'TV e Wi-Fi',
      desc: 'Canais variados para aproveitar filmes, séries e esportes.',
      svg: (
        // Ícone idêntico: Monitor/TV widescreen sobre suporte de base
        <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 sm:w-16 sm:h-16 stroke-[#0d4f45]" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Tela da TV / Monitor */}
          <rect x="7" y="9" width="34" height="23" rx="3.5" />
          {/* Linha inferior da tela */}
          <line x1="12" y1="28" x2="36" y2="28" />
          {/* Haste central de apoio */}
          <line x1="24" y1="32" x2="24" y2="38" />
          {/* Base do suporte no móvel */}
          <line x1="16" y1="38" x2="32" y2="38" strokeWidth="2.6" />
        </svg>
      ),
    },
  ];

  return (
    <section id="estrutura" className="relative py-10 sm:py-14 lg:py-16 bg-[#FAF7F2] overflow-hidden">
      {/* Imagem panorâmica com coqueiros e montanhas no fundo da seção */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-35">
        <img
          src={POUSADA_IMAGES.bgPalmBanner}
          alt="Paisagem tropical com coqueiros"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/60 to-[#FAF7F2]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção com espaçamento compacto */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0c2f33] tracking-tight mb-2">
            Nossa Estrutura
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Tudo o que faz diferença na sua viagem
          </p>
        </div>

        {/* Grade de 6 Cards Brancos Amplos e Proporcionais - Idênticos à Imagem */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center justify-start min-h-[200px] sm:min-h-[220px]"
            >
              {/* Ícone com o traço verde exato da imagem - agora maior */}
              <div className="h-16 flex items-center justify-center mb-3">
                {item.svg}
              </div>

              {/* Título do Card */}
              <h3 className="font-bold text-base sm:text-[17px] text-[#0d4f45] mb-1.5 tracking-tight">
                {item.title}
              </h3>

              {/* Descrição em cinza suave */}
              <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-[190px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
