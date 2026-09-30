import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { TESTIMONIALS, POUSADA_IMAGES } from '../../data/pousadaData';

export const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="relative py-14 sm:py-20 bg-[#FAF7F2] overflow-hidden">
      {/* Imagem panorâmica com coqueiros no fundo da seção - idêntica à seção Nossa Estrutura */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-40">
        <img
          src={POUSADA_IMAGES.bgPalmBanner}
          alt="Paisagem tropical com coqueiros"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/60 to-[#FAF7F2]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção com Botão Google */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {/* Kicker Dourado */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-[1.5px] w-6 bg-[#b48a3c]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#b48a3c]">
                DEPOIMENTOS
              </span>
              <span className="h-[1.5px] w-6 bg-[#b48a3c]" />
            </div>

            {/* Título Principal */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33] tracking-tight">
              Quem veio, quer voltar &mdash;
            </h2>

            {/* Subtítulo */}
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Descubra por que nossos chalés se tornaram o refúgio favorito de tantas famílias e casais.
            </p>
          </div>

          {/* Botão Ver Mais no Google */}
          <a
            href="https://www.google.com/maps/search/Pousada+Vila+de+Santa+Marina+Caraguatatuba"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm text-xs sm:text-sm font-semibold text-slate-700 transition-colors w-fit shrink-0 cursor-pointer"
          >
            {/* Ícone Colorido Oficial do Google */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Ver mais avaliações no Google</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Grade com os 3 Depoimentos Exatos do Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-slate-100/80 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Linha do Usuário + Google Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#0c2f33]">
                        {review.name}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  {/* Logo Google Minimalista */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                {/* 5 Estrelas Douradas */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Comentário */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
