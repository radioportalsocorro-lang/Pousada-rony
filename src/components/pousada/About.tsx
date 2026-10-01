import React from 'react';
import { Palmtree, Heart, Star } from 'lucide-react';
import { POUSADA_IMAGES } from '../../data/pousadaData';
import { SiteSettings } from '../../services/settingsService';

interface AboutProps {
  onOpenPhoto: (img: string, title: string) => void;
  palmBannerImage?: string;
  onOpenBooking?: () => void;
  phoneClean?: string;
  whatsappMessage?: string;
  settings?: SiteSettings;
}

export const About: React.FC<AboutProps> = ({ 
  onOpenPhoto, 
  palmBannerImage,
  settings,
}) => {
  const palmImg = palmBannerImage || POUSADA_IMAGES.bgPalmBanner;
  const photo1 = settings?.aboutPhoto1 || POUSADA_IMAGES.chalets;
  const photo2 = settings?.aboutPhoto2 || POUSADA_IMAGES.foto2;
  const photo3 = settings?.aboutPhoto3 || POUSADA_IMAGES.pool;
  const photo4 = settings?.aboutPhoto4 || POUSADA_IMAGES.gourmet;
  const photo5 = settings?.aboutPhoto5 || POUSADA_IMAGES.room;

  return (
    <section id="a-pousada" className="relative -mt-10 sm:-mt-14 lg:-mt-16 pt-20 sm:pt-26 lg:pt-28 pb-12 sm:pb-16 bg-[#FAF7F2] overflow-hidden z-10">
      {/* IMAGEM DE FUNDO PANORÂMICA: COQUEIROS LATERAIS NOS DOIS LADOS (ORIGINAL) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src={palmImg}
          alt="Paisagem tropical com coqueiros e costa de Caraguatatuba"
          className="w-full h-full object-cover object-top opacity-95"
        />
        {/* Camada translúcida suave para harmonizar com a paleta bege e manter os coqueiros dos dois lados visíveis */}
        <div className="absolute inset-0 bg-[#FAF7F2]/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LADO ESQUERDO: MOSAICO COM MOLDURA BRANCA POLAROID */}
          <div className="lg:col-span-7 relative pt-2 pb-6">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 relative z-10">
              {/* Foto 1: Chalés principais com coqueiro e gramado */}
              <div
                onClick={() => onOpenPhoto(photo1, 'Jardim e Fachada dos Chalés')}
                className="col-span-5 row-span-2 bg-white p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/60 cursor-pointer transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-72 sm:h-96 w-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={photo1}
                    alt="Chalés da Pousada Vila de Santa Marina"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Foto 2: Vista do pátio e chalés */}
              <div
                onClick={() => onOpenPhoto(photo2, 'Área Externa e Pátio')}
                className="col-span-3 bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200/60 cursor-pointer transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-34 sm:h-46 w-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={photo2}
                    alt="Área externa com sol"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Foto 3: Piscina com vista para a serra */}
              <div
                onClick={() => onOpenPhoto(photo3, 'Piscina e Área de Lazer')}
                className="col-span-4 bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200/60 cursor-pointer transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-34 sm:h-46 w-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={photo3}
                    alt="Piscina da pousada"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Foto 4: Área gourmet */}
              <div
                onClick={() => onOpenPhoto(photo4, 'Área Gourmet e Churrasqueira')}
                className="col-span-3 bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200/60 cursor-pointer transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-34 sm:h-46 w-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={photo4}
                    alt="Espaço gourmet com churrasqueira"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Foto 5: Quarto e acomodação */}
              <div
                onClick={() => onOpenPhoto(photo5, 'Quarto e Acomodações')}
                className="col-span-4 bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200/60 cursor-pointer transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-34 sm:h-46 w-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={photo5}
                    alt="Quarto com cama aconchegante"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* SELO MANUSCRITO ELEGANTE: "Conforto em cada detalhe" */}
            <div className="absolute -bottom-3 left-6 sm:left-10 z-30 select-none">
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-[#A87B2E] tracking-wide drop-shadow-sm block transform -rotate-6">
                Conforto em cada detalhe
              </span>
              <div className="h-0.5 w-24 bg-[#A87B2E]/60 ml-2 mt-0.5 rounded-full transform -rotate-6" />
            </div>
          </div>

          {/* LADO DIREITO: TEXTO ORIGINAL DA POUSADA (SEM FALAR DE FINAL DE ANO) */}
          <div className="lg:col-span-5 lg:pl-2 space-y-5 relative z-20">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="h-[1.5px] w-6 bg-[#b48a3c]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#b48a3c]">
                  SUA ESTADIA EM CARAGUATATUBA
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0c2f33] leading-[1.18] tracking-tight drop-shadow-sm">
                Conforto, lazer e boas lembranças
              </h2>
            </div>

            {/* Descrição Limpa e Aconchegante */}
            <div className="space-y-3.5 text-slate-700 text-sm sm:text-[15px] leading-relaxed bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/80 shadow-md">
              <p>
                Nossos chalés oferecem o equilíbrio perfeito entre conforto e lazer. Com opções para casais e também para famílias maiores, cada acomodação conta com <strong className="text-[#0c2f33] font-semibold">cozinha equipada</strong>, utensílios domésticos, geladeira, fogão, <strong className="text-[#0c2f33] font-semibold">TV com SKY</strong> e <strong className="text-[#0c2f33] font-semibold">ar-condicionado</strong>.
              </p>
              <p>
                Tudo para garantir que sua estadia em Caraguatatuba seja prática, aconchegante e cheia de momentos especiais ao lado de quem você ama.
              </p>
            </div>

            {/* 3 DIFERENCIAIS CIRCULARES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3 py-2.5 rounded-2xl border border-white/80 shadow-xs">
                <div className="w-9 h-9 rounded-full border border-[#b48a3c]/30 bg-[#b48a3c]/10 flex items-center justify-center text-[#9d7328] shrink-0">
                  <Palmtree className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-[11px] font-bold text-[#0c2f33] leading-tight">
                  Pertinho do mar
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3 py-2.5 rounded-2xl border border-white/80 shadow-xs">
                <div className="w-9 h-9 rounded-full border border-[#b48a3c]/30 bg-[#b48a3c]/10 flex items-center justify-center text-[#9d7328] shrink-0">
                  <Heart className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-[11px] font-bold text-[#0c2f33] leading-tight">
                  Ambiente familiar
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3 py-2.5 rounded-2xl border border-white/80 shadow-xs">
                <div className="w-9 h-9 rounded-full border border-[#b48a3c]/30 bg-[#b48a3c]/10 flex items-center justify-center text-[#9d7328] shrink-0">
                  <Star className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-[11px] font-bold text-[#0c2f33] leading-tight">
                  Conforto total
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
