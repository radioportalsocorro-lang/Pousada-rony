import React from 'react';

interface FooterProps {
  onOpenDashboard?: () => void;
  onOpenPrivacy?: () => void;
  onGoHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onGoHome }) => {
  const scrollTo = (href: string) => {
    if (href === '#inicio' && onGoHome) {
      onGoHome();
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else if (href === '#inicio') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Transição em onda no topo do Rodapé Oficial */}
      <div className="relative -mb-[1px] z-10 pointer-events-none select-none text-[#071d20] bg-slate-50 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-9 sm:h-12 lg:h-15 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,26 C360,4 720,52 1080,20 C1240,8 1370,32 1440,24 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <footer className="bg-[#071d20] text-slate-300 pt-6 pb-10 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo Pousada */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 flex items-center justify-center text-[#e9bf68] shrink-0">
              <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 40C12 28 17 18 24 16" />
                <path d="M24 16C18 12 12 13 8 18" />
                <path d="M24 16C19 8 13 8 9 10" />
                <path d="M24 16C23 7 28 6 34 8" />
                <path d="M24 16C28 10 35 12 37 17" />
                <path d="M24 40C24 30 28 22 34 20" />
                <path d="M34 20C30 16 26 17 22 21" />
                <path d="M34 20C33 13 37 12 42 14" />
                <path d="M34 20C37 15 43 17 44 21" />
                <path d="M4 42C14 41 20 43 30 42C38 41 42 42 46 42" strokeWidth="2" />
                <path d="M7 45C16 44 24 46 34 45C40 44 43 45 46 45" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.2em] font-semibold text-slate-400 uppercase">
                POUSADA
              </span>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                Vila de Santa Marina
              </span>
              <span className="block text-[8px] tracking-[0.2em] font-bold text-[#e9bf68] uppercase">
                CARAGUATATUBA &middot; SP
              </span>
            </div>
          </div>

          {/* Links de Navegação */}
          <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-slate-300">
            <button
              onClick={() => scrollTo('#inicio')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Início
            </button>
            <button
              onClick={() => scrollTo('#acomodacoes')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Acomodações
            </button>
            <button
              onClick={() => scrollTo('#estrutura')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Estrutura
            </button>
            <button
              onClick={() => scrollTo('#localizacao')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Localização
            </button>
            <button
              onClick={() => scrollTo('#depoimentos')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Depoimentos
            </button>
          </nav>

          {/* Políticas e Direitos */}
          <div className="text-center md:text-right space-y-1">
            <div className="text-slate-400">
              {onOpenPrivacy ? (
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-white underline transition-colors cursor-pointer"
                >
                  Política de Privacidade & Termos
                </button>
              ) : (
                <a href="#inicio" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              )}
            </div>
            <div className="text-[11px] text-slate-500">
              &copy; 2026 Pousada Vila de Santa Marina. Todos os direitos reservados.
            </div>
          </div>
        </div>

        {/* Rodapé inferior com menção técnica limpa sem botão de admin */}
        <div className="pt-4 text-center text-[11px] text-slate-500">
          <span>Caraguatatuba, Litoral Norte de São Paulo &middot; Brasil</span>
        </div>
      </div>
    </footer>
    </>
  );
};
