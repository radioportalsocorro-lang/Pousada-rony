import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageCircle, Calendar, Home, ChevronDown, Sparkles } from 'lucide-react';
import { POUSADA_INFO } from '../../data/pousadaData';
import { MenuItem, INITIAL_MENU_ITEMS, SubMenuItem } from '../../services/settingsService';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenDashboard?: () => void;
  onOpenPrivacy?: () => void;
  onOpenReveillon?: () => void;
  onOpenCarnaval?: () => void;
  onOpenVerao?: () => void;
  menuItems?: MenuItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onOpenDashboard, 
  onOpenPrivacy,
  onOpenReveillon,
  onOpenCarnaval,
  onOpenVerao,
  menuItems 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Usa itens de menu configurados ou os padrões
  const allItems = menuItems && menuItems.length > 0 ? menuItems : INITIAL_MENU_ITEMS;
  
  // Filtra apenas os que estão marcados para MOSTRAR (visible === true)
  const visibleNavLinks = allItems.filter((item) => item.visible);

  const handleNavClick = (id: string, href: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    setOpenDropdownId(null);

    // Se o clique for para Fim de Ano / Réveillon
    if (
      id === 'final-do-ano' || 
      id === 'fim-de-ano' || 
      href === '#final-do-ano' || 
      href === '#fim-de-ano'
    ) {
      if (onOpenReveillon) {
        onOpenReveillon();
        return;
      }
    }

    // Se o clique for para Carnaval
    if (id === 'carnaval' || href === '#carnaval') {
      if (onOpenCarnaval) {
        onOpenCarnaval();
        return;
      }
    }

    // Se o clique for para Verão & Férias
    if (
      id === 'alta-temporada-verao' || 
      id === 'verao' || 
      id === 'ferias' || 
      href === '#alta-temporada-verao' || 
      href === '#verao'
    ) {
      if (onOpenVerao) {
        onOpenVerao();
        return;
      }
    }

    // Se o clique for no item pai Temporada
    if (id === 'temporada' || href === '#temporada') {
      if (onOpenReveillon) {
        onOpenReveillon();
        return;
      }
    }

    // Se o clique for para a página de privacidade
    if (id === 'privacidade' || href === '#privacidade') {
      if (onOpenPrivacy) {
        onOpenPrivacy();
        return;
      }
    }

    // Se o clique for para o Início / Home
    if (id === 'inicio' || href === '#inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const element = document.querySelector('#inicio');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  const handleMouseEnterDropdown = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdownId(id);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdownId(null);
    }, 200);
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${POUSADA_INFO.phoneClean}?text=${encodeURIComponent(POUSADA_INFO.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-100'
            : 'bg-white py-3.5 border-b border-slate-100/80'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Pousada Vila de Santa Marina */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('inicio', '#inicio');
            }}
            className="flex items-center gap-2.5 group cursor-pointer text-slate-900 shrink-0"
          >
            {/* Ícone de Palmeiras e Sol */}
            <div className="w-10 h-10 flex items-center justify-center text-[#124d45] shrink-0">
              <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9 stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
          </a>

          {/* Links Centrais Dinâmicos (Desktop) com suporte a Submenus */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 ml-6 mr-auto">
            {visibleNavLinks.map((link) => {
              const isActive = activeNav === link.id;
              const hasSubItems = Boolean(
                (link.subItems && link.subItems.length > 0) || 
                (link.id === 'temporada' || link.id === 'final-do-ano')
              );

              // Garante os submenus para o item Temporada
              const rawSubItems: SubMenuItem[] = (link.subItems && link.subItems.length > 0)
                ? link.subItems
                : (link.id === 'temporada' || link.id === 'final-do-ano')
                  ? [
                      { id: 'fim-de-ano', label: 'Fim de Ano', href: '#fim-de-ano', visible: true },
                      { id: 'carnaval', label: 'Carnaval', href: '#carnaval', visible: true },
                      { id: 'alta-temporada-verao', label: 'Verão & Férias', href: '#alta-temporada-verao', visible: true },
                    ]
                  : [];
              const subItemsToRender = rawSubItems.filter(s => s.visible !== false);

              const isDropdownOpen = openDropdownId === link.id;

              if (hasSubItems && subItemsToRender.length > 0) {
                return (
                  <div
                    key={link.id}
                    className="relative py-2"
                    onMouseEnter={() => handleMouseEnterDropdown(link.id)}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.id, link.href)}
                      className={`text-[13.5px] font-medium transition-colors relative py-1 cursor-pointer flex items-center gap-1 group ${
                        isActive || isDropdownOpen
                          ? 'text-[#0c2f33] font-semibold' 
                          : 'text-slate-600 hover:text-[#0c2f33]'
                      }`}
                    >
                      <span>{link.id === 'final-do-ano' ? 'Temporada' : link.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#0c2f33] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#0c2f33]' : ''}`} />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b48a3c] rounded-full" />
                      )}
                    </button>

                    {/* Menu Suspenso (Dropdown) com Submenus */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                          Períodos Especiais
                        </div>
                        {subItemsToRender.map((sub) => {
                          const isFimDeAno = sub.id === 'fim-de-ano';
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleNavClick(sub.id, sub.href)}
                              className="w-full text-left px-3.5 py-2 text-[13px] font-medium text-slate-700 hover:text-[#0c2f33] hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer group"
                            >
                              <span className="group-hover:translate-x-0.5 transition-transform">
                                {sub.label}
                              </span>
                              {isFimDeAno && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80">
                                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                                  Destaque
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id, link.href);
                  }}
                  className={`text-[13.5px] font-medium transition-colors relative py-1 cursor-pointer flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-[#0c2f33] font-semibold' 
                      : 'text-slate-600 hover:text-[#0c2f33]'
                  }`}
                >
                  {link.isHome && (
                    <Home className="w-3.5 h-3.5 text-[#b48a3c]" />
                  )}
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b48a3c] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Botões de Ação na Direita (Afastados para a extrema direita) */}
          <div className="hidden sm:flex items-center gap-3 ml-auto pl-4">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                title="Abrir Painel Admin para gerenciar menus, fotos e textos"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Painel Admin</span>
              </button>
            )}

            {/* Botão WhatsApp Oficial */}
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 rounded-lg shadow-sm transition-all duration-150 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Fale no WhatsApp</span>
            </button>
          </div>

          {/* Botão Menu Mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              {visibleNavLinks.map((link) => {
                const isTemporada = link.id === 'temporada' || link.id === 'final-do-ano';
                const rawSubItems: SubMenuItem[] = (link.subItems && link.subItems.length > 0)
                  ? link.subItems
                  : isTemporada
                    ? [
                        { id: 'fim-de-ano', label: 'Fim de Ano', href: '#fim-de-ano', visible: true },
                        { id: 'carnaval', label: 'Carnaval', href: '#carnaval', visible: true },
                        { id: 'alta-temporada-verao', label: 'Verão & Férias', href: '#alta-temporada-verao', visible: true },
                      ]
                    : [];
                const subItems = rawSubItems.filter(s => s.visible !== false);

                return (
                  <div key={link.id} className="space-y-1">
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.id, link.href);
                      }}
                      className={`text-base font-medium py-2 px-2.5 rounded-lg flex items-center justify-between ${
                        activeNav === link.id
                          ? 'bg-slate-50 text-[#0c2f33] font-semibold border-l-4 border-[#b48a3c]'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {link.isHome && <Home className="w-4 h-4 text-[#b48a3c]" />}
                        <span>{link.id === 'final-do-ano' ? 'Temporada' : link.label}</span>
                      </div>
                      {link.isHome && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase">
                          Home
                        </span>
                      )}
                    </a>

                    {/* Submenus no Mobile */}
                    {subItems.length > 0 && (
                      <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-100 ml-3">
                        {subItems.map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleNavClick(sub.id, sub.href)}
                            className="w-full text-left py-1.5 px-2 text-xs font-semibold text-slate-600 hover:text-[#0c2f33] flex items-center justify-between rounded-md hover:bg-slate-100/60"
                          >
                            <span>• {sub.label}</span>
                            {sub.id === 'fim-de-ano' && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                                Destaque
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                {onOpenDashboard && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 rounded-lg border border-slate-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Painel Admin (Gerenciar Menus & Fotos)</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-[#0e5c4a] rounded-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservar Agora</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsApp();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-[#157347] rounded-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Fale no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Espaçador para o header fixo */}
      <div className="h-16" />
    </>
  );
};
